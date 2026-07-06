/* =====================================================
   Life Dashboard v2.0
   File : planner.js
===================================================== */

/* ===========================
   CREATE PLANNER ITEM
=========================== */

function createPlannerItem(item){

    const icon={

        maintenance:"🔧",

        reminder:"📄",

        planning:"🎯",

        renovasi:"🏠",

        birthday:"🎂",

        anniversary:"💍",

        airdrop:"🪂"

    };

    const priority={

        high:"🔴",

        medium:"🟡",

        low:"🔵"

    };

    const statusText={

        today:"Hari Ini",

        completed:"✔ Selesai"

    };

    const rightText=

    statusText[item.status]||

    item.countdown;

    return `

    <div class="analytics-item ${item.status}">

        <div class="planner-left">

            <span class="planner-icon">

                ${priority[item.priority]}

                ${icon[item.type]||"📌"}

            </span>

            <span class="planner-title">

                ${item.title}

            </span>

        </div>

        <div class="planner-right">

            ${rightText}

        </div>

    </div>

    `;

}

/* ===========================
   UPDATE PLANNER
=========================== */

function updatePlanner(){

    const container =

    document.getElementById(

        "plannerContainer"

    );

    if(!container) return;

    const limit = 5;

    const planner =

    Finance.planner;

    const visible =

    Finance.plannerExpand

    ? planner

    : planner.slice(

        0,

        limit

    );

    let html = "";

    let currentStatus = "";

    const statusTitle={

        today:"Hari Ini",

        upcoming:"Segera",

        waiting:"Akan Datang",

        completed:"Selesai"

    };

    visible.forEach(item=>{

        if(

            currentStatus!==

            item.status

        ){

            currentStatus=

            item.status;

            html+=`

            <div class="planner-status">

                ${statusTitle[item.status]}

            </div>

            `;

        }

        html+=

        createPlannerItem(item);

    });

    if(

        planner.length>

        limit

    ){

        html+=`

        <div class="planner-more">

            <button

            onclick="togglePlanner()">

            ${

                Finance.plannerExpand

                ?

                "▲ Sembunyikan"

                :

                `▼ Planner lainnya (${planner.length-limit})`

            }

            </button>

        </div>

        `;

    }

    container.innerHTML=

    html;

}

/* ===========================
   TOGGLE PLANNER
=========================== */

function togglePlanner(){

    Finance.plannerExpand =

    !Finance.plannerExpand;

    updatePlanner();

}

/* ===========================
   UPDATE REMINDER HEADER
=========================== */

function updatePlannerHeader(){

    const container =
    document.getElementById(
        "plannerHeader"
    );

    if(!container) return;

    const reminder =

    Finance.planner.filter(item=>

        item.status==="today" ||

        item.status==="upcoming"

    );

    if(reminder.length===0){

        container.innerHTML=
        "✅ Tidak ada reminder.";

        return;

    }

    const icon={

        maintenance:"🔧",
        reminder:"📄",
        planning:"🎯",
        renovasi:"🏠",
        birthday:"🎂",
        anniversary:"💍",
        airdrop:"🪂"

    };

    const text=

    reminder.map(item=>{

    let label="";

    if(item.type==="airdrop"){

        label=

        item.note+

        " • ";

    }

    return `

    ${icon[item.type]||"📌"}

    <strong>

        ${label}${item.title}

    </strong>

    (${item.countdown})

    `;

}).join(

"&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;"

);

    /* selalu bergerak */

    container.style.animation=

    "reminderTicker 25s linear infinite";

    /* gandakan isi supaya tidak ada jeda */

    container.innerHTML=

    text+

    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+

    text+

    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+

    text;

}

