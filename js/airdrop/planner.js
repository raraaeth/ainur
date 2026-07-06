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

    const today = new Date();

    today.setHours(0,0,0,0);

    Airdrop.history.forEach(item=>{

        if(
            item.status !==
            AIRDROP_REMINDER.claimStatus
        ) return;

        if(!item.estimationEnd) return;

        const endDate =
        new Date(item.estimationEnd);

        endDate.setHours(0,0,0,0);

        const diff = Math.ceil(
            (endDate - today) /
            86400000
        );

        if(diff < 0) return;

        Airdrop.reminders.push({

            type:"airdrop",

            reminderType:"claim",

            priority:1,

            project:item.project,

            category:item.category,

            status:item.status,

            date:item.estimationEnd,

            daysLeft:diff

        });

    });

}

/* =========================
   CAMPAIGN REMINDER
========================= */

function processCampaignReminder(){

    const today = new Date();

    today.setHours(0,0,0,0);

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

        if(!item.estimationEnd) return;

        const endDate =
        new Date(item.estimationEnd);

        endDate.setHours(0,0,0,0);

        const diff = Math.ceil(
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

            type:"airdrop",

            reminderType:"campaign",

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

    Airdrop.reminders.sort((a,b)=>{

        if(
            a.priority !==
            b.priority
        ){

            return (
                a.priority -
                b.priority
            );

        }

        if(
            a.daysLeft !==
            b.daysLeft
        ){

            return (
                a.daysLeft -
                b.daysLeft
            );

        }

        return (
            new Date(a.date) -
            new Date(b.date)
        );

    });

}
