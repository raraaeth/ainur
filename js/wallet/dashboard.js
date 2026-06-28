/* =========================
   WALLET DASHBOARD
========================= */

function getCryptoSummary(){

    return Wallet.summary;

}

/* =========================
   GET PORTFOLIO
========================= */

function getPortfolioSummary(
    portfolio
){

    return (

        Wallet.summary
        .portfolios[
            portfolio
        ] ||

        null

    );

}

/* =========================
   GET CORE VALUE
========================= */

function getCoreCryptoValue(){

    return Wallet.summary.coreUSD;

}


