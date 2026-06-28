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

/* =========================
   UPDATE PORTFOLIO CARD
========================= */

function updatePortfolioCard(){

    const summary = getCryptoSummary();

    if(!summary) return;

    document.getElementById("portfolioUsd").textContent =
        "$" + summary.totalUSD.toLocaleString(
            "en-US",
            {
                minimumFractionDigits:2,
                maximumFractionDigits:2
            }
        );

    document.getElementById("portfolioIdr").textContent =
        "≈ " + formatShortIDR(
            summary.totalUSD * USD_IDR
        );

}

