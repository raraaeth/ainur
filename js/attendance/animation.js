/* =====================================================
   AINUR DASHBOARD
   FILE : attendance-animation.js
   DESCRIPTION : Attendance Video Controller
===================================================== */


/* =====================================================
   VIDEO PATH
===================================================== */

const ATTENDANCE_VIDEOS = {

    before:

    "assets/attendance/before-checkin/before-checkin.mp4",

    after:

    "assets/attendance/after-checkin/after-checkin.mp4",

    holiday:

    "assets/attendance/holiday/holiday.mp4",

    leave:

    "assets/attendance/leave/leave.mp4",

    afternoon:

    "assets/attendance/afternoon/afternoon.mp4",

    evening:

    "assets/attendance/evening/evening.mp4",

    night:

    "assets/attendance/night/night.mp4"

};


/* =====================================================
   LOOP SETTINGS
===================================================== */

const ATTENDANCE_END_HOLD =

5000;

const ATTENDANCE_FADE_DURATION =

550;


/* =====================================================
   VIDEO STATE
===================================================== */

let currentAttendanceVideo =

null;

let attendanceLoopRunning =

false;

let attendanceEndTimer =

null;

let attendanceFadeTimer =

null;

let attendanceUnlockTimer =

null;


/* =====================================================
   CLEAR TIMER
===================================================== */

function clearAttendanceLoop(){

    clearTimeout(

        attendanceEndTimer

    );

    clearTimeout(

        attendanceFadeTimer

    );

    clearTimeout(

        attendanceUnlockTimer

    );

    attendanceEndTimer =

    null;

    attendanceFadeTimer =

    null;

    attendanceUnlockTimer =

    null;

    attendanceLoopRunning =

    false;

}


/* =====================================================
   GET VIDEO ELEMENT
===================================================== */

function getAttendanceVideo(){

    return document.getElementById(

        "attendanceCharacter"

    );

}


/* =====================================================
   PLAY VIDEO
===================================================== */

function playAttendanceVideo(

    videoPath

){

    const video =

    getAttendanceVideo();

    if(

        !video ||

        !videoPath

    ){

        return;

    }

    /* SAME VIDEO */

    if(

        currentAttendanceVideo ===

        videoPath

    ){

        if(

            video.paused &&

            !attendanceLoopRunning

        ){

            video.play()

            .catch(()=>{});

        }

        return;

    }

    clearAttendanceLoop();

    currentAttendanceVideo =

    videoPath;

    video.classList.remove(

        "video-fade"

    );

    video.pause();

    video.src =

    videoPath;

    video.load();

    const playPromise =

    video.play();

    if(

        playPromise !==

        undefined

    ){

        playPromise.catch(

            error=>{

                console.warn(

                    "Attendance Video:",

                    error

                );

            }

        );

    }

}


/* =====================================================
   CURRENT HOUR
===================================================== */

function getAttendanceHour(){

    return new Date()

    .getHours();

       }

/* =====================================================
   UPDATE ATTENDANCE VIDEO
===================================================== */

function updateAttendanceAnimation(){

    /* =====================
       CURRENT HOUR
    ===================== */

    const hour =

    getAttendanceHour();


    /* =====================
       NO ATTENDANCE TODAY
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
       (Ignore Time)
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
       LEAVE / SICK
       (Ignore Time)
    ===================== */

    if(

        status ===

        "Leave" ||

        status ===

        "Sick"

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.leave

        );

        return;

    }


    /* =================================================
       NORMAL WORKDAY

       Status :

       On Time

       Late
    ================================================= */


    /* =====================
       AFTERNOON

       12.00 - 15.59
    ===================== */

    if(

        hour >= 12 &&

        hour < 16

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.afternoon

        );

        return;

    }


    /* =====================
       EVENING

       16.00 - 21.59
    ===================== */

    if(

        hour >= 16 &&

        hour < 22

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.evening

        );

        return;

    }


    /* =====================
       NIGHT

       22.00 - 23.59
    ===================== */

    if(

        hour >= 22

    ){

        playAttendanceVideo(

            ATTENDANCE_VIDEOS.night

        );

        return;

    }


    /* =====================
       DEFAULT

       00.00 - 11.59

       AFTER CHECK-IN
    ===================== */

    playAttendanceVideo(

        ATTENDANCE_VIDEOS.after

    );

}

/* =====================================================
   SMOOTH VIDEO LOOP
===================================================== */

function restartAttendanceVideo(){

    const video =

    getAttendanceVideo();

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


    /* =====================
       HOLD LAST FRAME
    ===================== */

    attendanceEndTimer =

    setTimeout(()=>{


        /* =====================
           FADE OUT
        ===================== */

        video.classList.add(

            "video-fade"

        );


        /* =====================
           WAIT UNTIL FADE
        ===================== */

        attendanceFadeTimer =

        setTimeout(()=>{


            /* =====================
               BACK TO START
            ===================== */

            video.currentTime =

            0;


            /* =====================
               PLAY AGAIN
            ===================== */

            const playPromise =

            video.play();


            if(

                playPromise !==

                undefined

            ){

                playPromise.catch(

                    error=>{

                        console.warn(

                            "Attendance Restart:",

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
               UNLOCK LOOP
            ===================== */

            attendanceUnlockTimer =

            setTimeout(()=>{

                attendanceLoopRunning =

                false;

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
   INITIALIZE
===================================================== */

function initializeAttendanceAnimation(){

    const video =

    getAttendanceVideo();

    if(

        !video

    ){

        return;

    }


    /* =====================
       REMOVE OLD EVENT
    ===================== */

    video.removeEventListener(

        "ended",

        restartAttendanceVideo

    );


    /* =====================
       LOOP EVENT
    ===================== */

    video.addEventListener(

        "ended",

        restartAttendanceVideo

    );


    /* =====================
       ERROR
    ===================== */

    video.addEventListener(

        "error",

        ()=>{

            console.error(

                "Attendance video not found:",

                video.currentSrc

            );

        }

    );


    /* =====================
       LOAD FIRST VIDEO
    ===================== */

    updateAttendanceAnimation();

}


/* =====================================================
   AUTO START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAttendanceAnimation();

    }

);
