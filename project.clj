(defproject gps "0.1.0-SNAPSHOT"
  :description "backend of makes cents"
  :url "http://webapp-uk.vps.bitfolk.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :jvm-opts ^:replace ["-Xmx1g" "-server"]

  :dependencies [[org.clojure/clojure "1.5.1"]
                 [geohash "1.0.1"]
                 [org.clojure/clojurescript "0.0-2156"]
                 [ring/ring "1.2.1"]
                 [org.clojure/core.async "0.1.267.0-0d7780-alpha"]
                 [om "0.5.0"]
                 [om-sync "0.1.1"]
                 [compojure "1.1.6"]
                 [fogus/ring-edn "0.2.0"]
                 [com.datomic/datomic-free "0.9.4699"]]

  :plugins [[lein-cljsbuild "1.0.2"]]

  :source-paths ["src/clj" "src/cljs"]
  :resource-paths ["resources"]

  :cljsbuild {
    :builds [{:id "dev"
              :source-paths ["src/clj" "src/cljs"]
              :compiler {
                :output-to "resources/public/js/main.js"
                :output-dir "resources/public/js/out"
                :optimizations :none
                :source-map true}}
             {:id "ios"
              :source-paths ["src/clj" "src/cljs"]
              :compiler {
                :output-to "/Users/jennifermorgan/dev/hello/www/js/main.js"
                :output-dir "/Users/jennifermorgan/dev/hello/www/js/out"
                :optimizations :none
                :source-map true}}]})

