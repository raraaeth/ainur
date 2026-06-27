/* =====================================================
   Life Dashboard v1.0
   File : planner.js
===================================================== */

/* ===========================
   CREATE PLANNER ITEM
=========================== */

function createPlannerItem(item){

    const icon={

        birthday:"🎂",

        anniversary:"💍",

        maintenance:"🔧",

        reminder:"📄"

    };

    return `

    <div class="analytics-item">

        <div>

            <strong>

                ${icon[item.type]}

                ${item.title}

            </strong>

            <small>

                ${item.countdown}

            </small>

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

    const active =

    Finance.planner

    .filter(item=>

        item.status!=="completed"

    )

    .sort(

        (a,b)=>

        a.daysLeft-b.daysLeft

    );

    const completed =

    Finance.planner

    .filter(item=>

        item.status==="completed"

    )

    .sort(

        (a,b)=>

        b.lastTransaction.date-

        a.lastTransaction.date

    );

    const activeList =

    active.slice(0,5);

    let html =

    activeList

    .map(createPlannerItem)

    .join("");

    if(

        completed.length>0

    ){

        html +=`

        <div
        class="planner-more">

        <button

        onclick="togglePlannerHistory()">

        ▼ Planner lainnya
        (${completed.length})

        </button>

        </div>

        `;

        if(

            Finance.plannerHistoryExpand

        ){

            html +=

            completed

            .map(

                createCompletedPlannerItem

            )

            .join("");

        }

    }

    container.innerHTML =

    html;

}
function createCompletedPlannerItem(item){

    return `

    <div

    class="analytics-item completed">

        <div>

            <strong>

            ✔ ${item.title}

            </strong>

            <small>

            Selesai

            </small>

        </div>

    </div>

    `;

}


/* ===========================
   TOGGLE HISTORY
=========================== */

function togglePlannerHistory(){

    Finance.plannerHistoryExpand=

    !Finance.plannerHistoryExpand;

    updatePlannerHistory();

       }
/* ===========================
   HEADER REMINDER
=========================== */

function updatePlannerHeader(){

    const container =

    document.getElementById(

        "plannerHeader"

    );

    if(!container) return;

    const planner =

    Finance.planner

    .filter(item=>

        item.status==="today" ||

        item.status==="upcoming"

    )

    .sort(

        (a,b)=>

        a.daysLeft-

        b.daysLeft

    )

    .slice(0,3);

    if(planner.length===0){

        container.textContent=

        "✅ Tidak ada reminder dalam waktu dekat.";

        return;

    }

    const icon={

        birthday:"🎂",

        anniversary:"💍",

        maintenance:"🔧",

        reminder:"📄"

    };

    container.innerHTML =

planner.map(item =>

`${icon[item.type]}
<b>${item.title}</b>
(${item.countdown})`

).join(

" &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; "

);

// Duplikat agar scroll tidak putus

container.innerHTML +=

" &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; " +

container.innerHTML;

}
