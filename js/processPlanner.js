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

        let nextDate;

        if(item.lastTransaction){

            nextDate = new Date(

                item.lastTransaction.date

            );

        }

        else{

            nextDate = new Date(

                item.date

            );

        }

        nextDate.setHours(

            0,0,0,0

        );

        while(

            nextDate < today &&

            item.interval > 0

        ){

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

        item.countdown =

        formatPlannerCountdown(diff);
       item.completed =

       item.lastTransaction &&

       item.lastTransaction.date >= item.date;

      if(item.completed){

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
   MATCH TRANSACTION
=========================== */

function matchPlannerTransaction(){

    Finance.planner.forEach(planner=>{

        /* Birthday & Anniversary
           tidak membutuhkan transaksi */

        if(!planner.keyword){

            planner.lastTransaction = null;

            return;

        }

        const transactions =

        Finance.data.filter(item=>{

            return(

                item.description

                .toLowerCase()

                .includes(

                    planner.keyword

                )

            );

        });

        if(transactions.length===0){

            planner.lastTransaction = null;

            return;

        }

        transactions.sort(

            (a,b)=>

            b.date-a.date

        );

        planner.lastTransaction =

        transactions[0];

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




