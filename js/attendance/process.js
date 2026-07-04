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
   
   console.log(
    "TODAY",
    today
   );

    Attendance.current =

    Attendance.data.find(

        item=>

        item.date===today

    ) || null;

}

/* =========================
   SUMMARY
========================= */

function calculateAttendanceSummary(){

    const now = new Date();

    const currentMonth =

    now.toLocaleString(

        "en-US",

        {

            month:"long"

        }

    );

    const currentYear =

    now.getFullYear();

    const monthData =

    Attendance.data.filter(

        item=>

        item.month===currentMonth &&

        item.year===currentYear

    );

    Attendance.summary = {

        present:

        monthData.filter(

            item=>

            item.status==="OnTime" ||

            item.status==="Late"

        ).length,

        onTime:

        monthData.filter(

            item=>

            item.status==="OnTime"

        ).length,

        late:

        monthData.filter(

            item=>

            item.status==="Late"

        ).length,

        holiday:

        monthData.filter(

            item=>

            item.status==="Holiday"

        ).length,

        sick:

        monthData.filter(

            item=>

            item.status==="Sick"

        ).length,

        leave:

        monthData.filter(

            item=>

            item.status==="Leave"

        ).length

    };

}

/* =========================
   PROCESS
========================= */

function processAttendance(){

    normalizeAttendance();

    calculateTodayAttendance();

    calculateAttendanceSummary();

}
