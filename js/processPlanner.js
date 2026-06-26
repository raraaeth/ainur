/* =====================================================
   Life Dashboard v1.0
   File : processPlanner.js
===================================================== */
/* ===========================
   NORMALIZE PLANNER
=========================== */

function normalizePlanner(){

    Finance.planner =

    Finance.plannerRaw.map(item=>{

        const type =

        item.Jenis
        .trim()
        .toLowerCase();

        return{

            title :

            item.Judul,

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
                "reminder"
            ].includes(type),

            lastTransaction : null,

            nextDate : null,

            daysLeft : 0,

            countdown : "",

            completed : false,

            status : "waiting"

        };

    });

}


/* ===========================
   PLANNER STATUS
=========================== */

function calculatePlannerStatus(){

    const today = new Date();

    today.setHours(

        0,0,0,0

    );

    Finance.planner.forEach(item=>{

        const target =

        new Date(item.date);

        target.setHours(

            0,0,0,0

        );

        const diff = Math.ceil(

            (target - today)

            /86400000

        );

        item.nextDate = target;

        item.daysLeft = diff;

        item.countdown =

        formatPlannerCountdown(diff);

        /* ===================
           EVENT
        =================== */

        if(item.isEvent){

            if(diff < 0){

                item.status =

                "overdue";

            }

            else if(diff === 0){

                item.status =

                "today";

            }

            else if(

                diff <=

                item.reminderBefore

            ){

                item.status =

                "upcoming";

            }

            else{

                item.status =

                "waiting";

            }

            return;

        }

        /* ===================
           TASK
        =================== */

        if(item.completed){

            item.status =

            "completed";

        }

        else if(diff < 0){

            item.status =

            "overdue";

        }

        else if(diff === 0){

            item.status =

            "today";

        }

        else if(

            diff <=

            item.reminderBefore

        ){

            item.status =

            "upcoming";

        }

        else{

            item.status =

            "waiting";

        }

    });

}

/* ===========================
   FORMAT COUNTDOWN
=========================== */

function formatPlannerCountdown(days){

    if(days<0){

        return `Terlambat ${Math.abs(days)} hari`;

    }

    if(days===0){

        return "Hari ini";

    }

    if(days===1){

        return "Besok";

    }

    if(days<7){

        return `${days} hari lagi`;

    }

    if(days<30){

        const week =

        Math.ceil(days/7);

        return `${week} minggu lagi`;

    }

    const month =

Math.ceil(days/30);

return `${month} bulan lagi`;

}

/* ===========================
   NEXT DUE DATE
=========================== */

function getNextDueDate(item){

    let nextDate;

    if(item.lastTransaction){

        nextDate =

        new Date(

            item.lastTransaction.date

        );

    }

    else{

        nextDate =

        new Date(

            item.date

        );

    }

    nextDate.setHours(

        0,0,0,0

    );

    while(

        nextDate < new Date() &&

        item.interval > 0

    ){

        nextDate.setDate(

            nextDate.getDate() +

            item.interval

        );

    }

    return nextDate;

}


/* ===========================
   MATCH TRANSACTION
=========================== */

function matchPlannerTransaction(){

    Finance.planner.forEach(planner=>{

        /* Event tidak membutuhkan transaksi */

        if(planner.isEvent){

            planner.lastTransaction = null;

            planner.completed = false;

            return;

        }

        /* Task tanpa keyword */

        if(!planner.keyword){

            planner.lastTransaction = null;

            planner.completed = false;

            return;

        }

        const transactions =

        Finance.data.filter(item=>{

            return item.description

                .toLowerCase()

                .includes(

                    planner.keyword

                );

        });

        if(transactions.length===0){

            planner.lastTransaction = null;

            planner.completed = false;

            return;

        }

        transactions.sort(

            (a,b)=>

            b.date-a.date

        );

        planner.lastTransaction =

        transactions[0];

        planner.completed = true;

    });

}

/* ===========================
   PROCESS PLANNER
=========================== */

function processPlanner(){

    normalizePlanner();

    matchPlannerTransaction();

    calculatePlannerStatus();

}




