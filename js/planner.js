/* =====================================================
   Life Dashboard v1.0
   File : planner.js
===================================================== */

/* ===========================
   CREATE PLANNER ITEM
=========================== */

function createPlannerItem(item){

    const icon = {

        birthday:"🎂",

        anniversary:"💍",

        reminder:"📄",

        maintenance:"🔧"

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

                ${item.daysLeft}

                hari lagi

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

    const planner =

    Finance.planner

    .filter(item=>

        !item.completed

    )

    .sort(

        (a,b)=>

        a.daysLeft-b.daysLeft

    )

    .slice(0,5);

    if(planner.length===0){

        container.innerHTML=

        "<p>Tidak ada planner aktif 🎉</p>";

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

    const container =

    document.getElementById(

        "plannerHistoryContainer"

    );

    if(!container) return;

    const history =

    Finance.planner

    .filter(

        item=>item.completed

    )

    .sort(

        (a,b)=>

        b.transaction.date-

        a.transaction.date

    )

    .slice(0,5);

    if(history.length===0){

        container.innerHTML=

        "<p>Belum ada riwayat planner.</p>";

        return;

    }

    container.innerHTML=

    history

    .map(item=>`

        <div class="analytics-item">

            <div>

                <strong>

                    ✔ ${item.title}

                </strong>

                <br>

                <small>

                    ${formatDate(

                        item.transaction.date

                    )}

                </small>

            </div>

        </div>

    `)

    .join("");

}


