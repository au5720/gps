(ns gps.util
  (:require [datomic.api :as d]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [geohash.core :as geohash])
  (:import datomic.Util))

(def uri "datomic:free://localhost:4334/gps")

(defn read-all [f]
  (Util/readAll (io/reader f)))

(defn transact-all [conn f]
  (doseq [txd (read-all f)]
    (d/transact conn txd))
  :done)

(defn create-db []
  (d/delete-database uri)
  (d/create-database uri))

(defn get-conn []
  (d/connect uri))

(defn load-schema []
  (transact-all (get-conn) (io/resource "data/schema.edn"))
  (transact-all (get-conn) (io/resource "data/gps_schema.edn")))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn save-deal[lat lon vendor-name deal-txt]
  (let [vendor-tmp-id (datomic.api/tempid :db.part/user)
        location-tmp-id (datomic.api/tempid :db.part/user)
        geohash (geohash/encode (vector lat lon))]
    (datomic.api/transact (get-conn)
           `[{
             :db/id ~vendor-tmp-id
             :vendor/name ~vendor-name
             :vendor/deal ~deal-txt}
            {:db/id ~location-tmp-id
             :location/vendor ~vendor-tmp-id
             :location/geocode ~geohash
             :location/lat ~lat
             :location/lon ~lon}])))

(defn save-deals[]
  (save-deal 53.99134711 -6.39824867 "Outside House" "Deal 1")
  (save-deal 53.99101911 -6.39863491 "Middle of grass" "Deal 1.5")
  (save-deal 53.99086773 -6.3988924  "End of grass"  "Deal 2")
  (save-deal 53.99031266 -6.40017986 "Junction DublinRD" "Deal 3")
  (save-deal 53.98908894 -6.39942884 "Hospital Junction" "Deal4")
  (save-deal 53.99369399 -6.39780177 "Tom Bellew Avenue" "Small Shop")
  (save-deal 53.99369399 -6.39516288 "Bellew Ave" "At round about"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn load-data []
  (transact-all (get-conn) (io/resource "data/initial.edn"))
  (save-deals))

(defn init-db []
  (create-db)
  (load-schema)
  (load-data))

(init-db)
