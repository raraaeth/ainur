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

        Wallet.summary.totalTokens

    };

}
