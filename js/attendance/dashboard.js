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

    button.disabled = false;

    button.textContent =

    "✅ Check In";

}

/* =========================
   UPDATE DASHBOARD
========================= */

function updateAttendanceDashboard(){

    updateCheckInCard();

}
