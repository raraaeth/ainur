/* =====================================================
   AIRDROP PROCESS
===================================================== */

/* =========================
   NORMALIZE
========================= */

function normalizeAirdrop(){

    Airdrop.data =

    Airdrop.raw.map(item=>{

        return{

            project:

            item.Project
            ?.trim() || "",

            source:

            item.Source
            ?.trim() || "",

            category:

            item.Kategori
            ?.trim() || "",

            wallet:

            item.Wallet
            ?.trim() || "",

            status:

            item.Status
            ?.trim() || "",

            started:

            item.Started

            ? new Date(item.Started)

            : null,

            estimationEnd:

            item.EstimationEnd

            ? new Date(
                item.EstimationEnd
            )

            : null,

            token:

            item.Token
            ?.trim() || "",

            qty:

            Number(
                item.QTY
            ) || 0,

            sellPrice:

            Number(
                item.SellPrice
            ) || 0,

            totalUSD:

            Number(
                item.TotalUSD
            ) || 0,

            notes:

            item.Notes
            ?.trim() || ""

        };

    });

}
/* =========================
   SUMMARY
========================= */

function calculateSummary(){

    let totalUSD = 0;

    let won = 0;

    let failed = 0;

    let active = 0;

    Airdrop.data.forEach(item=>{

        totalUSD += item.totalUSD;

        switch(item.status){

            case "ClaimAll":

            case "ClaimVesting":

            case "DistriAll":

            case "Mint":

                won++;

                break;

            case "NotEligible":

            case "NotWin":

                failed++;

                break;

            case "Eligible":

            case "Ongoing":

                active++;

                break;

        }

    });

    Airdrop.summary = {

        totalProject:

        Airdrop.data.length,

        totalUSD,

        won,

        failed,

        active

    };

    console.log(

        "Airdrop Summary",

        Airdrop.summary

    );

}
/* =========================
   HALL OF FAME
========================= */

function calculateHallOfFame(){

    Airdrop.hallOfFame =

    [...Airdrop.data]

    .filter(item=>

        item.totalUSD > 0

    )

    .sort(

        (a,b)=>

        b.totalUSD -

        a.totalUSD

    )

    .slice(0,4);

    console.log(

        "Hall Of Fame",

        Airdrop.hallOfFame

    );

}

/* =========================
   UPCOMING
========================= */

function calculateUpcoming(){

    const today = new Date();

    Airdrop.upcoming =

    [...Airdrop.data]

    .filter(item=>

        (
            item.status==="Eligible" ||

            item.status==="Ongoing"
        )

        &&

        item.estimationEnd

        &&

        item.estimationEnd >= today

    )

    .sort(

        (a,b)=>

        a.estimationEnd -

        b.estimationEnd

    );

    console.log(

        "Upcoming",

        Airdrop.upcoming

    );

}

/* =========================
   HISTORY
========================= */

function prepareHistory(){

    Airdrop.history =

    [...Airdrop.data]

    .sort(

        (a,b)=>{

            if(

                !a.estimationEnd &&

                !b.estimationEnd

            ) return 0;

            if(

                !a.estimationEnd

            ) return 1;

            if(

                !b.estimationEnd

            ) return -1;

            return(

                b.estimationEnd -

                a.estimationEnd

            );

        }

    );

    console.log(

        "History",

        Airdrop.history

    );

}

/* =========================
/* =========================
   AIRDROP REMINDER
========================= */

function processAirdropReminder(){

    Airdrop.upcoming.forEach(item=>{

        Finance.planner.push({

            type:"airdrop",

            priority:

            item.status==="Eligible"

            ?"high"

            :"medium",

            title:item.project,

            date:item.estimationEnd

        });

    });

}

/* =========================
   PROCESS AIRDROP
========================= */

function processAirdrop(){

    normalizeAirdrop();

    calculateSummary();

    calculateHallOfFame();

    calculateUpcoming();

    prepareHistory();

    processAirdropReminder();

}
