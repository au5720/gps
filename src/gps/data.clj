(ns gps.data
  (:require [datomic.api :as d]
            [geohash.core :as geohash]
            [gps.core :as gps]))


(def uri "datomic:mem://gps")

(d/create-database uri)

(def conn (d/connect uri))

(def schema
  [
        ;; Location Attributes
        ;Location Geocode
        {:db/id #db/id [:db.part/db]
         :db/ident :location/geocode
         :db/valueType :db.type/string
         :db/cardinality :db.cardinality/one
         :db/index true
         :db/unique :db.unique/identity
         :db/doc "geohash code"
         :db.install/_attribute :db.part/db}

        {:db/id #db/id [:db.part/db]
         :db/ident :location/lat
         :db/valueType :db.type/double
         :db/cardinality :db.cardinality/one
         :db/doc "GPS Latitude"
         :db.install/_attribute :db.part/db}

        {:db/id #db/id [:db.part/db]
         :db/ident :location/lon
         :db/valueType :db.type/double
         :db/cardinality :db.cardinality/one
         :db/doc "GPS Longitude"
         :db.install/_attribute :db.part/db}

        ;; Sellers location geocode
        {:db/id #db/id [:db.part/db]
         :db/ident :location/vendor
         :db/valueType :db.type/ref
         :db/cardinality :db.cardinality/many
         :db/doc "Reference to one or more Vendors"
         :db.install/_attribute :db.part/db}

        {:db/id #db/id [:db.part/db]
         :db/ident :vendor/name
         :db/valueType :db.type/string
         :db/index true
         :db/unique :db.unique/identity
         :db/cardinality :db.cardinality/one
         :db/fulltext true
         :db/doc "Vendor's name"
         :db.install/_attribute :db.part/db}

        {:db/id #db/id [:db.part/db]
         :db/ident :vendor/deal
         :db/valueType :db.type/string
         :db/cardinality :db.cardinality/one
         :db/fulltext true
         :db/doc "Vendor's deal details"
         :db.install/_attribute :db.part/db}
        ])

@(d/transact conn schema)

(defn save-deal[lat lon vendor-name deal-txt]
  (let [vendor-tmp-id (datomic.api/tempid :db.part/user)
        location-tmp-id (datomic.api/tempid :db.part/user)
        geohash (geohash/encode (vector lat lon))]
    (datomic.api/transact conn
           `[{
             :db/id ~vendor-tmp-id
             :vendor/name ~vendor-name
             :vendor/deal ~deal-txt}
            {:db/id ~location-tmp-id
             :location/vendor ~vendor-tmp-id
             :location/geocode ~geohash
             :location/lat ~lat
             :location/lon ~lon}])))

;; Calculate heading and distance given two GPS co-ordinates
(defn heading-distance[gps-start gps-end]
  (let [lat-start (:lat gps-start)
        lon-start (:lon gps-start)
        lat-end (:lat gps-end)
        lon-end (:lon gps-end)
        NS (if (< lat-start lat-end) :north :south)
        EW (if (< lon-start lon-end) :east :west)
        ]
    (vector NS EW (gps/haversine gps-start gps-end))))

(defn print-entity[start-lat start-lon entity]
  (let [location-ent (d/entity (d/db conn) (first entity))
        vendor-ent (first (:location/vendor location-ent))
        geocode (:location/geocode location-ent)
        lat (:location/lat location-ent)
        lon (:location/lon location-ent)
        vendor-name (:vendor/name vendor-ent)
        vendor-deal (:vendor/deal vendor-ent)]
    (println "-----------------------------------")
    (println (str "geocode: " geocode))
    (println (str "lat:     " lat))
    (println (str "lon:     " lon))
    (println (str "Vendor:  " vendor-name))
    (println (str "Deal:    " vendor-deal))
    (println  (heading-distance {:lat start-lat :lon start-lon}
                                {:lat lat :lon lon}))
    (println)))

(defn show-all-deals[start-lat start-lon]
  (let [results (d/q '[:find ?e :where [?e :location/geocode]] (d/db conn))]
    (doseq[r results]
      (print-entity start-lat start-lon r))))

(defn get-nearest-deals
  "Get deals within a certain radius"
  [lat lon n]
  (let [geocode (.substring (geohash/encode (vector lat lon)) 0 n)
        pad-str1 (.substring "000000000000" 0 (- 12 n))
        pad-str2 (.substring "zzzzzzzzzzzz" 0 (- 12 n))
        start (str geocode pad-str1)
        end (str geocode pad-str2)
        res (d/q '[:find ?e :in $ ?start ?end
                   :where [?e :location/geocode ?g]
                          [(>= ?g ?start)]
                          [(< ?g ?end)]]
                 (d/db conn) start end)]
    (println start)
    (println end)
    (println (count res))
    (doseq[r res]
      (print-entity lat lon r))))




;; Some test data around my house (Trying to link char to distance)
;; We may need to show distances and directions as well
(save-deal 53.99134711 -6.39824867 "Outside House" "Deal 1")
(save-deal 53.99101911 -6.39863491 "Middle of grass" "Deal 1.5")
(save-deal 53.99086773 -6.3988924  "End of grass"  "Deal 2")
(save-deal 53.99031266 -6.40017986 "Junction DublinRD" "Deal 3")
(save-deal 53.98908894 -6.39942884 "Hospital Junction" "Deal4")
(save-deal 53.99369399 -6.39780177 "Tom Bellew Avenue" "Small Shop")
(save-deal 53.99369399 -6.39516288 "Bellew Ave" "At round about")

;(show-all-deals 53.99134711 -6.40017986)
(get-nearest-deals 53.99134711 -6.39824867 5 )


(d/delete-database uri)
