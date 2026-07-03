/* =====================================================
   AIRDROP API
===================================================== */

/* =========================
   AIRDROP SHEET
========================= */

const AIRDROP_SHEET =

"airdrop";

const AIRDROP_API_URL =

`https://opensheet.elk.sh/${CONFIG.SHEET_ID}/${AIRDROP_SHEET}`;


/* =========================
   FETCH AIRDROP
========================= */

async function fetchAirdrop(){

    try{

        const response =

        await fetch(

            AIRDROP_API_URL

        );

        Airdrop.raw =

        await response.json();

        console.log(

            "Airdrop Loaded :",

            Airdrop.raw.length

        );

        return Airdrop.raw;

    }

    catch(error){

        console.error(

            "Airdrop Error :",

            error

        );

        Airdrop.raw = [];

        return [];

    }

}
