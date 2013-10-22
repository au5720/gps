(require '[datomic.api :as d])
(require '[geohash.core :as geohash])

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


(defn show-all-deals[]
  (let [results (d/q '[:find ?e :where [?e :location/geocode]] (d/db conn))]
    (doseq[r results]
      (let [location-ent (d/entity dbval (first r))
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
        (println)))))



(show-all-deals)


(d/delete-database uri)
