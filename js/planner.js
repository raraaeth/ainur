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

    const badge={

        today:"🟢 Hari Ini",

        upcoming:"🟡 Upcoming",

        waiting:"⚪ Waiting",

        overdue:"🔴 Overdue"

    };

    return `

    <div class="analytics-item">

        <div>

            <strong>

                ${icon[item.type]||"📌"}

                ${item.title}

            </strong>

            <br>

            <small>

                ${badge[item.status]}

            </small>

            <br>

            <small>

                ⏳ ${item.countdown}

            </small>

            <br>

            <small>

                📅 ${formatDate(item.nextDate)}

            </small>

            <br>

            <small>

                ${item.note}

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

    const order={

        today:0,

        upcoming:1,

        waiting:2,

        overdue:3

    };

    const planner=

    Finance.planner

    .filter(item=>

        item.status!=="completed"

    )

    .sort((a,b)=>{

        if(

            order[a.status]!==

            order[b.status]

        ){

            return(

                order[a.status]-

                order[b.status]

            );

        }

        return(

            a.daysLeft-

            b.daysLeft

        );

    })

    .slice(0,5);

    if(planner.length===0){

        container.innerHTML=

        "<p>🎉 Tidak ada planner aktif.</p>";

        return;

    }

    container.innerHTML=

    planner

    .map(createPlannerItem)

    .join("");

}

/* ===========================
   UPDATE PLANNER HISTORY
=========================== */

function updatePlannerHistory(){

    const container=

    document.getElementById(

        "plannerHistoryContainer"

    );

    if(!container) return;

    const history=

    Finance.planner

    .filter(item=>

        item.lastTransaction

    )

    .sort(

        (a,b)=>

        b.lastTransaction.date-

        a.lastTransaction.date

    );

    if(history.length===0){

        container.innerHTML=

        "<p>Belum ada riwayat planner.</p>";

        return;

    }

    const list=

    Finance.plannerHistoryExpand

    ?history

    :history.slice(

        0,

        Finance.plannerHistoryLimit

    );

    container.innerHTML=

    list.map(item=>`

        <div class="analytics-item">

            <div>

                <strong>

                    ✔ ${item.title}

                </strong>

                <br>

                <small>

                    📅 ${formatDate(

                        item.lastTransaction.date

                    )}

                </small>

            </div>

        </div>

    `).join("");

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

    const container=

    document.getElementById(

        "plannerHeader"

    );

    if(!container) return;

    const planner=

    Finance.planner

    .filter(item=>

        item.status!=="completed"

    )

    .sort(

        (a,b)=>

        a.daysLeft-

        b.daysLeft

    )

    .slice(0,3);

    if(planner.length===0){

        container.innerHTML=

        "<p>✅ Tidak ada reminder.</p>";

        return;

    }

    const icon={

        birthday:"🎂",

        anniversary:"💍",

        maintenance:"🔧",

        reminder:"📄"

    };

    container.innerHTML=

    planner.map(item=>`

        <div class="analytics-item">

            <span>

                ${icon[item.type]}

                <strong>

                    ${item.title}

                </strong>

                (${item.countdown})

            </span>

        </div>

    `).join("");

}
