/* =========================
   SOLANA API
========================= */

const SOLANA_BASE_URL =
"https://solana-gateway.moralis.io";

/* =========================
   SOLANA MINT
========================= */

const SOLANA_MINT = {

    USDC:
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",

    USDT:
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"

};

/* =========================
   FETCH SOLANA WALLET
========================= */

async function fetchSolanaWallet(address){

    try{

        const response = await fetch(

            `${SOLANA_BASE_URL}/account/mainnet/${address}/portfolio`,

            {

                headers:{

                    "accept":"application/json",

                    "X-API-Key":
                    MORALIS.API_KEY

                }

            }

        );

        const data =
        await response.json();

        console.log(
            "Solana Portfolio:",
            data
        );

        const tokens = [];

        /* =====================
           NATIVE SOL
        ===================== */

        const solBalance =

        Number(
            data?.nativeBalance?.solana || 0
        );

        if(solBalance > 0){

            tokens.push({

    symbol:"SOL",

    balance:solBalance,

    amount:solBalance,

    usd_value:
    solBalance *
    (Wallet.prices.SOL || 0),

    network:"sol"

});

        }

        /* =====================
           SPL TOKEN
        ===================== */

        for(const token of (data.tokens || [])){

            const mint =
            token.mint;

            const amount =

            Number(
                token.amount || 0
            );

            if(

                mint ===
                SOLANA_MINT.USDC

            ){

                tokens.push({

    symbol:"USDC",

    balance:amount,

    amount:amount,

    usd_value:amount,

    network:"sol"

});

            }

            if(

                mint ===
                SOLANA_MINT.USDT

            ){

                tokens.push({

    symbol:"USDT",

    balance:amount,

    amount:amount,

    usd_value:amount,

    network:"sol"

});

            }

        }

        console.log(
            "Solana Final:",
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
