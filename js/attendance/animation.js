/* =====================================================
   AINUR DASHBOARD
   FILE : attendance/animation.js
   DESCRIPTION : Attendance Character Animation
===================================================== */


/* =========================
   ANIMATION STATE
========================= */

let attendanceAnimationTimer = null;

let attendanceAnimationRunning = false;

let attendanceAnimationMode = null;


/* =========================
   IMAGE PATH
========================= */

const BEFORE_CHECKIN_PATH =

"assets/attendance/before-checkin/";


const AFTER_CHECKIN_PATH =

"assets/attendance/after-checkin/";


const HOLIDAY_PATH =

"assets/attendance/holiday/";


const LEAVE_PATH =

"assets/attendance/leave/";


/* =========================
   BEFORE CHECK-IN FRAMES
========================= */

const beforeCheckInFrames = {

    empty:

    BEFORE_CHECKIN_PATH +

    "before-empty.png",


    peek:

    BEFORE_CHECKIN_PATH +

    "before-peek.png",


    enter:

    BEFORE_CHECKIN_PATH +

    "before-enter.png",


    ready:

    BEFORE_CHECKIN_PATH +

    "before-ready.png",


    waveStart:

    BEFORE_CHECKIN_PATH +

    "before-wave-start.png",


    waveLeft:

    BEFORE_CHECKIN_PATH +

    "before-wave-left.png",


    waveRight:

    BEFORE_CHECKIN_PATH +

    "before-wave-right.png"

};


/* =========================
   AFTER CHECK-IN FRAMES
========================= */

const afterCheckInFrames = [

    AFTER_CHECKIN_PATH +

    "after-work-01.png",


    AFTER_CHECKIN_PATH +

    "after-work-02.png",


    AFTER_CHECKIN_PATH +

    "after-work-03.png",


    AFTER_CHECKIN_PATH +

    "after-work-04.png",


    AFTER_CHECKIN_PATH +

    "after-work-05.png",


    AFTER_CHECKIN_PATH +

    "after-work-06.png",


    AFTER_CHECKIN_PATH +

    "after-work-07.png",


    AFTER_CHECKIN_PATH +

    "after-work-08.png"

];


/* =========================
   HOLIDAY FRAMES
========================= */

const holidayFrames = [

    HOLIDAY_PATH +

    "holiday-smoke-01.png",


    HOLIDAY_PATH +

    "holiday-smoke-02.png",


    HOLIDAY_PATH +

    "holiday-smoke-03.png",


    HOLIDAY_PATH +

    "holiday-smoke-04.png",


    HOLIDAY_PATH +

    "holiday-smoke-05.png"

];


/* =========================
   LEAVE / SICK FRAMES
========================= */

const leaveFrames = [

    LEAVE_PATH +

    "leave-sleep-01.png",


    LEAVE_PATH +

    "leave-sleep-02.png",


    LEAVE_PATH +

    "leave-sleep-03.png",


    LEAVE_PATH +

    "leave-sleep-04.png"

];


/* =========================
   GET CHARACTER
========================= */

function getAttendanceCharacter(){

    return document.getElementById(

        "attendanceCharacter"

    );

}


/* =========================
   CHANGE IMAGE
========================= */

function setAttendanceImage(

    imagePath

){

    const character =

    getAttendanceCharacter();


    if(

        !character ||

        !imagePath

    ){

        return;

    }


    character.src =

    imagePath;

}


/* =========================
   BEFORE FRAME
========================= */

function setAttendanceCharacter(

    frame

){

    if(

        !beforeCheckInFrames[frame]

    ){

        return;

    }


    setAttendanceImage(

        beforeCheckInFrames[frame]

    );

}


/* =========================
   WAIT
========================= */

function waitAttendanceAnimation(

    duration

){

    return new Promise(

        resolve=>{

            attendanceAnimationTimer =

            setTimeout(

                resolve,

                duration

            );

        }

    );

}


/* =========================
   STOP ANIMATION
========================= */

function stopAttendanceAnimation(){

    attendanceAnimationRunning =

    false;


    clearTimeout(

        attendanceAnimationTimer

    );


    attendanceAnimationTimer =

    null;


    attendanceAnimationMode =

    null;

}


/* =========================
   START MODE
========================= */

