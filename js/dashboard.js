/* =====================================================
   Finance Dashboard v1.0
   File : dashboard.js
===================================================== */


/* ===========================
   SUMMARY CARD
=========================== */

function updateSummaryCard(){

    const summary=

    Finance.summary;


    document

    .getElementById(

        "totalIncome"

    )

    .textContent=

    formatCurrency(

        summary.income

    );


    document

    .getElementById(

        "totalExpense"

    )

    .textContent=

    formatCurrency(

        summary.expense

    );


    document

    .getElementById(

        "remainingBalance"

    )

    .textContent=

    formatCurrency(

        summary.balance

    );


    document

    .getElementById(

        "savingRate"

    )

    .textContent=

    `${summary.savingRate.toFixed(1)}%`;

}


/* ===========================
   TABUNGAN SEABANK
=========================== */

function updateSavingCard(){

    const summary=

    Finance.summary;


    /* =====================
       SALDO SAAT INI
    ===================== */

    document

    .getElementById(

        "savingBalance"

    )

    .textContent=

    formatCurrency(

        summary.savingBalance

    );


    /* =====================
       TOTAL DEPOSIT
    ===================== */

    document

    .getElementById(

        "savingDeposit"

    )

    .textContent=

    formatCurrency(

        summary.savingDeposit

    );


    /* =====================
       TOTAL PENARIKAN
    ===================== */

    document

    .getElementById(

        "savingWithdraw"

    )

    .textContent=

    formatCurrency(

        summary.savingWithdraw

    );

}


/* ===========================
   UPDATE DASHBOARD
=========================== */

function updateDashboard(){

    updateSummaryCard();

    updateSavingCard();

}


/* ===========================
   LAST SYNC
=========================== */

function updateLastSync(){

    const now=

    new Date();


    const lastSync=

    document

    .getElementById(

        "lastSync"

    );


    if(!lastSync){

        return;

    }


    lastSync.textContent=

    "Last Sync : "

    +

    now.toLocaleString(

        "id-ID"

    );

}
