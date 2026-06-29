
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
   FINANCE INSIGHT
=========================== */

function processFinanceInsight(){

    if(

        Finance.summary.savingRate >= 20

    ){

        Finance.insight.push({

            icon:"🟢",

            text:
            `Saving rate ${Finance.summary.savingRate.toFixed(1)}% melebihi target.`

        });

    }else{

        Finance.insight.push({

            icon:"🟡",

            text:
            `Saving rate ${Finance.summary.savingRate.toFixed(1)}% masih di bawah target.`

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
