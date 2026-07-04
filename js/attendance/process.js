/* =====================================================
   ATTENDANCE PROCESS
===================================================== */

/* =========================
   NORMALIZE
========================= */

function normalizeAttendance(){

    Attendance.data =

    Attendance.raw.map(item=>{

        return{

            date:

            item.Date ||

            "",

            checkIn:

            item.CheckIn ||

            "",

            status:

            item.Status ||

            "",

            lateMinutes:

            Number(

                item.LateMinutes

            ) || 0,

            month:

            item.Month ||

            "",

            year:

            Number(

                item.Year

            ) || 0,

            notes:

            item.Notes ||

            ""

        };

    });

}

/* =========================
   TODAY
========================= */

function calculateTodayAttendance(){

    const today =

    new Date()

    .toLocaleDateString(

        "sv-SE"

    );

    Attendance.current =

    Attendance.data.find(

        item=>

        item.date===today

    ) || null;

}

/* =========================
   PROCESS
========================= */

function processAttendance(){

    normalizeAttendance();

    calculateTodayAttendance();

}
