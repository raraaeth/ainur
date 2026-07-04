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
   SUMMARY
========================= */

function updateAttendanceSummary(){

    const container =

    document.getElementById(

        "attendanceSummary"

    );

    if(!container) return;

    const s =

    Attendance.summary;

    container.innerHTML =

    `

    <div class="summary-box">

        <small>👤 Present</small>

        <strong>${s.present}</strong>

    </div>

    <div class="summary-box">

        <small>🟢 On Time</small>

        <strong>${s.onTime}</strong>

    </div>

    <div class="summary-box">

        <small>🔴 Late</small>

        <strong>${s.late}</strong>

    </div>

    <div class="summary-box">

        <small>🏖 Holiday</small>

        <strong>${s.holiday}</strong>

    </div>

    <div class="summary-box">

        <small>🤒 Sick</small>

        <strong>${s.sick}</strong>

    </div>

    <div class="summary-box">

        <small>📅 Leave</small>

        <strong>${s.leave}</strong>

    </div>

    <div class="summary-box">

    <small>

        🔥 Current Streak

    </small>

    <strong>

        ${s.currentStreak}

    </strong>

</div>

<div class="summary-box">

    <small>

        ⭐ Best Streak

    </small>

    <strong>

        ${s.bestStreak}

    </strong>

</div>

    `;

}

/* =========================
   HEADER
========================= */

function updateAttendanceHeader(){

    const greeting =

    document.getElementById(

        "greetingText"

    );

    const status =

    document.getElementById(

        "dailyStatus"

    );

    if(
        !greeting ||
        !status
    ) return;

    /* =====================
       BELUM CHECK IN
    ===================== */

    if(!Attendance.current){

        greeting.textContent =

        "⏳ Jangan lupa check in hari ini.";

        status.textContent =

        `🔥 Current Streak : ${Attendance.summary.currentStreak} Hari`;

        return;

    }

    let icon = "🟢";

    let text = Attendance.current.status;

    switch(Attendance.current.status){

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

    greeting.textContent =

        `${icon} ${text}`;

    if(

        Attendance.current.status==="Late"

    ){

        status.textContent =

        `⚠️ Terlambat ${Attendance.current.lateMinutes} menit`;

    }

    else{

        status.textContent =

        `🔥 Current Streak : ${Attendance.summary.currentStreak} Hari`;

    }

}

/* =========================
   UPDATE DASHBOARD
========================= */

function updateAttendanceDashboard(){

    updateAttendanceHeader();

    updateCheckInCard();

    updateAttendanceSummary();

    updateAttendanceHistory();

}
