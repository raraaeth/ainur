/* =====================================================
   Finance Dashboard v1.0
   File : main.js
===================================================== */


/* ===========================
   INITIALIZE APP
=========================== */

document.addEventListener(
    "DOMContentLoaded",
    init
);

async function init(){

    /* =========================
       FINANCE
    ========================= */

    await fetchTransactions();

    await fetchPlanner();

    processFinanceData();

    processPlanner();

    updateDashboard();

    updateCharts();

    populateFilters();

    initFilters();

    updateTable();

    updateStatistics();

    updateInsight();

    updatePlanner();

    updatePlannerHeader();

/* =========================
   ATTENDANCE
========================= */

await fetchAttendance();

processAttendance();

prepareAttendanceHistory();

updateAttendanceDashboard();

updateAttendanceHistory();

/* =========================
   AIRDROP
========================= */

await fetchAirdrop();

processAirdrop();

processAirdropPlanner();

/* Refresh Planner karena ada reminder baru dari Airdrop */

processPlanner();

updatePlanner();

updatePlannerHeader();

populateAirdropFilters();

initAirdropFilters();

updateAirdropDashboard();

updateHistory();


/* =========================
   WALLET (Background)
========================= */
await fetchWalletPrices();
await fetchWalletList();

// update data terbaru dari Moralis
fetchAllWalletTokens()

.then(() => {

    processWalletData();
    updateWalletDashboard();
    updatePortfolioCard();
    renderWalletOverview();
    renderWalletAllocationChart();
    processTopHolding();
    renderTopHolding();
    renderTopHoldingChart();
    processInsight();
    updateInsight();

})

.catch(error => {

    console.error(
        "Wallet Error",
        error
    );

});


    /* =========================
       LAST SYNC
    ========================= */

    updateLastSync();
   /* =========================
   BOTTOM NAVIGATION
========================= */

document
.querySelectorAll(".nav-item")
.forEach(item=>{

    item.addEventListener(
        "click",
        ()=>{

            showPage(
                item.dataset.page
            );

        }

    );

});

}

/* =====================================================
   BOTTOM NAVIGATION
===================================================== */


/* =========================
   NAVIGATION STATE
========================= */

let navigationAnimating = false;


/* =========================
   PAGE ORDER
========================= */

const PAGE_ORDER = [

    "homePage",

    "financePage",

    "cryptoPage",

    "airdropPage"

];


/* =========================
   SHOW PAGE
========================= */

function showPage(pageId){

    /* =====================
       PREVENT MULTIPLE CLICK
    ===================== */

    if(

        navigationAnimating

    ){

        return;

    }


    /* =====================
       CURRENT PAGE
    ===================== */

    const currentPage =

    document.querySelector(

        ".page.active-page"

    );


    /* =====================
       TARGET PAGE
    ===================== */

    const targetPage =

    document.getElementById(

        pageId

    );


    /* =====================
       VALIDATION
    ===================== */

    if(

        !targetPage

    ){

        return;

    }


    /* =====================
       SAME PAGE
    ===================== */

    if(

        currentPage ===

        targetPage

    ){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        return;

    }


    /* =====================
       LOCK NAVIGATION
    ===================== */

    navigationAnimating = true;


    /* =====================
       PAGE INDEX
    ===================== */

    const currentIndex =

    PAGE_ORDER.indexOf(

        currentPage?.id

    );


    const targetIndex =

    PAGE_ORDER.indexOf(

        pageId

    );


    /* =====================
       DIRECTION
    ===================== */

    const moveForward =

    targetIndex >

    currentIndex;


    const exitClass =

    moveForward

    ?

    "page-exit-left"

    :

    "page-exit-right";


    const enterClass =

    moveForward

    ?

    "page-enter-right"

    :

    "page-enter-left";


    /* =====================
       RESET SCROLL
    ===================== */

    window.scrollTo({

        top:0,

        behavior:"auto"

    });


    /* =====================
       UPDATE NAVIGATION
    ===================== */

    document

    .querySelectorAll(

        ".nav-item"

    )

    .forEach(item=>{

        item.classList.toggle(

            "active",

            item.dataset.page ===

            pageId

        );

    });


    /* =====================
       CLEAN TARGET
    ===================== */

    targetPage.classList.remove(

        "page-enter-right",

        "page-enter-left",

        "page-exit-right",

        "page-exit-left"

    );


    /* =====================
       ENTER TARGET
    ===================== */

    targetPage.classList.add(

        "active-page",

        enterClass

    );


    /* =====================
       EXIT CURRENT
    ===================== */

    if(

        currentPage

    ){

        currentPage.classList.add(

            exitClass

        );

    }


    /* =====================
       FINISH ANIMATION
    ===================== */

    setTimeout(()=>{

        if(

            currentPage

        ){

            currentPage.classList.remove(

                "active-page",

                "page-exit-left",

                "page-exit-right"

            );

        }


        targetPage.classList.remove(

            "page-enter-left",

            "page-enter-right"

        );


        navigationAnimating = false;

    },320);

}

