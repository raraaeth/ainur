console.log("===== AIRDROP DASHBOARD =====");
/* =====================================================
   AIRDROP DASHBOARD
===================================================== */

/* =========================
   UPDATE SUMMARY
========================= */
function updateAirdropSummary(){

    const totalUSD =
    document.getElementById(
        "airdropTotalUSD"
    );

    const won =
    document.getElementById(
        "airdropWon"
    );

    const failed =
    document.getElementById(
        "airdropFailed"
    );

    const active =
    document.getElementById(
        "airdropActive"
    );

    const badge =
    document.getElementById(
        "airdropProjectBadge"
    );

    if(totalUSD){

        totalUSD.textContent =
        formatUSD(
            Airdrop.summary.totalUSD
        );

    }

    if(won){

        won.textContent =
        Airdrop.summary.won;

    }

    if(failed){

        failed.textContent =
        Airdrop.summary.failed;

    }

    if(active){

        active.textContent =
        Airdrop.summary.active;

    }

    if(badge){

        badge.textContent =
        `${Airdrop.summary.totalProject} Projects`;

    }

}

/* =========================
   HALL OF FAME
========================= */

function updateHallOfFame(){

    const container =

    document.getElementById(

        "hallOfFame"

    );

    if(!container) return;

    const medal = [

        "🥇",

        "🥈",

        "🥉",

        "⭐"

    ];

    container.innerHTML =

    Airdrop.hallOfFame

    .map((item,index)=>`

        <div class="hall-card rank-${index+1}">

            <div class="hall-rank">

                ${medal[index]}

            </div>

            <div class="hall-project">

                ${item.project}

            </div>

            <div class="hall-usd">

                ${formatUSD(

    item.totalUSD

)}

            </div>

            <div class="hall-token">

                ${item.qty}

                ${item.token}

            </div>

            <div class="hall-wallet">

                👛 ${item.wallet}

            </div>

        </div>

    `)

    .join("");

}


/* =========================
   UPCOMING
========================= */

function updateUpcoming(){

    const container =

    document.getElementById(

        "upcomingList"

    );

    if(!container) return;

    const data =

    Airdrop.upcoming

    .slice(0,5);

    if(data.length===0){

        container.innerHTML =

        `

        <div class="upcoming-empty">

            Tidak ada project yang perlu dipantau.

        </div>

        `;

        return;

    }

    container.innerHTML =

    data.map(item=>{

        let subtitle = "";

        switch(item.status){

            case "ClaimVesting":

                subtitle =

                item.estimationEnd

                ?

                `Next Claim ${formatDate(item.estimationEnd)}`

                :

                "Waiting Next Claim";

                break;

            case "Eligible":

                subtitle =

                "Waiting Distribution";

                break;

            case "Ongoing":

                subtitle =

                "Still Farming";

                break;

        }

        return `

        <div class="upcoming-item">

            <div>

                <strong>

                    ${item.project}

                </strong>

                <small>

                    ${item.status}

                </small>

            </div>

            <div>

                <small>

                    ${subtitle}

                </small>

            </div>

        </div>

        `;

    })

    .join("");

       }


/* =========================
   UPDATE DASHBOARD
========================= */

function updateAirdropDashboard(){

    updateAirdropSummary();

    updateHallOfFame();

    updateUpcoming();

}
