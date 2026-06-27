/* =====================================================
   Life Dashboard v2.0
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

            title :

            item.Judul||"",

            type,

            date :

            new Date(item.Tanggal),

            interval :

            Number(item.Interval)||0,

            keyword :

            (item.Keyword||"")

            .trim()

            .toLowerCase(),

            priority :

            (item.Priority||"low")

            .trim()

            .toLowerCase(),

            reminderBefore :

            Number(

                item["Reminder before"]

            )||0,

            note :

            item.Catatan||"",

            isEvent :

            [

                "birthday",

                "anniversary"

            ].includes(type),

            isTask :

            [

                "maintenance",

                "reminder",

                "planning",

                "renovasi"

            ].includes(type),

            lastTransaction :

            null,

            status :

            "waiting",

            daysLeft :

            0,

            countdown :

            "",

            completed :

            false

        };

    });

}

            


/* ===========================
   MATCH PLANNER TRANSACTION
=========================== */

function matchPlannerTransaction(){

    Finance.planner.forEach(item=>{

        /* Event tidak membutuhkan
           transaksi */

        if(item.isEvent){

            return;

        }

        /* Task tanpa keyword
           dianggap planner manual */

        if(!item.keyword){

            return;

        }

        const transactions =

        Finance.data.filter(transaction=>{

            return(

                transaction.description

                .toLowerCase()

                .includes(

                    item.keyword

                )

            );

        });

        if(transactions.length===0){

            return;

        }

        transactions.sort(

            (a,b)=>

            b.date-a.date

        );

        item.lastTransaction =

        transactions[0];

    });

}

/* ===========================
   CALCULATE PLANNER STATUS
=========================== */

function calculatePlannerStatus(){

    const today = new Date();

    today.setHours(0,0,0,0);

    Finance.planner.forEach(item=>{

        let target = new Date(item.date);

        target.setHours(0,0,0,0);

        /* ======================
           Birthday & Anniversary
        ====================== */

        if(item.isEvent){

            target = new Date(today);

            target.setMonth(

                item.date.getMonth()

            );

            target.setDate(

                item.date.getDate()

            );

            target.setHours(

                0,0,0,0

            );

            if(target < today){

                target.setFullYear(

                    target.getFullYear()+1

                );

            }

        }

        const diff = Math.ceil(

            (target - today)

            /86400000

        );

        item.nextDate = target;

        item.daysLeft = diff;

        item.countdown =

        formatPlannerCountdown(diff);

        /* ======================
   CALCULATE NEXT DATE
====================== */

if(

    item.isTask &&

    item.keyword &&

    item.lastTransaction

){

    target = new Date(

        item.lastTransaction.date

    );

    target.setDate(

        target.getDate() +

        item.interval

    );

    target.setHours(

        0,0,0,0

    );

    item.nextDate = target;

    item.daysLeft = Math.ceil(

        (target - today) /

        86400000

    );

    item.countdown =

    formatPlannerCountdown(

        item.daysLeft

    );

}

        /* ======================
           TODAY
        ====================== */

        if(diff === 0){

            item.status =

            "today";

        }

        /* ======================
           UPCOMING
        ====================== */

        else if(

            diff <=

            item.reminderBefore

        ){

            item.status =

            "upcoming";

        }

        /* ======================
           WAITING
        ====================== */

        else{

            item.status =

            "waiting";

        }

    });

    }


/* ===========================
   FORMAT PLANNER COUNTDOWN
=========================== */

function formatPlannerCountdown(days){

    if(days < 0){

        return `⚠ Terlambat ${Math.abs(days)} hari`;

    }

    if(days === 0){

        return "Hari ini";

    }

    if(days === 1){

        return "Besok";

    }

    if(days < 30){

        return `${days} hari lagi`;

    }

    if(days < 365){

        const month =

        Math.floor(days / 30);

        return `${month} bulan lagi`;

    }

    const year =

    Math.floor(days / 365);

    const remain =

    days % 365;

    const month =

    Math.floor(remain / 30);

    if(month===0){

        return `${year} tahun lagi`;

    }

    return `${year} tahun ${month} bulan lagi`;

}

/* ===========================
   SORT PLANNER
=========================== */

function sortPlanner(){

    const statusOrder={

        today:0,

        upcoming:1,

        waiting:2,

        completed:3

    };

    Finance.planner.sort(

        (a,b)=>{

            const statusDiff =

            statusOrder[a.status]-

            statusOrder[b.status];

            if(statusDiff!==0){

                return statusDiff;

            }

            /* ======================
               COMPLETED
            ====================== */

            if(

                a.status==="completed" &&

                b.status==="completed"

            ){

                const dateA =

                a.lastTransaction

                ? a.lastTransaction.date

                : a.date;

                const dateB =

                b.lastTransaction

                ? b.lastTransaction.date

                : b.date;

                return dateB-dateA;

            }

            /* ======================
               ACTIVE
            ====================== */

            return a.daysLeft-b.daysLeft;

        }

    );
 }


/* ===========================
   PROCESS PLANNER
=========================== */

function processPlanner(){

    normalizePlanner();

    matchPlannerTransaction();

    calculatePlannerStatus();

    sortPlanner();

}
