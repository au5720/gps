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

(println "Hello world!")

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
         :coord {:lon 53.345009999999995 :lat -6.2613717}}))

(defn show-position[]
  (js/navigator.geolocation.getCurrentPosition
    (fn[position]
      (let [lon (.-longitude (.-coords position))
            lat (.-latitude  (.-coords position))]
        (println lon)
        (println lat)
        #js {:lon lon :lat lat}))
      ;(println (.-latitude  (.-coords position)))
      ;(println (.-longitude (.-coords position))))
    (fn[error]
      (println (-.code error)))))


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
       (let [lon (.-longitude (.-coords position))
             lat (.-latitude  (.-coords position))
             new-coord {:lon lon :lat lat}]
         (put! ch new-coord)))
      (fn[error]
        (println (-.code error))))))

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
                    radius (int (* 10 (rand)))]
                (get-deals lat lon radius #(om/transact! app :deals (fn [_] %)))
                (recur))))))
       ;(edn-xhr
       ;  {:method :get
       ;   :url (str "deals/" lon "/" lat "/" 2)
       ;   :on-complete #(om/transact! app :deals (fn [_] %))})))
    om/IRenderState
    (render-state [_ state]
      (dom/div #js {:id "deals"}
        (dom/h2 nil "Deals")
        (dom/button #js {:onClick #(save-coord % owner)} "Refresh")
        (apply dom/ul nil
               (om/build-all deal-view (:deals app)))))))


(om/root deals-view app-state
  {:target (gdom/getElement "deals")})



;(show-position)

