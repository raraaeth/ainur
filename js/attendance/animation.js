/* =====================================================
   AINUR DASHBOARD
   FILE : attendance/animation.js
   DESCRIPTION : Attendance Video Engine
===================================================== */


/* =====================================================
   VIDEO PATH
===================================================== */

const ATTENDANCE_VIDEOS = {

    before:
    "assets/attendance/before-checkin/before-checkin.mp4",

    after:
    "assets/attendance/after-checkin/after-checkin.mp4",

    afternoon:
    "assets/attendance/afternoon/afternoon.mp4",

    evening:
    "assets/attendance/evening/evening.mp4",

    night:
    "assets/attendance/night/night.mp4",

    holiday:
    "assets/attendance/holiday/holiday.mp4",

    leave:
    "assets/attendance/leave/leave.mp4"

};


/* =====================================================
   LOOP CONFIG
===================================================== */

const ATTENDANCE_HOLD_TIME =

3000;

const ATTENDANCE_FADE_TIME =

550;

const ATTENDANCE_TIME_CHECK =

60000;


/* =====================================================
   STATE
===================================================== */

let attendanceCurrentVideo =

"";

let attendanceLoopTimer =

null;

let attendanceFadeTimer =

null;

let attendanceTimeWatcher =

null;


/* =====================================================
   GET VIDEO ELEMENT
===================================================== */

function getAttendanceVideo(){

    return document.getElementById(

        "attendanceCharacter"

    );

}


/* =====================================================
   CLEAR TIMER
===================================================== */

function clearAttendanceTimer(){

    clearTimeout(

        attendanceLoopTimer

    );

    clearTimeout(

        attendanceFadeTimer

    );

}


/* =====================================================
   GET CURRENT HOUR
===================================================== */

function getAttendanceHour(){

    return new Date()

    .getHours();

}


/* =====================================================
   GET VIDEO PATH
===================================================== */

function getAttendanceVideoPath(){

    /* =====================
       NO ATTENDANCE
    ===================== */

    if(

        !Attendance.current

    ){

        return ATTENDANCE_VIDEOS.before;

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

        status==="Holiday"

    ){

        return ATTENDANCE_VIDEOS.holiday;

    }

    /* =====================
       LEAVE / SICK
    ===================== */

    if(

        status==="Leave" ||

        status==="Sick"

    ){

        return ATTENDANCE_VIDEOS.leave;

    }

    /* =====================
       NORMAL WORKDAY
    ===================== */

    const hour =

    getAttendanceHour();

    /* =====================
       AFTERNOON
    ===================== */

    if(

        hour>=12 &&

        hour<16

    ){

        return ATTENDANCE_VIDEOS.afternoon;

    }

    /* =====================
       EVENING
    ===================== */

    if(

        hour>=16 &&

        hour<22

    ){

        return ATTENDANCE_VIDEOS.evening;

    }

    /* =====================
       NIGHT
    ===================== */

    if(

        hour>=22

    ){

        return ATTENDANCE_VIDEOS.night;

    }

    /* =====================
       DEFAULT
    ===================== */

    return ATTENDANCE_VIDEOS.after;

}

/* =====================================================
   VIDEO STATE
===================================================== */

let attendanceChanging =

false;


/* =====================================================
   FADE OUT
===================================================== */

function fadeOutAttendanceVideo(){

    const video =

    getAttendanceVideo();

    if(!video) return;

    video.classList.add(

        "video-fade"

    );

}


/* =====================================================
   FADE IN
===================================================== */

function fadeInAttendanceVideo(){

    const video =

    getAttendanceVideo();

    if(!video) return;

    requestAnimationFrame(()=>{

        requestAnimationFrame(()=>{

            video.classList.remove(

                "video-fade"

            );

        });

    });

}


/* =====================================================
   CHANGE VIDEO
===================================================== */

function changeAttendanceVideo(videoPath){

    const video =

    getAttendanceVideo();

    if(

        !video ||

        attendanceChanging

    ){

        return;

    }

    attendanceChanging =

    true;

    clearAttendanceTimer();

    attendanceCurrentVideo =

    videoPath;

    fadeOutAttendanceVideo();

    attendanceFadeTimer =

    setTimeout(()=>{

        video.pause();

        video.src =

        videoPath;

        video.load();

        video.currentTime =

        0;

        video.play()

        .catch(()=>{});

        fadeInAttendanceVideo();

        attendanceChanging =

        false;

    },

    ATTENDANCE_FADE_TIME);

}


/* =====================================================
   PLAY VIDEO
===================================================== */

function playAttendanceVideo(videoPath){

    const video =

    getAttendanceVideo();

    if(

        !video ||

        !videoPath

    ){

        return;

    }

    if(

        attendanceCurrentVideo===

        videoPath

    ){

        return;

    }

    changeAttendanceVideo(

        videoPath

    );

}


/* =====================================================
   RESTART VIDEO
===================================================== */

function restartAttendanceVideo(){

    const video =

    getAttendanceVideo();

    if(

        !video ||

        attendanceChanging

    ){

        return;

    }

    clearAttendanceTimer();

    attendanceLoopTimer =

    setTimeout(()=>{

        fadeOutAttendanceVideo();

        attendanceFadeTimer =

        setTimeout(()=>{

            video.currentTime =

            0;

            video.play()

            .catch(()=>{});

            fadeInAttendanceVideo();

        },

        ATTENDANCE_FADE_TIME);

    },

    ATTENDANCE_HOLD_TIME);

}


/* =====================================================
   UPDATE VIDEO
===================================================== */

function updateAttendanceAnimation(){

    playAttendanceVideo(

        getAttendanceVideoPath()

    );

}

/* =====================================================
   TIME WATCHER
===================================================== */

function startAttendanceWatcher(){

    clearInterval(

        attendanceTimeWatcher

    );

    attendanceTimeWatcher =

    setInterval(()=>{

        updateAttendanceAnimation();

    },

    ATTENDANCE_TIME_CHECK);

}


/* =====================================================
   VIDEO EVENT
===================================================== */

function initializeAttendanceVideo(){

    const video =

    getAttendanceVideo();

    if(!video) return;

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

}


/* =====================================================
   INITIALIZE
===================================================== */

function initializeAttendanceAnimation(){

    initializeAttendanceVideo();

    startAttendanceWatcher();

    updateAttendanceAnimation();

}


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(

            document.hidden

        ){

            return;

        }

        updateAttendanceAnimation();

    }

);


/* =====================================================
   AUTO START
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAttendanceAnimation();

    }

);
