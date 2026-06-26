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

    const summary =
    Finance.summary;

    const incomeAvg =
    summary.income /
    Math.max(
        1,
        Object.keys(
            stats.incomeByCategory
        ).length
    );

    const expenseAvg =
    summary.expense /
    Math.max(
        1,
        Object.keys(
            stats.expenseByCategory
        ).length
    );

    container.innerHTML = `

    <div class="stats-card">

        <small>Total Transaksi</small>

        <h3>

            ${Finance.table.length}

        </h3>

    </div>

    <div class="stats-card">

        <small>Rata-rata Pemasukan</small>

        <h3>

            ${formatCurrency(incomeAvg)}

        </h3>

    </div>

    <div class="stats-card">

        <small>Rata-rata Pengeluaran</small>

        <h3>

            ${formatCurrency(expenseAvg)}

        </h3>

    </div>

    <div class="stats-card">

        <small>Saving Rate</small>

        <h3>

            ${summary.savingRate.toFixed(1)}%

        </h3>

    </div>

    `;

}
