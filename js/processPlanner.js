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

        (item.Jenis || "")

        .trim()

        .toLowerCase();

        return{

            title :

            item.Judul || "",

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

            item.Catatan || "",

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

            lastTransaction :

            null,

            nextDate :

            null,

            daysLeft :

            0,

            countdown :

            "",

            status :

            "waiting"

        };

    });

}


/* ===========================
   MATCH TRANSACTION
=========================== */

function matchPlannerTransaction(){

    Finance.planner.forEach(item=>{

        item.lastTransaction = null;

        if(

            item.isEvent ||

            !item.keyword

        ){

            return;

        }

        const transaction =

        Finance.data

        .filter(data=>

            data.description

            .toLowerCase()

            .includes(

                item.keyword

            )

        )

        .sort(

            (a,b)=>

            b.date-a.date

        )[0];

        if(transaction){

            item.lastTransaction =

            transaction;

        }

    });

}


/* ===========================
   FORMAT COUNTDOWN
=========================== */

function formatPlannerCountdown(days){

    if(days < 0){

        return `Terlambat ${Math.abs(days)} hari`;

    }

    if(days === 0){

        return "Hari ini";

    }

    if(days === 1){

        return "Besok";

    }

    if(days < 7){

        return `${days} hari lagi`;

    }

    if(days < 30){

        return `${Math.ceil(days / 7)} minggu lagi`;

    }

    if(days < 365){

        return `${Math.ceil(days / 30)} bulan lagi`;

    }

    return `${Math.ceil(days / 365)} tahun lagi`;

}


/* ===========================
   PLANNER STATUS
=========================== */

function calculatePlannerStatus(){

    const today = new Date();

    today.setHours(0,0,0,0);

    Finance.planner.forEach(item=>{

        const target = new Date(item.date);

        target.setHours(0,0,0,0);

        const diff = Math.ceil(

            (target - today) / 86400000

        );

        item.nextDate = target;

        item.daysLeft = diff;

        item.countdown =

        formatPlannerCountdown(diff);

        if(

            item.isTask &&

            item.lastTransaction

        ){

            item.status = "completed";

        }

        else if(diff < 0){

            item.status = "overdue";

        }

        else if(diff === 0){

            item.status = "today";

        }

        else if(

            diff <= item.reminderBefore

        ){

            item.status = "upcoming";

        }

        else{

            item.status = "waiting";

        }

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
