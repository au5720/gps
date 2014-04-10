(ns gps.core
  (:require [cljs.reader :as reader]
            [goog.events :as events]
            [goog.dom :as gdom]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
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
  (atom {:classes [] :deals []}))


(defn deal-view [deal owner]
  (reify
    om/IRender
    (render [this]
      (dom/li nil
              (dom/div nil
                       (dom/div nil (:location/geocode deal))
                       (dom/div nil (:location/lat deal))
                       (dom/div nil (:location/lon deal))
;                       (dom/div nil (:location/lat deal))
;                       (dom/div nil (:location/lat deal))
;                       (dom/div nil (:location/lat deal))
;                       (dom/div nil (:location/lat deal))
;                       (dom/div nil (:location/lat deal))


                       )))))

(defn deals-view [app owner]
  (reify
    om/IWillMount
    (will-mount [_]
      (edn-xhr
        {:method :get
         :url "deals"
         :on-complete #(om/transact! app :deals (fn [_] %))}))
    om/IRender
    (render [_]
      (dom/div #js {:id "deals"}
        (dom/h2 nil "Deals")
        (apply dom/ul nil
               (om/build-all deal-view (:deals app)))))))

(om/root deals-view app-state
  {:target (gdom/getElement "deals")})
