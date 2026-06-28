/* =========================
   PROCESS WALLET
========================= */

function processWalletData(){

    Wallet.summary = {

    totalUSD:0,

    coreUSD:0,

    totalWallets:Wallet.summary.totalWallets,

    totalTokens:0,

    portfolios:{}

};

    for(const wallet of Wallet.tokens){

        if(

            !Wallet.summary.portfolios[
                wallet.portfolio
            ]

        ){

            Wallet.summary.portfolios[
                wallet.portfolio
            ]={

                totalUSD:0,

coreUSD:0,

totalTokens:0,

evm:[],

sol:[]

            };

        }

        const portfolio =

        Wallet.summary.portfolios[
            wallet.portfolio
        ];

        for(const token of wallet.tokens){
for(const token of wallet.tokens){

    const usd =
    Number(
        token.usd_value || 0
    );

    const symbol =
    token.symbol || "";

    const isCore =
    CORE_ASSET.includes(symbol);

    portfolio.totalUSD += usd;

    portfolio.totalTokens++;

    Wallet.summary.totalUSD += usd;

    Wallet.summary.totalTokens++;

    if(isCore){

        portfolio.coreUSD += usd;

        Wallet.summary.coreUSD += usd;

    }

    if(wallet.network === "evm"){

        portfolio.evm.push(token);

    }else{

        portfolio.sol.push(token);

    }

  }
           
  }

    console.log(

        "Wallet Summary",

        Wallet.summary

    );

}
