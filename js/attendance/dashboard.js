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

    if(!button) return;

    /* =====================
       BELUM CHECK IN
    ===================== */

    if(!Attendance.current){

        button.disabled = false;

        button.textContent =

        "✅ Check In";

        return;

    }

    /* =====================
       SUDAH CHECK IN
    ===================== */

    button.disabled = true;

    button.textContent =

    "✔ Attendance Completed";

}

/* =========================
   UPDATE DASHBOARD
========================= */

function updateAttendanceDashboard(){

    updateCheckInCard();

}
