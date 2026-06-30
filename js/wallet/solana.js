/* =========================
   SOLANA API
========================= */

const SOLANA_BASE_URL =
"https://solana-gateway.moralis.io";

/* =========================
   FETCH SOLANA WALLET
========================= */

async function fetchSolanaWallet(address){

    try{

        const url =
SOLANA_BASE_URL +
"/account/mainnet/" +
address +
"/portfolio";

const response = await fetch(

    url,

    {
        headers:{
            "accept":"application/json",
            "X-API-Key": MORALIS.API_KEY
        }
    }

);

        const data =
        await response.json();

        console.log(
            "Solana Portfolio:",
            data
        );

        // Sementara belum diproses
        return [];

    }catch(error){

        console.error(
            "Solana Error:",
            error
        );

        return [];

    }

}
