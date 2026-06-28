/* =========================
   SOLANA API
========================= */

const SOLANA_BASE_URL =
"https://solana-gateway.moralis.io";

/* =========================
   FETCH SOLANA TOKEN
========================= */

async function fetchSolanaTokens(address){

    try{

        const response = await fetch(

            `${SOLANA_BASE_URL}/account/mainnet/${address}/tokens`,

            {
                headers:{
                    "accept":"application/json",
                    "X-API-Key":MORALIS.API_KEY
                }
            }

        );

        const data = await response.json();

        return data.tokens || [];

    }catch(error){

        console.error(
            "Solana Error:",
            error
        );

        return [];

    }

}


/* =========================
   FETCH ALL SOLANA
========================= */

async function fetchAllSolanaWallets(){

    const solWallets = Wallet.raw.filter(

        item =>

        item.Aktif === "TRUE" &&
        item.Network === "solana"

    );

    for(const wallet of solWallets){

        const tokens =
        filterWalletTokens(

            await fetchSolanaTokens(
                wallet.Address
            )

        );

        Wallet.tokens.push({

            portfolio:wallet.Portofolio,

            network:"solana",

            provider:wallet.Provider,

            address:wallet.Address,

            tokens

        });

    }

}


