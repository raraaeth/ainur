/* =====================================================
   ATTENDANCE DASHBOARD
===================================================== */

/* =========================
   UPDATE CHECK IN CARD
========================= */

function updateCheckInCard(){

    const button =

    document.querySelector(

        ".btn-checkin"

    );

    const message =

    document.getElementById(

        "attendanceMessage"

    );

    const info =

    document.getElementById(

        "attendanceInfo"

    );

    const header =

    document.getElementById(

        "dailyStatus"

    );

    if(
        !button ||
        !message ||
        !info ||
        !header
    ) return;

    /* =====================
       BELUM CHECK IN
    ===================== */

    if(!Attendance.current){

        button.disabled = false;

        button.textContent =

        "✅ Check In";

        message.textContent =

        "Hari ini kamu belum check in.";

        info.innerHTML = "";

        header.textContent =

        "⏳ Belum check in hari ini.";

        return;

    }

    /* =====================
       SUDAH CHECK IN
    ===================== */

    button.disabled = true;

    button.textContent =

        "✔ Attendance Completed";

    message.textContent =

        Attendance.current.checkIn;

    let icon = "🟢";

    switch(

        Attendance.current.status

    ){

        case "Late":

            icon = "🔴";

            break;

        case "Holiday":

            icon = "🏖";

            break;

        case "Sick":

            icon = "🤒";

            break;

        case "Leave":

            icon = "📅";

            break;

    }

    info.innerHTML =

    `

    <strong>

        ${icon}
        ${Attendance.current.status}

    </strong>

    <br>

    Late :

    ${Attendance.current.lateMinutes}

    Minute

    `;

    header.textContent =

    `${icon} ${Attendance.current.status}`;

}

/* =========================
   UPDATE DASHBOARD
========================= */

function updateAttendanceDashboard(){

    updateCheckInCard();

}
