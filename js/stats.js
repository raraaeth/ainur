/* =====================================================
   Finance Dashboard v1.0
   File : stats.js
===================================================== */

/* ===========================
   UPDATE STATISTICS
=========================== */

function updateStatistics(){

    const container =
    document.getElementById(
        "statisticsContainer"
    );

    if(!container) return;

    const stats =
    Finance.statistics;

    const incomeAvg =

        Finance.summary.income /

        Math.max(
            1,
            Object.keys(
                stats.incomeByCategory
            ).length
        );

    const expenseAvg =

        Finance.summary.expense /

        Math.max(
            1,
            Object.keys(
                stats.expenseByCategory
            ).length
        );

    container.innerHTML = "";

}
