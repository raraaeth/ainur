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

    console.log(

        APP.NAME,

        APP.VERSION

    );

    await fetchTransactions();

    console.table(transactions);

}
