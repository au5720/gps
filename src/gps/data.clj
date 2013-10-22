(ns gps.data
  (:require [datomic.api :as d]
            [geohash.core :as geohash]))

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

(save-deal 53.98193516 -6.41601562 "Dundalk shop" "Free coffee")

(defn print-entity[entity]
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
    (println)))


(defn show-all-deals[]
  (let [results (d/q '[:find ?e :where [?e :location/geocode]] (d/db conn))]
    (doseq[r results]
      (print-entity r))))


(show-all-deals)

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
      (print-entity r))))

;(get-nearest-deals 53.98193516 -6.41601562 8)
(get-nearest-deals 53.99134711 -6.39824867 7)

;; Some test data around my house (Trying to link char to distance)
;; We may need to show distances and directions as well
(save-deal 53.99134711 -6.39824867 "Outside House" "Deal 1")
(save-deal 53.99101911 -6.39863491 "Middle of grass" "Deal 1.5")
(save-deal 53.99086773 -6.3988924  "End of grass"  "Deal 2")
(save-deal 53.99031266 -6.40017986 "Junction DublinRD" "Deal 3")
(save-deal 53.98908894 -6.39942884 "Hospital Junction" "Deal4")

(d/delete-database uri)
