/* =========================
   WALLET CACHE
========================= */

const CACHE_KEY =

"wallet-cache";

const CACHE_TIME =

"wallet-cache-time";

const CACHE_DURATION =

10 * 60 * 1000;

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

    const cache =

    localStorage.getItem(

        CACHE_KEY

    );

    const time =

    Number(

        localStorage.getItem(

            CACHE_TIME

        )

    );

    if(

        !cache ||

        !time

    ){

        return false;

    }

    const expired =

        Date.now() -

        time >

        CACHE_DURATION;

    if(expired){

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
