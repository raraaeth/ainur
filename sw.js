/* =====================================================
   LIFE DASHBOARD PWA
===================================================== */

const CACHE_NAME = "ainur-dashboard-v3";

const FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./css/cards.css",

    "./css/chart.css",

    "./css/table.css",

    "./css/stats.css",

    "./css/planner.css",

    "./css/attendance.css",

    "./css/airdrop.css",

    "./css/footer.css",

    "./css/responsive.css"

];

/* =========================
   INSTALL
========================= */

self.addEventListener(

    "install",

    event=>{

        event.waitUntil(

            caches.open(

                CACHE_NAME

            ).then(cache=>

                cache.addAll(

                    FILES

                )

            )

        );

    }

);

/* =========================
   FETCH
========================= */

self.addEventListener(

    "fetch",

    event=>{

        event.respondWith(

            caches.match(

                event.request

            ).then(response=>{

                return response ||

                fetch(

                    event.request

                );

            })

        );

    }

);

/* =========================
   ACTIVATE
========================= */

self.addEventListener(

    "activate",

    event=>{

        event.waitUntil(

            caches.keys()

            .then(keys=>

                Promise.all(

                    keys.map(key=>{

                        if(

                            key!==CACHE_NAME

                        ){

                            return caches.delete(

                                key

                            );

                        }

                    })

                )

            )

        );

    }

);
