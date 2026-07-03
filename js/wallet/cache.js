/* =========================
   WALLET CACHE
========================= */

const CACHE_KEY =

"wallet-cache";

const CACHE_TIME =

"wallet-cache-time";

const CACHE_DURATION =

60 * 60 * 1000;

/* =========================
   CACHE VALID
========================= */

function isWalletCacheValid(){

    const time =

    Number(

        localStorage.getItem(

            CACHE_TIME

        )

    );

    if(!time){

        return false;

    }

    return(

        Date.now() -

        time <

        CACHE_DURATION

    );

}


/* =========================
   SAVE CACHE
========================= */

function saveWalletCache(){

    localStorage.setItem(

        CACHE_KEY,

        JSON.stringify(

            Wallet.tokens

        )

    );

    localStorage.setItem(

        CACHE_TIME,

        Date.now()

    );

}

/* =========================
   LOAD CACHE
========================= */

function loadWalletCache(){

    if(

        !isWalletCacheValid()

    ){

        return false;

    }

    const cache =

    localStorage.getItem(

        CACHE_KEY

    );

    if(!cache){

        return false;

    }

    Wallet.tokens =

    JSON.parse(cache);

    console.log(

        "Wallet Cache Loaded"

    );

    return true;

}


/* =========================
   CLEAR CACHE
========================= */

function clearWalletCache(){

    localStorage.removeItem(

        CACHE_KEY

    );

    localStorage.removeItem(

        CACHE_TIME

    );

}
