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

        container.innerHTML =

        `

        <div class="attendance-empty">

            Belum ada data attendance.

        </div>

        `;

        return;

    }

    container.innerHTML =

    data.map(item=>{

        let icon="🟢";

        let color="badge-ontime";

        let detail="";

        switch(item.status){

            case "Late":

                icon="🔴";

                color="badge-late";

                detail=

                `Late ${item.lateMinutes} Minutes`;

                break;

            case "Holiday":

                icon="🏖";

                color="badge-holiday";

                break;

            case "Sick":

                icon="🤒";

                color="badge-sick";

                break;

            case "Leave":

                icon="📅";

                color="badge-leave";

                break;

        }

        return `

        <div class="attendance-card">

            <div class="attendance-card-top">

                <span

                    class="attendance-badge ${color}">

                    ${icon}

                    ${item.status}

                </span>

            </div>

            <h4>

                ${formatDate(item.date)}

            </h4>

            <p>

                🕒

                ${item.checkIn || "-"}

            </p>

            ${

                detail

                ?

                `<p>${detail}</p>`

                :

                ""

            }

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
