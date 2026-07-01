/* =====================================================
   WALLET INSIGHT
===================================================== */

function processCryptoInsight(){

    if(!Finance.insight){

        Finance.insight=[];

    }

    /* =========================
       PORTFOLIO vs EXPENSE
    ========================= */

    if(

        Wallet.summary.totalUSD>0 &&

        Finance.summary.expense>0

    ){

        const months=

        (Wallet.summary.totalUSD*USD_IDR)/

        Finance.summary.expense;

        Finance.insight.push({

            icon:"💰",

            text:

            `Nilai portfolio saat ini setara ${months.toFixed(1)} bulan pengeluaran.`

        });

    }

    /* =========================
       CORE ASSET
    ========================= */

    if(

        Wallet.summary.coreUSD>0 &&

        Wallet.summary.totalUSD>0

    ){

        const percent=

        Wallet.summary.coreUSD/

        Wallet.summary.totalUSD*100;

        Finance.insight.push({

            icon:"🪙",

            text:

            `Core Asset mencakup ${percent.toFixed(1)}% dari total portfolio.`

        });

    }

    /* =========================
       TOP HOLDING
    ========================= */

    if(

        Wallet.summary.topHolding &&

        Wallet.summary.topHolding.length

    ){

        const top=

        Wallet.summary.topHolding[0];

        Finance.insight.push({

            icon:"🔥",

            text:

            `${top.symbol} menjadi aset terbesar senilai $${top.usd.toFixed(2)}.`

        });

    }

    /* =========================
       WALLET
    ========================= */

    Finance.insight.push({

        icon:"👛",

        text:

        `${Wallet.summary.totalWallets} wallet aktif sedang dipantau.`

    });

}
