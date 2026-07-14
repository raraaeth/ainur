/* =====================================================
   ATTENDANCE DASHBOARD
===================================================== */

/* =========================
   UPDATE CHECK IN CARD
========================= */

function updateCheckInCard(){

    const button =
    document.getElementById(
        "checkInButton"
    );

    const badge =
    document.getElementById(
        "attendanceBadge"
    );

    const time =
    document.getElementById(
        "attendanceTime"
    );

    const state =
    document.getElementById(
        "attendanceState"
    );

    const message =
    document.getElementById(
        "attendanceMessage"
    );

    if(
        !button ||
        !badge ||
        !time ||
        !state ||
        !message
    ) return;

    /* =====================
       BELUM CHECK IN
    ===================== */

    if(!Attendance.current){
       
   

        button.disabled = false;

        button.textContent =
        "✅ Check In";

        badge.className =
        "attendance-badge badge-warning";

        badge.textContent =
        "Waiting";

        time.textContent =
        "-- : --";

        state.textContent =
        "Belum Check In";

        message.textContent =
        "Jangan lupa melakukan check in sebelum pukul 06.00 WIB.";

        return;

    }

    /* =====================
       SUDAH CHECK IN
    ===================== */
   

    button.disabled = true;

    button.textContent =
    "✔ Attendance Completed";

    let badgeClass =
    "badge-success";

    let icon = "🟢";

    switch(
        Attendance.current.status
    ){

        case "Late":

            badgeClass =
            "badge-danger";

            icon = "🔴";

            break;

        case "Holiday":

            badgeClass =
            "badge-warning";

            icon = "🏖";

            break;

        case "Sick":

            badgeClass =
            "badge-info";

            icon = "🤒";

            break;

        case "Leave":

            badgeClass =
            "badge-purple";

            icon = "📅";

            break;

    }

    badge.className =
    `attendance-badge ${badgeClass}`;

    badge.textContent =
    `${icon} ${Attendance.current.status}`;

    time.textContent =
    Attendance.current.checkIn
    ?
    Attendance.current.checkIn.replaceAll(".",":")

    :
    "-- : --";

    state.textContent =
    Attendance.current.status;

    if(
        Attendance.current.status==="Late"
    ){

        message.textContent =
        `Terlambat ${Attendance.current.lateMinutes} menit hari ini.`;

    }

    else{

        message.textContent =
        "Kerja bagus! Pertahankan kedisiplinanmu. 🔥";

    }

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

    const s = Attendance.summary;

    container.innerHTML =

    `

    <div class="summary-box">

        <small>

            🟢 On Time

        </small>

        <strong>

            ${s.onTime}

        </strong>

    </div>

    <div class="summary-box">

        <small>

            🔴 Late

        </small>

        <strong>

            ${s.late}

        </strong>

    </div>

    <div class="summary-box">

        <small>

            👤 Present

        </small>

        <strong>

            ${s.present}

        </strong>

    </div>

    <div class="summary-box">

        <small>

            🔥 Current Streak

        </small>

        <strong>

            ${s.currentStreak}

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
   /* =====================
       CHARACTER ANIMATION
    ===================== */

    updateAttendanceAnimation();
   

}
