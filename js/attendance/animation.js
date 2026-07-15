/* =====================================================
   AINUR DASHBOARD
   FILE : attendance-animation.js
   DESCRIPTION : Attendance Video Controller
===================================================== */


/* =========================
   ATTENDANCE VIDEO PATH
========================= */

const ATTENDANCE_VIDEOS = {

    before:

    "assets/attendance/before-checkin/before-checkin.mp4",


    work:

    "assets/attendance/after-checkin/after-checkin.mp4",


    /* TEMPORARY */

    holiday:

    "assets/attendance/after-checkin/after-checkin.mp4",


    /* TEMPORARY */

    leave:

    "assets/attendance/after-checkin/after-checkin.mp4"

};


/* =========================
   CURRENT VIDEO
========================= */

let currentAttendanceVideo =

null;


/* =========================
   PLAY ATTENDANCE VIDEO
========================= */

function playAttendanceVideo(

    videoPath

){

    const video =

    document.getElementById(

        "attendanceCharacter"

    );


    if(

        !video ||

        !videoPath

    ){

        return;

    }


    /* =====================
       SAME VIDEO
    ===================== */

    if(

        currentAttendanceVideo ===

        videoPath

    ){

        if(

            video.paused

        ){

            video.play()

            .catch(()=>{});

        }


        return;

    }


    /* =====================
       SAVE CURRENT VIDEO
    ===================== */

    currentAttendanceVideo =

    videoPath;


    /* =====================
       CHANGE VIDEO
    ===================== */

    video.pause();


    video.src =

    videoPath;


    video.load();


    /* =====================
       PLAY VIDEO
    ===================== */

    const playPromise =

    video.play();


    if(

        playPromise !==

        undefined

    ){

        playPromise

        .catch(

            error=>{

                console.warn(

                    "Attendance video autoplay blocked:",

                    error

                );

            }

        );

    }

}


/* =========================
   UPDATE ATTENDANCE VIDEO
========================= */

function updateAttendanceAnimation(){

    /* =====================
       BEFORE CHECK-IN
    ===================== */

    if(

        !Attendance.current

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.before

        );


        return;

    }


    const status =

    Attendance.current.status;


    /* =====================
       HOLIDAY
    ===================== */

    if(

        status ===

        "Holiday"

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.holiday

        );


        return;

    }


    /* =====================
       SICK / LEAVE
    ===================== */

    if(

        status ===

        "Sick" ||

        status ===

        "Leave"

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.leave

        );


        return;

    }


    /* =====================
       ON TIME / LATE
    ===================== */

    playAttendanceVideo(

        ATTENDANCE_VIDEOS.work

    );

}
