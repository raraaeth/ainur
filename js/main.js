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

function showPage(pageId){

    /* =====================
       PAGE
    ===================== */

    document

    .querySelectorAll(".page")

    .forEach(page=>{

        page.classList.remove(

            "active-page"

        );

    });

    const target =

    document.getElementById(

        pageId

    );

    if(target){

        target.classList.add(

            "active-page"

        );

    }

    /* =====================
       NAVIGATION
    ===================== */

    document

    .querySelectorAll(".nav-item")

    .forEach(item=>{

        item.classList.remove(

            "active"

        );

        if(

            item.dataset.page===

            pageId

        ){

            item.classList.add(

                "active"

            );

        }

    });

    /* =====================
       SCROLL TOP
    ===================== */

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


