/* =====================================================
   ATTENDANCE CONTROLLER
===================================================== */

/* =========================
   SAVE ATTENDANCE
========================= */

async function saveAttendance(status){

    /* =====================
       SUDAH CHECK IN?
    ===================== */

    const today =
    new Date().toLocaleDateString("sv-SE");

    const exists =
    Attendance.data.some(
        item => item.date === today
    );

    if(exists){

        alert(
            "Kamu sudah melakukan attendance hari ini."
        );

        return;

    }

    /* =====================
       DISABLE BUTTON
    ===================== */

    const button =
    document.getElementById(
        "checkInButton"
    );

    if(button){

        button.disabled = true;

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

            ? "Late"

            : "OnTime";

        }

        const data = {

            date:

            now.toLocaleDateString(
                "sv-SE"
            ),

            checkIn:

            now.toLocaleTimeString(
                "id-ID"
            ),

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
                "Attendance gagal disimpan."
            );

        }

        await fetchAttendance();

        processAttendance();

        updateAttendanceDashboard();

    }

    catch(error){

        console.error(error);

        alert(error.message);

        if(button){

            button.disabled = false;

        }

    }

}
