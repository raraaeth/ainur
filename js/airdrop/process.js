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

function calculateAirdropSummary(){

    let totalUSD = 0;

    let won = 0;

    let failed = 0;

    let active = 0;

   console.log(
    Airdrop.data[0].status
);
   

    Airdrop.data.forEach(item=>{

       console.log(
        `[${item.status}]`,
        item.status.length
    );

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

   console.log(
    Airdrop.data.map(item => item.status)
);

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

function calculateAirdropHallOfFame(){

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

function calculateAirdropUpcoming(){

    Airdrop.upcoming =

    [...Airdrop.data]

    .filter(item=>

        /* =====================
           ELIGIBLE
        ===================== */

        item.status==="Eligible"

        ||

        /* =====================
           ONGOING
        ===================== */

        item.status==="Ongoing"

        ||

        /* =====================
           CLAIM VESTING
           Belum claim jika
           qty masih kosong
        ===================== */

        (

            item.status==="ClaimVesting"

            &&

            item.qty===0

        )

    )

    .sort((a,b)=>{

        /* =====================
           Yang punya estimasi
           lebih dulu tampil
        ===================== */

        if(

            a.estimationEnd &&

            b.estimationEnd

        ){

            return(

                a.estimationEnd -

                b.estimationEnd

            );

        }

        if(a.estimationEnd)

            return -1;

        if(b.estimationEnd)

            return 1;

        return a.project.localeCompare(

            b.project

        );

    });

    console.log(

        "Upcoming",

        Airdrop.upcoming

    );

           }


/* =========================
   HISTORY
========================= */

function prepareAirdropHistory(){

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
   AIRDROP REMINDER
========================= */

function processAirdropReminder(){

    Airdrop.data.forEach(item=>{

        /* =====================
           ONGOING
        ===================== */

        if(item.status==="Ongoing"){

            Finance.planner.push({

                type:"airdrop",

                priority:"medium",

                status:"upcoming",

                title:item.project,

                countdown:"Masih Farming"

            });

        }

        /* =====================
           ELIGIBLE
        ===================== */

        if(item.status==="Eligible"){

            Finance.planner.push({

                type:"airdrop",

                priority:"high",

                status:"today",

                title:item.project,

                countdown:"Segera Claim"

            });

        }

        /* =====================
           CLAIM VESTING
        ===================== */

        if(

            item.status==="ClaimVesting" &&

            item.estimationEnd

        ){

            Finance.planner.push({

                type:"airdrop",

                priority:"low",

                type:"airdrop",

                title:item.project,

                date:item.estimationEnd

            });

        }

    });

}

/* =========================
   PROCESS AIRDROP
========================= */

function processAirdrop(){

    normalizeAirdrop();

    calculateAirdropSummary();

    calculateAirdropHallOfFame();

    calculateAirdropUpcoming();

    prepareAirdropHistory();

    processAirdropReminder();

}
