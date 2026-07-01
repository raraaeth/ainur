
/* =====================================================
   Finance Dashboard v1.0
   File : insight.js
===================================================== */
/* ===========================
   PROCESS INSIGHT
=========================== */

function processInsight(){

    Finance.insight = [];

    processFinanceInsight();

    processCryptoInsight();

}

/* ===========================
/* ===========================
   FINANCE INSIGHT
=========================== */

function processFinanceInsight(){

    /* =========================
       CASHFLOW
    ========================= */

    if(Finance.summary.balance>=0){

        Finance.insight.push({

            icon:"📈",

            text:

            "Cashflow bulan ini masih positif."

        });

    }else{

        Finance.insight.push({

            icon:"📉",

            text:

            "Cashflow bulan ini masih negatif."

        });

    }

    /* =========================
       SAVING RATE
    ========================= */

    if(

        Finance.summary.savingRate>=20

    ){

        Finance.insight.push({

            icon:"🏦",

            text:

            `Saving Rate bulan ini ${Finance.summary.savingRate.toFixed(1)}%. Sangat baik, pertahankan!`

        });

    }else{

        Finance.insight.push({

            icon:"💰",

            text:

            `Saving Rate bulan ini ${Finance.summary.savingRate.toFixed(1)}%. Masih di bawah target 20%.`

        });

    }

    /* =========================
       TOP EXPENSE
    ========================= */

    if(

        Finance.statistics.highestExpense

    ){

        Finance.insight.push({

            icon:"💸",

            text:

            `Pengeluaran terbesar bulan ini berasal dari "${Finance.statistics.highestExpense.category}".`

        });

    }

    /* =========================
       TOP INCOME
    ========================= */

    if(

        Finance.statistics.highestIncome

    ){

        Finance.insight.push({

            icon:"💵",

            text:

            `Pemasukan terbesar bulan ini berasal dari "${Finance.statistics.highestIncome.category}".`

        });

    }

}

/* ===========================
   CREATE INSIGHT
=========================== */

function createInsightItem(item){

    return `

    <div class="insight-item">

        <span class="insight-text">

            ${item.icon}

            ${item.text}

        </span>

    </div>

    `;

}

/* ===========================
   UPDATE INSIGHT
=========================== */

function updateInsight(){

    const container =

    document.getElementById(

        "insightContainer"

    );

    const dailyInsight =

    document.getElementById(

        "dailyInsight"

    );

    if(container){

        container.innerHTML =

        Finance.insight

        .map(createInsightItem)

        .join("");

    }

    if(dailyInsight){

        if(Finance.insight.length===0){

            dailyInsight.innerHTML =

            "💡 Tidak ada insight hari ini.";

        }

        else{

            const random =

            Math.floor(

                Math.random() *

                Finance.insight.length

            );

            const item =

            Finance.insight[random];

            dailyInsight.innerHTML =

            `${item.icon} ${item.text}`;

        }

    }

}