function startAttendanceAnimation(

    mode

){

    if(

        attendanceAnimationRunning &&

        attendanceAnimationMode === mode

    ){

        return false;

    }


    stopAttendanceAnimation();


    attendanceAnimationRunning =

    true;


    attendanceAnimationMode =

    mode;


    return true;

}


/* =========================
   BEFORE CHECK-IN WAVE
========================= */

async function playAttendanceWave(

    totalWave = 4

){

    setAttendanceCharacter(

        "waveStart"

    );


    await waitAttendanceAnimation(

        500

    );


    for(

        let wave = 0;

        wave < totalWave;

        wave++

    ){

        if(

            !attendanceAnimationRunning ||

            attendanceAnimationMode !==

            "before"

        ){

            return;

        }


        setAttendanceCharacter(

            "waveLeft"

        );


        await waitAttendanceAnimation(

            550

        );


        if(

            !attendanceAnimationRunning ||

            attendanceAnimationMode !==

            "before"

        ){

            return;

        }


        setAttendanceCharacter(

            "waveRight"

        );


        await waitAttendanceAnimation(

            550

        );

    }


    setAttendanceCharacter(

        "waveStart"

    );

}


/* =========================
   BEFORE CHECK-IN
========================= */

async function playBeforeCheckInIntro(){

    const started =

    startAttendanceAnimation(

        "before"

    );


    if(

        !started

    ){

        return;

    }


    /* EMPTY */

    setAttendanceCharacter(

        "empty"

    );


    await waitAttendanceAnimation(

        1200

    );


    if(

        attendanceAnimationMode !==

        "before"

    ){

        return;

    }


    /* PEEK */

    setAttendanceCharacter(

        "peek"

    );


    await waitAttendanceAnimation(

        1500

    );


    if(

        attendanceAnimationMode !==

        "before"

    ){

        return;

    }


    /* ENTER */

    setAttendanceCharacter(

        "enter"

    );


    await waitAttendanceAnimation(

        1400

    );


    if(

        attendanceAnimationMode !==

        "before"

    ){

        return;

    }


    /* READY */

    setAttendanceCharacter(

        "ready"

    );


    await waitAttendanceAnimation(

        1300

    );


    if(

        attendanceAnimationMode !==

        "before"

    ){

        return;

    }


    /* FIRST WAVE */

    await playAttendanceWave(

        4

    );


    /* REPEAT WAVE */

    while(

        attendanceAnimationRunning &&

        attendanceAnimationMode ===

        "before"

    ){

        setAttendanceCharacter(

            "waveStart"

        );


        await waitAttendanceAnimation(

            4000

        );


        if(

            !attendanceAnimationRunning ||

            attendanceAnimationMode !==

            "before"

        ){

            return;

        }


        await playAttendanceWave(

            3

        );

    }

}


/* =========================
   LOOP IMAGE FRAMES
========================= */

async function playAttendanceFrames(

    mode,

    frames,

    frameDuration

){

    const started =

    startAttendanceAnimation(

        mode

    );


    if(

        !started

    ){

        return;

    }


    let frameIndex = 0;


    while(

        attendanceAnimationRunning &&

        attendanceAnimationMode === mode

    ){

        setAttendanceImage(

            frames[frameIndex]

        );


        await waitAttendanceAnimation(

            frameDuration

        );


        frameIndex =

        (

            frameIndex + 1

        )

        %

        frames.length;

    }

}


/* =========================
   AFTER CHECK-IN
========================= */

function playAfterCheckInAnimation(){

    playAttendanceFrames(

        "work",

        afterCheckInFrames,

        850

    );

}


/* =========================
   HOLIDAY
========================= */

function playHolidayAnimation(){

    playAttendanceFrames(

        "holiday",

        holidayFrames,

        900

    );

}


/* =========================
   LEAVE / SICK
========================= */

function playLeaveAnimation(){

    playAttendanceFrames(

        "leave",

        leaveFrames,

        950

    );

}


/* =========================
   SELECT ANIMATION
========================= */

function updateAttendanceAnimation(){

    /* =====================
       BEFORE CHECK IN
    ===================== */

    if(

        !Attendance.current

    ){

        playBeforeCheckInIntro();

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

        playHolidayAnimation();

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

        playLeaveAnimation();

        return;

    }


    /* =====================
       ON TIME / LATE
    ===================== */

    playAfterCheckInAnimation();

       }
