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

await fetchTransactions();  

await fetchPlanner();  
   
/* ===========================
   WALLET
=========================== */

await fetchWalletList();



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
 
updateLastSync();

}
