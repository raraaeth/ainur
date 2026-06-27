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

        String(item.Jenis||"")

        .trim()

        .toLowerCase();

        return{

            title:

            item.Judul||"",

            type,

            date:

            new Date(item.Tanggal),

            interval:

            Number(item.Interval)||0,

            keyword:

            String(item.Keyword||"")

            .trim()

            .toLowerCase(),

            priority:

            String(item.Priority||"medium")

            .trim()

            .toLowerCase(),

            reminderBefore:

            Number(

                item["Reminder before"]

            )||0,

            note:

            item.Catatan||"",

            /* CATEGORY */

            isRecurring:[

                "maintenance",

                "reminder"

            ].includes(type),

            isEvent:[

                "birthday",

                "anniversary"

            ].includes(type),

            isProject:[

                "planning",

                "renovasi"

            ].includes(type),

            /* RUNTIME */

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

        if(

            !item.isRecurring ||

            !item.keyword

        ){

            return;

        }

        const transactions =

        Finance.data.filter(transaction=>{

            const description =

            String(

                transaction.description||

                ""

            )

            .toLowerCase()

            .trim();

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

    today.setHours(0,0,0,0);

    Finance.planner.forEach(item=>{

        let dueDate =

        new Date(item.date);

        dueDate.setHours(

            0,0,0,0

        );

        /* ======================
           RECURRING
        ====================== */

        if(item.isRecurring){

            if(item.lastTransaction){

                dueDate =

                new Date(

                    item.lastTransaction.date

                );

                dueDate.setHours(

                    0,0,0,0

                );

            }

            dueDate.setDate(

                dueDate.getDate() +

                item.interval

            );

        }

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

            if(dueDate < today){

                dueDate.setFullYear(

                    dueDate.getFullYear()+1

                );

            }

        }

        /* ======================
           PROJECT
        ====================== */

        if(item.isProject){

            dueDate =

            new Date(item.date);

            dueDate.setHours(

                0,0,0,0

            );

        }

        item.dueDate = dueDate;

    });

}

/* ===========================
   CALCULATE STATUS
=========================== */

function calculateStatus(){

    const today = new Date();

    today.setHours(0,0,0,0);

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
           PROJECT
        ====================== */

        if(item.isProject){

            if(

                item.keyword &&

                item.lastTransaction

            ){

                item.completed = true;

                item.status =

                "completed";

                return;

            }

        }

        /* ======================
           TODAY
        ====================== */

        if(diff===0){

            item.status="today";

            return;

        }

        /* ======================
           UPCOMING
        ====================== */

        if(

            diff>0 &&

            diff<=item.reminderBefore

        ){

            item.status="upcoming";

            return;

        }

        /* ======================
           OVERDUE
        ====================== */

        if(diff<0){

            item.status="upcoming";

            item.countdown=

            `⚠ Terlambat ${

                Math.abs(diff)

            } hari`;

            return;

        }

        /* ======================
           WAITING
        ====================== */

        item.status="waiting";

    });

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

                a.daysLeft-

                b.daysLeft

            );

        }

    );

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





