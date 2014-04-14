(ns gps.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs.reader :as reader]
            [goog.events :as events]
            [goog.dom :as gdom]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs.core.async :refer [put! chan <!]])
  (:import [goog.net XhrIo]
           goog.net.EventType
           [goog.events EventType]))

(enable-console-print!)

(def ^:private meths
  {:get "GET"
   :put "PUT"
   :post "POST"
   :delete "DELETE"})

(defn edn-xhr [{:keys [method url data on-complete]}]
  (let [xhr (XhrIo.)]
    (events/listen xhr goog.net.EventType.COMPLETE
      (fn [e]
        (on-complete (reader/read-string (.getResponseText xhr)))))
    (. xhr
      (send url (meths method) (when data (pr-str data))
        #js {"Content-Type" "application/edn"}))))

(def app-state
  (atom {:classes [] :deals []
         :coord {:lon 53.345009999999995 :lat -6.2613717 :radius 3}}))

(defn deal-view [deal owner]
  (reify
    om/IRender
    (render [this]
      (dom/li nil
              (dom/div nil
                       (dom/div nil (:location/geocode deal))
                       (dom/div nil (:location/lat deal))
                       (dom/div nil (:location/lon deal))
                       (dom/div nil (:vendor/name deal))
                       (dom/div nil (:vendor/deal deal)))))))

(defn get-deals [lat lon radius f]
   (edn-xhr
     {:method :get
      :url (str "deals/" lat "/" lon "/" radius)
      :on-complete f}))

(defn save-coord [e owner]
  (let [ch (om/get-state owner :coord-chan)]
    (js/navigator.geolocation.getCurrentPosition
     (fn[position]
       (try
           (let [lon (.-longitude (.-coords position))
                 lat (.-latitude  (.-coords position))
                 radius (rand-int 10)
                 new-coord {:lon lon :lat lat :radius radius}]
             (println new-coord)
             (println lon)
             (println lat)
             (println radius)
             (swap! app-state assoc :coord new-coord)
             (swap! app-state assoc :deals [])
             (put! ch new-coord))
         (catch js/Object e
           (println e))))
      (fn[error]
        (let [errcode (.-code error)]
          (cond
           (= errcode 1) (println "The user has denied you access to their location")
           (= errcode 2) (println "The network is down")
           (= errcode 3) (println "It took too long to calculate the user’s position")))))))

(defn lon-lat-view[app owner]
  (reify
    om/IRender
    (render[this]
      (let [{:keys [lon lat radius]} (:coord app)]
        (dom/div nil
          (dom/span nil (str "lon " lon " lat " lat " radius " radius)))))))

(defn deals-view [app owner]
  (reify
    om/IInitState
    (init-state [_]
      {:coord-chan (chan)})
    om/IWillMount
    (will-mount [_]
      (let [ch (om/get-state owner :coord-chan)]
        (go (loop []
              (let [coord-update (<! ch)
                    lon (:lon coord-update)
                    lat (:lat coord-update)
                    radius (:radius coord-update)]
                (get-deals lat lon radius #(om/transact! app :deals (fn [_] %)))
                (recur))))))
    om/IRenderState
    (render-state [_ state]
      (dom/div #js {:id "deals"}
        (dom/h2 nil "Deals")
        (println (:coord app))
        (dom/button #js {:onClick #(save-coord % owner)} "Refresh")
        (apply dom/ul nil
               (om/build-all deal-view (:deals app)))))))

(om/root lon-lat-view app-state
  {:target (gdom/getElement "coord")})

(om/root deals-view app-state
  {:target (gdom/getElement "deals")})


