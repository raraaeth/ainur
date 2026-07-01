/* =====================================================
   Life Dashboard v3.0
   File : processPlanner.js
===================================================== */
/* ===========================
   NORMALIZE PLANNER
=========================== */

function normalizePlanner(){

    Finance.planner =

    Finance.plannerRaw.map(item=>{

        const type =

        String(item.Jenis || "")

        .trim()

        .toLowerCase();

        const keyword =

        String(item.Keyword || "")

        .trim()

        .toLowerCase();

        return{

            title:

            item.Judul || "",

            type,

            date:

            new Date(item.Tanggal),

            interval:

            Number(item.Interval) || 0,

            keyword,

            priority:

            String(item.Priority || "medium")

            .trim()

            .toLowerCase(),

            reminderBefore:

            Number(

                item["Reminder before"]

            ) || 0,

            note:

            item.Catatan || "",

            /* ======================
               CATEGORY
            ====================== */

            isEvent:[

                "birthday",

                "anniversary"

            ].includes(type),

            hasKeyword:

            keyword.length > 0,

            /* ======================
               RUNTIME
            ====================== */

            lastTransaction:null,

            dueDate:null,

            daysLeft:0,

            countdown:"",

            status:"waiting",

            completed:false

        };

    });

}

/* ===========================
   FIND LAST TRANSACTION
=========================== */

function findLastTransaction(){

    Finance.planner.forEach(item=>{

        /* ======================
           NO KEYWORD
        ====================== */

        if(

            !item.hasKeyword

        ){

            return;

        }

        const transactions =

        Finance.data.filter(transaction=>{

            const description =

            String(

                transaction.description ||

                ""

            )

            .trim()

            .toLowerCase();

            return description.includes(

                item.keyword

            );

        });

        if(

            transactions.length===0

        ){

            return;

        }

        transactions.sort(

            (a,b)=>

            new Date(b.date)-

            new Date(a.date)

        );

        item.lastTransaction =

        transactions[0];

    });

}

/* ===========================
   CALCULATE DUE DATE
=========================== */

function calculateDueDate(){

    const today = new Date();

    today.setHours(

        0,0,0,0

    );

    Finance.planner.forEach(item=>{

        let dueDate =

        new Date(item.date);

        dueDate.setHours(

            0,0,0,0

        );

        /* ======================
           EVENT
        ====================== */

        if(item.isEvent){

            dueDate =

            new Date(today);

            dueDate.setMonth(

                item.date.getMonth()

            );

            dueDate.setDate(

                item.date.getDate()

            );

            dueDate.setHours(

                0,0,0,0

            );

            if(

                dueDate < today

            ){

                dueDate.setFullYear(

                    dueDate.getFullYear()+1

                );

            }

        }

        /* ======================
           KEYWORD + INTERVAL
        ====================== */

        else if(

            item.hasKeyword &&

            item.interval > 0 &&

            item.lastTransaction

        ){

            dueDate =

            new Date(

                item.lastTransaction.date

            );

            dueDate.setHours(

                0,0,0,0

            );

            dueDate.setDate(

                dueDate.getDate() +

                item.interval

            );

        }

        /* ======================
           DEFAULT
        ====================== */

        else{

            dueDate =

            new Date(item.date);

            dueDate.setHours(

                0,0,0,0

            );

        }

        item.dueDate =

        dueDate;

    });

    }/* ===========================
   CALCULATE STATUS
=========================== */

function calculateStatus(){

    const today = new Date();

    today.setHours(

        0,0,0,0

    );

    Finance.planner.forEach(item=>{

        const diff = Math.ceil(

            (item.dueDate - today) /

            86400000

        );

        item.daysLeft = diff;

        item.countdown =

        formatPlannerCountdown(diff);

        item.completed = false;

        /* ======================
           KEYWORD + TRANSACTION
        ====================== */

        if(

            item.hasKeyword &&

            item.lastTransaction

        ){

            /* ==================
               ONE TIME
            ================== */

            if(

                item.interval===0

            ){

                item.completed = true;

                item.status =

                "completed";

                item.countdown =

                "✔ Selesai";

                return;

            }

            /* ==================
               RECURRING
            ================== */

            if(

                diff===0

            ){

                item.status =

                "today";

                return;

            }

            if(

                diff>0 &&

                diff<=item.reminderBefore

            ){

                item.status =

                "upcoming";

                return;

            }

            if(

                diff<0

            ){

                item.status =

                "upcoming";

                item.countdown =

                `⚠ Terlambat ${

                    Math.abs(diff)

                } hari`;

                return;

            }

            item.status =

            "waiting";

            return;

        }

        /* ======================
           EVENT / NO TRANSACTION
        ====================== */

        if(diff===0){

            item.status =

            "today";

            return;

        }

        if(

            diff>0 &&

            diff<=item.reminderBefore

        ){

            item.status =

            "upcoming";

            return;

        }

        if(diff<0){

            item.status =

            "upcoming";

            item.countdown =

            `⚠ Terlambat ${

                Math.abs(diff)

            } hari`;

            return;

        }

        item.status =

        "waiting";

    });

}

/* ===========================
   SORT PLANNER
=========================== */

function sortPlanner(){

    const order={

        today:0,

        upcoming:1,

        waiting:2,

        completed:3

    };

    Finance.planner.sort(

        (a,b)=>{

            if(

                order[a.status]!==

                order[b.status]

            ){

                return(

                    order[a.status]-

                    order[b.status]

                );

            }

            return(

                a.dueDate-

                b.dueDate

            );

        }

    );

}

/* ===========================
   FORMAT COUNTDOWN
=========================== */

function formatPlannerCountdown(days){

    if(days<0){

        return `⚠ Terlambat ${Math.abs(days)} hari`;

    }

    if(days===0){

        return "Hari Ini";

    }

    if(days===1){

        return "Besok";

    }

    if(days<30){

        return `${days} hari lagi`;

    }

    if(days<365){

        const month =

        Math.floor(days/30);

        return `${month} bulan lagi`;

    }

    const year =

    Math.floor(days/365);

    const month =

    Math.floor(

        (days%365)/30

    );

    return month===0

    ? `${year} tahun lagi`

    : `${year} tahun ${month} bulan lagi`;

}


/* ===========================
   PROCESS PLANNER
=========================== */

function processPlanner(){

    normalizePlanner();

    findLastTransaction();

    calculateDueDate();

    calculateStatus();

    sortPlanner();

}

