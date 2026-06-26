
/* =====================================================
   Finance Dashboard v1.0
   File : insight.js
===================================================== */

/* ===========================
   CREATE INSIGHT
=========================== */

function createInsightItem(item){

    return `

    <div class="analytics-item">

        <span>

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

    if(!container) return;

    container.innerHTML =

    Finance.insight

    .map(createInsightItem)

    .join("");

}
