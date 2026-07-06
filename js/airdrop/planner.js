console.log("===== AIRDROP PLANNER =====");

/* =====================================================
   AIRDROP PLANNER
===================================================== */

/* =========================
   BUILD REMINDER
========================= */

function processAirdropPlanner(){

    Airdrop.reminders = [];

    processClaimReminder();

    processCampaignReminder();

    sortAirdropReminder();

}

/* =========================
   CLAIM REMINDER
========================= */

function processClaimReminder(){

    const today =

    new Date();

    Airdrop.history.forEach(item=>{

        if(

            item.status !==

            AIRDROP_REMINDER.claimStatus

        ) return;

        if(

            !item.estimationEnd

        ) return;

        const endDate =

        new Date(

            item.estimationEnd

        );

        const diff =

        Math.ceil(

            (endDate - today) /

            86400000

        );

        if(diff < 0) return;

        Airdrop.reminders.push({

            type:"claim",

            priority:1,

            project:item.project,

            category:item.category,

            status:item.status,

            date:item.estimationEnd,

            daysLeft:diff

        });

    });

  /* =========================
   CAMPAIGN REMINDER
========================= */

function processCampaignReminder(){

    const today =

    new Date();

    const campaignMap =

    new Map();

    Airdrop.history.forEach(item=>{

        if(

            item.category !==

            AIRDROP_REMINDER.campaignCategory

        ) return;

        if(

            item.status !==

            AIRDROP_REMINDER.campaignStatus

        ) return;

        if(

            !item.estimationEnd

        ) return;

        const endDate =

        new Date(

            item.estimationEnd

        );

        const diff =

        Math.ceil(

            (endDate - today) /

            86400000

        );

        if(

            diff < 0 ||

            diff >

            AIRDROP_REMINDER.campaignReminderDays

        ) return;

        const key =

        [

            item.project,

            item.category,

            item.status,

            item.estimationEnd

        ].join("|");

        if(

            campaignMap.has(key)

        ) return;

        campaignMap.set(

            key,

            true

        );

        Airdrop.reminders.push({

            type:"campaign",

            priority:2,

            project:item.project,

            category:item.category,

            status:item.status,

            date:item.estimationEnd,

            daysLeft:diff

        });

    });

          }

  
/* =========================
   SORT REMINDER
========================= */

function sortAirdropReminder(){

    Airdrop.reminders.sort(

        (a,b)=>{

            // Priority
            if(

                a.priority !==

                b.priority

            ){

                return (

                    a.priority -

                    b.priority

                );

            }

            // Hari terdekat
            if(

                a.daysLeft !==

                b.daysLeft

            ){

                return (

                    a.daysLeft -

                    b.daysLeft

                );

            }

            // Tanggal
            return (

                new Date(a.date) -

                new Date(b.date)

            );

        }

    );

}
}
