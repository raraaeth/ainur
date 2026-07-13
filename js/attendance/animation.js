/* =====================================================
   AINUR DASHBOARD
   FILE : attendance-animation.js
   DESCRIPTION : Before Check-In Character Animation
===================================================== */


/* =========================
   ANIMATION STATE
========================= */

let attendanceAnimationTimer = null;

let attendanceAnimationRunning = false;


/* =========================
   IMAGE PATH
========================= */

const BEFORE_CHECKIN_PATH =

"assets/attendance/before-checkin/";


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
   CHANGE CHARACTER IMAGE
========================= */

function setAttendanceCharacter(

    frame

){

    const character =

    document.getElementById(

        "attendanceCharacter"

    );

    if(

        !character ||

        !beforeCheckInFrames[frame]

    ){

        return;

    }

    character.src =

    beforeCheckInFrames[frame];

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
   WAVE CHARACTER
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

            !attendanceAnimationRunning

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

            !attendanceAnimationRunning

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
   BEFORE CHECK-IN INTRO
========================= */

async function playBeforeCheckInIntro(){

    if(

        attendanceAnimationRunning

    ){

        return;

    }


    attendanceAnimationRunning =

    true;


    /* EMPTY */

    setAttendanceCharacter(

        "empty"

    );

    await waitAttendanceAnimation(

        1200

    );


    /* PEEK */

    setAttendanceCharacter(

        "peek"

    );

    await waitAttendanceAnimation(

        1500

    );


    /* ENTER */

    setAttendanceCharacter(

        "enter"

    );

    await waitAttendanceAnimation(

        1400

    );


    /* READY */

    setAttendanceCharacter(

        "ready"

    );

    await waitAttendanceAnimation(

        1300

    );


    /* FIRST WAVE */

    await playAttendanceWave(

        4

    );


    /* REPEAT WAVE */

    while(

        attendanceAnimationRunning

    ){

        setAttendanceCharacter(

            "waveStart"

        );


        await waitAttendanceAnimation(

            4000

        );


        if(

            !attendanceAnimationRunning

        ){

            return;

        }


        await playAttendanceWave(

            3

        );

    }

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

      }
