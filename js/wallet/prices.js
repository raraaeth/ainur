/* =========================
   WALLET PRICES
========================= */

Wallet.prices = {

    BTC:0,

    ETH:0,

    BNB:0,

    SOL:0

};

/* =========================
   FETCH PRICE
========================= */

async function fetchWalletPrices(){

    try{

        const response = await fetch(

            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd"

        );

        const data = await response.json();

        Wallet.prices = {

            BTC:data.bitcoin.usd,

            ETH:data.ethereum.usd,

            BNB:data.binancecoin.usd,

            SOL:data.solana.usd

        };

        console.log(

            "Wallet Prices",

            Wallet.prices

        );

    }catch(error){

        console.error(

            "Price Error",

            error

        );

    }

}
