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
   UPCOMING ANIMATION
========================= */

function animateUpcoming(direction){

    const list =

    document.getElementById(
        "upcomingList"
    );

    if(!list) return;

    list.classList.remove(
        "slide-left",
        "slide-right"
    );

    void list.offsetWidth;

    list.classList.add(

        direction === "next"

        ? "slide-left"

        : "slide-right"

    );

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

    /* =====================
       PAGINATION
    ===================== */

    const start =

    (Airdrop.upcomingPage - 1) *

    Airdrop.upcomingPerPage;

    const end =

    start +

    Airdrop.upcomingPerPage;

    const data =

    Airdrop.upcoming.slice(

        start,

        end

    );

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

            default:

                subtitle = "-";

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

    }).join("");

}

/* =========================
   UPCOMING PAGINATION
========================= */

function updateUpcomingPagination(){

    const prev =

    document.getElementById(
        "upcomingPrev"
    );

    const next =

    document.getElementById(
        "upcomingNext"
    );

    const indicator =

    document.getElementById(
        "upcomingIndicator"
    );

    const pageInfo =

    document.getElementById(
        "upcomingPageInfo"
    );

    if(
        !prev ||
        !next ||
        !indicator ||
        !pageInfo
    ) return;

    const totalPage =

    Math.max(

        1,

        Math.ceil(

            Airdrop.upcoming.length /

            Airdrop.upcomingPerPage

        )

    );

    /* ===== PAGE INFO ===== */

    pageInfo.textContent =

    `Halaman ${Airdrop.upcomingPage} / ${totalPage}`;

    /* ===== MOBILE INDICATOR ===== */

       const active =

       (Airdrop.upcomingPage - 1) % 3;

       const dots = [

         "○",

         "○",

         "○"

         ];

       dots[active] = "●";

       indicator.innerHTML =

       dots.join(" ");

    /* ===== BUTTON ===== */

    prev.disabled =

    Airdrop.upcomingPage === 1;

    next.disabled =

    Airdrop.upcomingPage === totalPage;

    prev.onclick = ()=>{

    if(

        Airdrop.upcomingPage > 1

    ){

        animateUpcoming("prev");

        Airdrop.upcomingPage--;

        setTimeout(()=>{

            updateUpcoming();

            updateUpcomingPagination();

        },180);

    }

};

    next.onclick = ()=>{

    if(

        Airdrop.upcomingPage < totalPage

    ){

        animateUpcoming("next");

        Airdrop.upcomingPage++;

        setTimeout(()=>{

            updateUpcoming();

            updateUpcomingPagination();

        },180);

    }

};

}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateAirdropDashboard(){

    updateAirdropSummary();

    updateHallOfFame();

    updateUpcoming();

    updateUpcomingPagination();

}
