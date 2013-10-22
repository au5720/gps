(require '[datomic.api :as d])

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

(def first-transact
  (datomic.api/transact conn
                        [{
                          :db/id #db/id[:db.part/user -1000001]
                          :vendor/name "Quick deals"
                          :vendor/deal "Buy one get one free"}
                         {:db/id #db/id [:db.part/user -1000002]
                          :location/vendor #db/id[:db.part/user -1000001]
                          :location/geocode "abcfwert2asr"
                          :location/lat 50.21345123
                          :location/lon -6.32567134}
                         ]))


;; now let get the database value
(def dbval (d/db conn))

;; Query for the new hash value
(def q-result (d/q '[:find ?e
                     :where [?e :vendor/name] ]
                   dbval))

;; The result
(count  q-result)

;; Turn this into an entity to get its properties etc
(def ent (d/entity dbval (ffirst q-result)))

(keys  ent)
(vals ent)

(println  (:location/vendor ent))
(:db/doc ent)

(require '[geohash.core :as geohash])

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
