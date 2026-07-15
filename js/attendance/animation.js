/* =====================================================
   AINUR DASHBOARD
   FILE : attendance-animation.js
   DESCRIPTION : Attendance Video Controller
===================================================== */


/* =====================================================
   ATTENDANCE VIDEO PATH
===================================================== */

const ATTENDANCE_VIDEOS = {

    /* BEFORE CHECK-IN */

    before:

    "assets/attendance/before-checkin/before-checkin.mp4",


    /* ON TIME / LATE */

    work:

    "assets/attendance/after-checkin/after-checkin.mp4",


    /* TEMPORARY */

    holiday:

    "assets/attendance/after-checkin/after-checkin.mp4",


    /* TEMPORARY */

    leave:

    "assets/attendance/after-checkin/after-checkin.mp4"

};


/* =====================================================
   LOOP SETTINGS
===================================================== */


/* FINAL FRAME HOLD

5000 = 5 seconds

*/

const ATTENDANCE_END_HOLD =

5000;


/* FADE DURATION

550 = 0.55 seconds

*/

const ATTENDANCE_FADE_DURATION =

550;


/* =====================================================
   VIDEO STATE
===================================================== */


/* CURRENT VIDEO PATH */

let currentAttendanceVideo =

null;


/* PREVENT DOUBLE LOOP */

let attendanceLoopRunning =

false;


/* END FRAME TIMER */

let attendanceEndTimer =

null;


/* FADE TIMER */

let attendanceFadeTimer =

null;


/* UNLOCK TIMER */

let attendanceUnlockTimer =

null;


/* =====================================================
   CLEAR VIDEO LOOP TIMER
===================================================== */

function clearAttendanceLoop(){

    /* =====================
       CLEAR END HOLD
    ===================== */

    if(

        attendanceEndTimer

    ){

        clearTimeout(

            attendanceEndTimer

        );


        attendanceEndTimer =

        null;

    }


    /* =====================
       CLEAR FADE
    ===================== */

    if(

        attendanceFadeTimer

    ){

        clearTimeout(

            attendanceFadeTimer

        );


        attendanceFadeTimer =

        null;

    }


    /* =====================
       CLEAR UNLOCK
    ===================== */

    if(

        attendanceUnlockTimer

    ){

        clearTimeout(

            attendanceUnlockTimer

        );


        attendanceUnlockTimer =

        null;

    }


    /* =====================
       RESET LOOP STATE
    ===================== */

    attendanceLoopRunning =

    false;

}


/* =====================================================
   PLAY ATTENDANCE VIDEO
===================================================== */

function playAttendanceVideo(

    videoPath

){

    const video =

    document.getElementById(

        "attendanceCharacter"

    );


    /* =====================
       VALIDATION
    ===================== */

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

        /* REMOVE FADE */

        video.classList.remove(

            "video-fade"

        );


        /* CONTINUE VIDEO */

        if(

            video.paused &&

            !video.ended &&

            !attendanceLoopRunning

        ){

            video.play()

            .catch(()=>{});

        }


        return;

    }


    /* =====================
       CLEAR OLD LOOP
    ===================== */

    clearAttendanceLoop();


    /* =====================
       SAVE CURRENT VIDEO
    ===================== */

    currentAttendanceVideo =

    videoPath;


    /* =====================
       RESET FADE
    ===================== */

    video.classList.remove(

        "video-fade"

    );


    /* =====================
       CHANGE VIDEO
    ===================== */

    video.pause();


    video.src =

    videoPath;


    video.load();


    /* =====================
       PLAY NEW VIDEO
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


/* =====================================================
   RESTART VIDEO WITH SMOOTH FADE
===================================================== */

function restartAttendanceVideo(){

    const video =

    document.getElementById(

        "attendanceCharacter"

    );


    /* =====================
       VALIDATION
    ===================== */

    if(

        !video ||

        attendanceLoopRunning

    ){

        return;

    }


    /* =====================
       LOCK LOOP
    ===================== */

    attendanceLoopRunning =

    true;


    /* =================================================
       HOLD FINAL FRAME

       Keep the final video frame visible
       for five seconds.
    ================================================= */

    attendanceEndTimer =

    setTimeout(()=>{


        /* =====================
           FADE OUT
        ===================== */

        video.classList.add(

            "video-fade"

        );


        /* =============================================
           WAIT UNTIL VIDEO IS COMPLETELY HIDDEN
        ============================================= */

        attendanceFadeTimer =

        setTimeout(()=>{


            /* =====================
               RETURN TO FIRST FRAME
            ===================== */

            video.currentTime =

            0;


            /* =====================
               PLAY FROM BEGINNING
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

                            "Attendance video restart blocked:",

                            error

                        );

                    }

                );

            }


            /* =====================
               FADE IN
            ===================== */

            requestAnimationFrame(()=>{

                requestAnimationFrame(()=>{

                    video.classList.remove(

                        "video-fade"

                    );

                });

            });


            /* =====================
               UNLOCK NEXT LOOP
            ===================== */

            attendanceUnlockTimer =

            setTimeout(()=>{


                attendanceLoopRunning =

                false;


                attendanceEndTimer =

                null;


                attendanceFadeTimer =

                null;


                attendanceUnlockTimer =

                null;


            },

            ATTENDANCE_FADE_DURATION

            );


        },

        ATTENDANCE_FADE_DURATION

        );


    },

    ATTENDANCE_END_HOLD

    );

}


/* =====================================================
   UPDATE ATTENDANCE VIDEO
===================================================== */

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


    /* =====================
       CURRENT STATUS
    ===================== */

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

        status === "Sick" ||

        status === "Leave"

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


/* =====================================================
   INITIALIZE ATTENDANCE VIDEO
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        /* =====================
           GET VIDEO
        ===================== */

        const video =

        document.getElementById(

            "attendanceCharacter"

        );


        /* =====================
           VALIDATION
        ===================== */

        if(

            !video

        ){

            return;

        }


        /* =====================
           VIDEO FINISHED
        ===================== */

        video.addEventListener(

            "ended",

            restartAttendanceVideo

        );


        /* =====================
           VIDEO ERROR
        ===================== */

        video.addEventListener(

            "error",

            ()=>{

                console.error(

                    "Attendance video failed to load:",

                    video.currentSrc

                );

            }

        );


    }

);
