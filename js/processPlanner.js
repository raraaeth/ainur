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

        return{

            title :

            item.Judul,

            type :

            item.Jenis
            .trim()
            .toLowerCase(),

            date :

            new Date(item.Tanggal),

            interval :

            Number(item.Interval)||0,

            keyword :

            (item.Keyword||"")
            .trim()
            .toLowerCase(),

            priority :

            item.Priority
            .trim()
            .toLowerCase(),

            reminderBefore :

            Number(
                item["Reminder before"]
            )||0,

            note :

            item.Catatan||""

        };

    });

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

        let nextDate = new Date(target);

        while(nextDate < today && item.interval > 0){

            nextDate.setDate(

                nextDate.getDate() +

                item.interval

            );

        }

        const diff = Math.ceil(

            (nextDate - today)

            /86400000

        );

        item.nextDate = nextDate;

        item.daysLeft = diff;

        if(diff < 0){

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

    calculatePlannerStatus();

}




