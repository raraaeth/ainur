/* =========================
   RENDER WALLET
========================= */

function updateWalletDashboard(){

    const summary =
    Wallet.summary;

    if(!summary){

        return;

    }

    console.log(

        "Wallet Dashboard",

        summary

    );

    updateCryptoSummary();

}

function updateCryptoSummary(){

    Wallet.dashboard = {

    totalUSD:

    Wallet.summary.totalUSD,

    coreUSD:

    Wallet.summary.coreUSD,

    totalWallets:

    Wallet.summary.totalWallets,

    totalTokens:

    Wallet.summary.totalTokens,

    topHoldings:

    getTopHoldings()

};

/* =========================
   TOP HOLDINGS
========================= */

function getTopHoldings(){

    const holdings = {};

    for(const wallet of Wallet.tokens){

        for(const token of wallet.tokens){

            const symbol =
            (token.symbol || "")
            .toUpperCase();

            const usd =
            Number(
                token.usd_value || 0
            );

            if(!holdings[symbol]){

                holdings[symbol] = {

                    symbol,

                    usd:0

                };

            }

            holdings[symbol].usd += usd;

        }

    }

    return Object.values(holdings)

    .sort(

        (a,b)=>

        b.usd-a.usd

    )

    .slice(0,3);

}
