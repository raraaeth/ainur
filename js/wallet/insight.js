/* =====================================================
   WALLET INSIGHT
===================================================== */

function processCryptoInsight(){

    if(!Finance.insight){

        Finance.insight = [];

    }

    /* =========================
       PORTFOLIO vs EXPENSE
    ========================= */

    if(

        Wallet.summary.totalUSD > 0 &&

        Finance.summary.totalExpense > 0

    ){

        const months =

        (Wallet.summary.totalUSD * USD_IDR) /

        Finance.summary.totalExpense;

        Finance.insight.push({

            type:"info",

            icon:"💰",

            title:"Portfolio",

            text:

            `Portfolio crypto setara ${months.toFixed(1)} bulan pengeluaran.`

        });

    }

    /* =========================
       CORE ASSET
    ========================= */

    if(

        Wallet.summary.coreUSD > 0 &&

        Wallet.summary.totalUSD > 0

    ){

        const percent =

        Wallet.summary.coreUSD /

        Wallet.summary.totalUSD *

        100;

        Finance.insight.push({

            type:"success",

            icon:"🪙",

            title:"Core Asset",

            text:

            `Core asset mencakup ${percent.toFixed(1)}% dari total portfolio.`

        });

    }

    /* =========================
       WALLET
    ========================= */

    Finance.insight.push({

        type:"info",

        icon:"👛",

        title:"Wallet",

        text:

        `${Wallet.summary.totalWallets} wallet aktif dipantau.`

    });

}
