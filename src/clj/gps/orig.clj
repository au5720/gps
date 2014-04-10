(ns gps.orig
  (:require [geohash.core :as geohash]))

(def R 6367)

(defn rad [x]
  (* x  (/ Math/PI 180)))

(defn haversine [position destination]
  (let [square_half_chord
        (+ (Math/pow (Math/sin (/ (rad (- (destination :lat) (position :lat))) 2)) 2)
           (* (Math/cos (rad (position :lat)))
              (Math/cos (rad (destination :lat)))
              (Math/pow (Math/sin (/ (rad (- (destination :lon) (position :lon))) 2)) 2)))
        angular_distance
        (* (Math/asin (Math/sqrt square_half_chord)) 2)]
    (* angular_distance R)))

(defn meter [x] (* x 1000))

(defn show-gps [a b]
  (let [a-gh (geohash/encode [ (:lat a) (:lon a)])
        b-gh (geohash/encode [ (:lat b) (:lon b)])]
    (println  a-gh)
    (println b-gh)
    (println (meter (haversine a b)))))
