/* =====================================================
   ATTENDANCE HISTORY
===================================================== */

let attendanceShowAll = false;

/* =========================
   PREPARE HISTORY
========================= */

function prepareAttendanceHistory(){

    Attendance.history =

    [...Attendance.data]

    .sort(

        (a,b)=>

        b.dateObject -

        a.dateObject

    );

}

/* =========================
   RENDER HISTORY
========================= */     
               
function updateAttendanceHistory(){

    const container =

    document.getElementById(

        "attendanceHistory"

    );

    if(!container) return;

    const data =

    attendanceShowAll

    ? Attendance.history

    : Attendance.history.slice(0,5);

    if(data.length===0){

        container.innerHTML=

        `

        <div class="attendance-empty">

            Belum ada data attendance.

        </div>

        `;

        return;

    }

    container.innerHTML=

    data.map(item=>{

        let color="#22c55e";

        let icon="🟢";

        switch(item.status){

            case "Late":

                color="#ef4444";

                icon="🔴";

                break;

            case "Holiday":

                color="#f59e0b";

                icon="🏖";

                break;

            case "Sick":

                color="#3b82f6";

                icon="🤒";

                break;

            case "Leave":

                color="#a855f7";

                icon="📅";

                break;

        }

        return `

        <div

        class="attendance-history-card"

        style="border-left:4px solid ${color};">

            <div class="history-top">

                <strong>

                    ${icon}

                    ${item.status}

                </strong>

                <small>

                    ${formatDate(item.date)}

                </small>

            </div>

            <div class="history-bottom">

                <span>

                    🕒

                    ${item.checkIn
                    ?
                    item.checkIn.replaceAll(".",":")

                    :
                    "-"}

                </span>

                <span>

                    ${item.lateMinutes>0

                    ?

                    item.lateMinutes+

                    " min"

                    :

                    ""}

                </span>

            </div>

        </div>

        `;

    })

    .join("");

}


/* =========================
   TOGGLE HISTORY
========================= */

function toggleAttendanceHistory(){

    attendanceShowAll =

    !attendanceShowAll;

    updateAttendanceHistory();

    document.getElementById(

        "attendanceMore"

    ).textContent =

    attendanceShowAll

    ?

    "Lihat Lebih Sedikit"

    :

    "Lihat Semua";

}
