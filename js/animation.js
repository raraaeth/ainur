/* =====================================================
   LIFE DASHBOARD
   FILE : animation.js
   DESCRIPTION : Global Dashboard Animation
===================================================== */


/* =====================================================
   ANIMATION CONFIG
===================================================== */

const ANIMATION_DURATION = 3000;


/* =====================================================
   ACTIVE COUNT-UP
===================================================== */

const activeCountAnimations =

new Map();


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatAnimatedRupiah(value){

    return new Intl.NumberFormat(

        "id-ID",

        {

            style:"currency",

            currency:"IDR",

            minimumFractionDigits:0,

            maximumFractionDigits:0

        }

    ).format(

        Math.round(value)

    );

}


/* =====================================================
   FORMAT USD
===================================================== */

function formatAnimatedUSD(value){

    return new Intl.NumberFormat(

        "en-US",

        {

            style:"currency",

            currency:"USD",

            minimumFractionDigits:0,

            maximumFractionDigits:2

        }

    ).format(value);

}


/* =====================================================
   COUNT-UP ENGINE
===================================================== */

function animateCountUp(

    element,

    targetValue,

    formatter

){

    /* =====================
       VALIDATION
    ===================== */

    if(

        !element

    ){

        return;

    }


    const target =

    Number(

        targetValue

    ) || 0;


    /* =====================
       STOP OLD ANIMATION
    ===================== */

    const oldAnimation =

    activeCountAnimations.get(

        element

    );


    if(

        oldAnimation

    ){

        cancelAnimationFrame(

            oldAnimation

        );

    }


    /* =====================
       START VALUE
    ===================== */

    const startValue = 0;


    const startTime =

    performance.now();


    /* =====================
       ANIMATION FRAME
    ===================== */

    function update(

        currentTime

    ){

        const elapsed =

        currentTime -

        startTime;


        const progress =

        Math.min(

            elapsed /

            ANIMATION_DURATION,

            1

        );


        /* =================
           SMOOTH EASING
        ================= */

        const easedProgress =

        1 -

        Math.pow(

            1-progress,

            3

        );


        /* =================
           CURRENT VALUE
        ================= */

        const currentValue =

        startValue +

        (

            target -

            startValue

        )

        *

        easedProgress;


        /* =================
           UPDATE TEXT
        ================= */

        element.textContent =

        formatter(

            currentValue

        );


        /* =================
           CONTINUE
        ================= */

        if(

            progress < 1

        ){

            const animationId =

            requestAnimationFrame(

                update

            );


            activeCountAnimations.set(

                element,

                animationId

            );

        }


        /* =================
           FINISH
        ================= */

        else{

            element.textContent =

            formatter(

                target

            );


            activeCountAnimations.delete(

                element

            );

        }

    }


    requestAnimationFrame(

        update

    );

}


/* =====================================================
   FINANCE COUNT-UP
===================================================== */

function animateFinanceSummary(){

    if(

        !Finance ||

        !Finance.summary

    ){

        return;

    }


    const summary =

    Finance.summary;


    /* =====================
       FINANCE SUMMARY
    ===================== */

    animateCountUp(

        document.getElementById(

            "totalIncome"

        ),

        summary.income,

        formatAnimatedRupiah

    );


    animateCountUp(

        document.getElementById(

            "totalExpense"

        ),

        summary.expense,

        formatAnimatedRupiah

    );


    animateCountUp(

        document.getElementById(

            "remainingBalance"

        ),

        summary.balance,

        formatAnimatedRupiah

    );


    /* =====================
       SEABANK
    ===================== */

    animateCountUp(

        document.getElementById(

            "savingBalance"

        ),

        summary.savingBalance,

        formatAnimatedRupiah

    );


    animateCountUp(

        document.getElementById(

            "savingDeposit"

        ),

        summary.savingDeposit,

        formatAnimatedRupiah

    );


    animateCountUp(

        document.getElementById(

            "savingWithdrawal"

        ),

        summary.savingWithdrawal,

        formatAnimatedRupiah

    );

}


/* =====================================================
   AIRDROP COUNT-UP
===================================================== */

function animateAirdropReward(){

    if(

        typeof Airdrop ===

        "undefined"

    ){

        return;

    }


    const totalReward =

    Number(

        Airdrop.summary?.totalUSD

    ) || 0;


    animateCountUp(

        document.getElementById(

            "airdropTotalUSD"

        ),

        totalReward,

        formatAnimatedUSD

    );

              }

/* =====================================================
   SMART INSIGHT ANIMATION
===================================================== */


/* =========================
   ACTIVE TIMERS
========================= */

let insightAnimationTimers = [];


/* =========================
   ANIMATE SMART INSIGHT
========================= */

function animateSmartInsight(){

    /* =====================
       GET INSIGHT ITEMS
    ===================== */

    const items =

    document.querySelectorAll(

        "#insightContainer .insight-item"

    );


    if(

        !items.length

    ){

        return;

    }


    /* =====================
       CLEAR OLD TIMER
    ===================== */

    insightAnimationTimers

    .forEach(timer=>{

        clearTimeout(

            timer

        );

    });


    insightAnimationTimers = [];


    /* =====================
       RESET ITEMS
    ===================== */

    items.forEach(item=>{

        item.classList.remove(

            "insight-show"

        );

    });


    /* =====================
       FORCE REPAINT
    ===================== */

    void document.body.offsetHeight;


    /* =====================
       SHOW ONE BY ONE
    ===================== */

    items.forEach(

        (

            item,

            index

        )=>{


            const timer =

            setTimeout(()=>{

                item.classList.add(

                    "insight-show"

                );

            },

            index * 140

            );


            insightAnimationTimers.push(

                timer

            );

        }

    );

                       }
