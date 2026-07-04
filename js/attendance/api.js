/* =====================================================
   ATTENDANCE API
===================================================== */

/* =========================
   CHECK IN
========================= */

async function sendAttendance(data){

    const response =

    await fetch(

        Attendance.apiUrl,

        {

            method:"POST",

            body:JSON.stringify(data)

        }

    );

    return await response.json();

}
