/* =====================================================
   ATTENDANCE CONTROLLER
===================================================== */

/* =========================
   SAVE ATTENDANCE
========================= */

async function saveAttendance(status){

    /* =====================
       CLOSE MENU
    ===================== */

    const menu =

    document.getElementById(
        "attendanceMenu"
    );

    if(menu){

        menu.classList.remove(
            "show"
        );

    }

    /* =====================
       ALREADY ATTENDANCE?
    ===================== */

    const today =

    new Date()

    .toLocaleDateString(
        "sv-SE"
    );

    const exists =

    Attendance.data.some(

        item =>

        item.date === today

    );

    if(exists){

        alert(

            "Kamu sudah melakukan attendance hari ini."

        );

        return;

    }

    /* =====================
       BUTTON
    ===================== */

    const button =

    document.getElementById(
        "checkInButton"
    );

    if(button){

        button.disabled = true;

        button.textContent =
        "Saving...";

    }

    try{

        const now = new Date();

        const officeHour = 6;

        const officeMinute = 0;

        const currentMinute =

        now.getHours()*60 +

        now.getMinutes();

        const targetMinute =

        officeHour*60 +

        officeMinute;

        let lateMinutes = 0;

        let checkIn = "";

        /* =====================
           CHECK IN
        ===================== */

        if(status==="CheckIn"){

            lateMinutes =

            Math.max(

                currentMinute -

                targetMinute,

                0

            );

            status =

            lateMinutes>0

            ?

            "Late"

            :

            "OnTime";

            checkIn =

            now.toLocaleTimeString(

                "id-ID"

            );

        }

        /* =====================
           OTHER STATUS
        ===================== */

        if(

            status==="Holiday" ||

            status==="Sick" ||

            status==="Leave"

        ){

            lateMinutes = 0;

            checkIn = "";

        }

        const data = {

            date:

            today,

            checkIn,

            status,

            lateMinutes,

            month:

            now.toLocaleString(

                "en-US",

                {

                    month:"long"

                }

            ),

            year:

            now.getFullYear(),

            notes:""

        };

        const result =

        await sendAttendance(data);

        if(!result.success){

            throw new Error(

                result.message ||

                "Attendance gagal disimpan."

            );

        }

        await fetchAttendance();

        processAttendance();

        prepareAttendanceHistory();

        updateAttendanceDashboard();

        updateAttendanceHistory();

    }

    catch(error){

        console.error(error);

        alert(

            error.message

        );

        if(button){

            button.disabled = false;

            button.textContent =
            "✅ Check In";

        }

    }

}

/* =========================
   MENU
========================= */

function toggleAttendanceMenu(){

    const menu =

    document.getElementById(

        "attendanceMenu"

    );

    if(!menu) return;

    menu.classList.toggle(

        "show"

    );

}

/* =========================
   CLOSE MENU
========================= */

document.addEventListener(

    "click",

    function(e){

        const menu =

        document.getElementById(

            "attendanceMenu"

        );

        const button =

        document.getElementById(

            "attendanceMenuButton"

        );

        if(

            !menu ||

            !button

        ) return;

        if(

            !menu.contains(e.target) &&

            !button.contains(e.target)

        ){

            menu.classList.remove(

                "show"

            );

        }

    }

);
