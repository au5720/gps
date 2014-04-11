(ns gps.core
  (:require [ring.util.response :refer [file-response]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.edn :refer [wrap-edn-params]]
            [compojure.core :refer [defroutes GET PUT POST]]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [datomic.api :as d]
            [geohash.core :as geohash]
            [gps.orig :as gps]))

(def uri "datomic:free://localhost:4334/gps")
(def conn (d/connect uri))

(defn index []
  (file-response "public/html/index.html" {:root "resources"}))

(defn generate-response [data & [status]]
  {:status (or status 200)
   :headers {"Content-Type" "application/edn"}
   :body (pr-str data)})

(defn classes []
  (let [db (d/db conn)
        classes
        (vec (map #(d/touch (d/entity db (first %)))
               (d/q '[:find ?class
                      :where
                      [?class :class/id]]
                 db)))]
    (generate-response classes)))

(defn touch[db eid-list]
  (let [location-map (into {} (d/touch (d/entity db (first  eid-list))))
        vendor-map   (into {} (d/touch (d/entity db (second eid-list))))
        ret (conj location-map vendor-map)]
  ret))

;;
;; Get nearest deals
;;
(defn get-nearest-deals
  "Get deals within a certain radius"
  [lat lon n]
  (let [geocode (.substring (geohash/encode (vector lat lon)) 0 n)
        pad-str1 (.substring "000000000000" 0 (- 12 n))
        pad-str2 (.substring "zzzzzzzzzzzz" 0 (- 12 n))
        start (str geocode pad-str1)
        end (str geocode pad-str2)
        res (d/q '[:find ?e ?v :in $ ?start ?end
                   :where [?e :location/geocode ?g]
                          [?e :location/vendor ?v]
                          [(>= ?g ?start)]
                          [(< ?g ?end)]]
                 (d/db conn) start end)]
    (vec (map #(touch (d/db conn) %) res))))

(defn get-nearest-deals-1[lat lon n]
  (println (str lat " " lon " " n))
  (println (type lat))
   ; (generate-response
   ;(get-nearest-deals 53.99134711 -6.39824867 n)))

  (generate-response
   (get-nearest-deals (Float. lat) (Float. lon)  (Integer. n))))



(defn nearest-deals []
  (generate-response
   (get-nearest-deals 53.99134711 -6.39824867 5)))


(defn update-class [id params]
  (println  (str "id: " id " params: " params))
  (let [db    (d/db conn)
        title (:class/title params)
        eid   (ffirst
                (d/q '[:find ?class
                       :in $ ?id
                       :where
                       [?class :class/id ?id]]
                  db id))]
    (d/transact conn [[:db/add eid :class/title title]])
    (generate-response {:status :ok})))

(defroutes routes
  (GET "/" [] (index))
  (GET "/classes" [] (classes))
  (GET "/deals" [] (nearest-deals))
  (GET "/deals/:lat/:lon/:radius"
    {params :params}
    (get-nearest-deals-1 (:lat params)
                       (:lon params)
                       (:radius params)
                       ))
  (PUT "/class/:id/update"
    {params :params edn-params :edn-params}
    (update-class (:id params) edn-params))
  (route/files "/" {:root "resources/public"}))

(def app
  (-> routes
      wrap-edn-params))

(defonce server
  (run-jetty #'app {:port 8080 :join? false}))
