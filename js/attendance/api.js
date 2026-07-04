/* =====================================================
   ATTENDANCE API
===================================================== */

/* =========================
   FETCH ATTENDANCE
========================= */

async function fetchAttendance(){

    const response =

    await fetch(

        Attendance.sheetUrl

    );

    Attendance.raw =

    await response.json();

}

/* =========================
   SEND ATTENDANCE
========================= */

async function sendAttendance(data){

    const response =

    await fetch(

        Attendance.scriptUrl,

        {

            method:"POST",

            body:

            JSON.stringify(data)

        }

    );

    return await response.json();

}
