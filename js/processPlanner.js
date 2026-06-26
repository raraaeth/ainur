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
   PROCESS PLANNER
=========================== */

function processPlanner(){

    normalizePlanner();

}
