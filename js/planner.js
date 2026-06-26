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
