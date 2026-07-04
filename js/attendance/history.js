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

    container.innerHTML =

    data.map(item=>`

        <div
        class="attendance-card">

            <h4>

                ${formatDate(item.date)}

            </h4>

            <p>

                🕒 ${item.checkIn || "-"}

            </p>

            <p>

                ${item.status}

            </p>

        </div>

    `)

    .join("");

}
