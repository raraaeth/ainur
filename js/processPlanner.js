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

        (item.Jenis||"")

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

            reminderBefore:

            Number(item["Reminder before"])||0,

            keyword:

            (item.Keyword||"")

            .trim()

            .toLowerCase(),

            priority:

            (item.Priority||"medium")

            .toLowerCase(),

            note:

            item.Catatan||"",

            /* ===================
               CATEGORY
            =================== */

            isRecurring:

            [

                "maintenance",

                "reminder"

            ].includes(type),

            isEvent:

            [

                "birthday",

                "anniversary"

            ].includes(type),

            isProject:

            [

                "planning",

                "renovasi"

            ].includes(type),

            /* ===================
               RUNTIME
            =================== */

            lastTransaction:null,

            nextDate:null,

            daysLeft:0,

            countdown:"",

            completed:false,

            status:"waiting"

        };

    });

}


/* ===========================
   FIND LAST TRANSACTION
=========================== */

function findLastTransaction(){

    Finance.planner.forEach(item=>{

        if(!item.keyword){

            return;

        }

        const transactions =

        Finance.data.filter(transaction=>{

            const description =

            String(

                transaction.description||

                ""

            ).toLowerCase();

            return description.includes(

                item.keyword

            );

        });

        if(transactions.length===0){

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
   CALCULATE NEXT DATE
=========================== */

function calculateNextDate(){

    const today = new Date();

    today.setHours(0,0,0,0);

    Finance.planner.forEach(item=>{

        let nextDate =

        new Date(item.date);

        nextDate.setHours(

            0,0,0,0

        );

        /* ======================
           RECURRING
        ====================== */

        if(item.isRecurring){

            if(item.lastTransaction){

                nextDate =

                new Date(

                    item.lastTransaction.date

                );

                nextDate.setHours(

                    0,0,0,0

                );

                nextDate.setDate(

                    nextDate.getDate() +

                    item.interval

                );

            }

        }

        /* ======================
           EVENT
        ====================== */

        if(item.isEvent){

            nextDate =

            new Date(today);

            nextDate.setMonth(

                item.date.getMonth()

            );

            nextDate.setDate(

                item.date.getDate()

            );

            nextDate.setHours(

                0,0,0,0

            );

            if(nextDate < today){

                nextDate.setFullYear(

                    nextDate.getFullYear()+1

                );

            }

        }

        /* ======================
           PROJECT
        ====================== */

        if(item.isProject){

            nextDate =

            new Date(item.date);

            nextDate.setHours(

                0,0,0,0

            );

        }

        item.nextDate =

        nextDate;

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

            (item.nextDate - today) /

            86400000

        );

        item.daysLeft = diff;

        item.countdown =

        formatPlannerCountdown(diff);

        /* ======================
           DEFAULT
        ====================== */

        item.completed = false;

        item.status = "waiting";

        /* ======================
           PROJECT
        ====================== */

        if(item.isProject){

            if(

                item.keyword &&

                item.lastTransaction

            ){

                item.completed = true;

                item.status = "completed";

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

            diff<=item.reminderBefore

        ){

            item.status="upcoming";

            return;

        }

        /* ======================
           WAITING
        ====================== */

        item.status="waiting";

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

            /* ===================
               STATUS
            =================== */

            if(

                order[a.status]!==

                order[b.status]

            ){

                return(

                    order[a.status]-

                    order[b.status]

                );

            }

            /* ===================
               COMPLETED
            =================== */

            if(

                a.status==="completed" &&

                b.status==="completed"

            ){

                if(

                    a.lastTransaction &&

                    b.lastTransaction

                ){

                    return(

                        new Date(

                            b.lastTransaction.date

                        )-

                        new Date(

                            a.lastTransaction.date

                        )

                    );

                }

            }

            /* ===================
               ACTIVE
            =================== */

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

    calculateNextDate();

    calculateStatus();

    sortPlanner();

}







