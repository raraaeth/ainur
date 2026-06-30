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

        const response = await fetch(

            `${SOLANA_BASE_URL}/account/mainnet/${address}/tokens`,

            {
                headers:{
                    "accept":"application/json",
                    "X-API-Key":MORALIS.API_KEY
                }
            }

        );

        const data =
        await response.json();

        const data =
await response.json();

console.log(
    "Solana JSON:"
);

console.log(
    JSON.stringify(
        data,
        null,
        2
    )
);
       console.log(
    "Before Filter:",
    data
);

const tokens =
filterWalletTokens(
    data.tokens || data || []
);

console.log(
    "After Filter:",
    tokens
);

return tokens;

    }catch(error){

        console.error(
            "Solana Error:",
            error
        );

        return [];

    }

}
