/* =====================================================
   Finance Dashboard v1.0
   File : stats.js
===================================================== */

/* ===========================
   TOP CATEGORY
=========================== */

function getTopCategory(data){

    const entries =
    Object.entries(data);

    if(entries.length===0){

        return{

            name:"-",

            amount:0

        };

    }

    entries.sort(

        (a,b)=>b[1]-a[1]

    );

    return{

        name:entries[0][0],

        amount:entries[0][1]

    };

}

/* ===========================
   CREATE CARD
=========================== */

function createStatCard(

    icon,

    title,

    value,

    subtitle="",

    color=""

){

    return `

    <div class="stat-card">

        <div class="stat-header">

            <small>

                ${title}

            </small>

            <i class="${icon} ${color}"></i>

        </div>

        <h3>

            ${value}

        </h3>

        <p>

            ${subtitle}

        </p>

    </div>

    `;

}

/* ===========================
   UPDATE STATISTICS
=========================== */

function updateStatistics(){

    const container =
    document.getElementById(
        "statisticsContainer"
    );

    if(!container) return;

    const summary =
    Finance.summary;

    const stats =
    Finance.statistics;

    const topIncome =
    getTopCategory(
        stats.incomeByCategory
    );

    const topExpense =
    getTopCategory(
        stats.expenseByCategory
    );

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

    const incomePercent =
    summary.income===0
    ?0
    :(topIncome.amount/summary.income)*100;

    const expensePercent =
    summary.expense===0
    ?0
    :(topExpense.amount/summary.expense)*100;

    container.innerHTML = `
<div class="stats-box">

    <div class="stats-header">
        <i class="fa-solid fa-chart-simple"></i>
        <span>Ringkasan Statistik</span>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-money-bill-trend-up icon-success"></i>
            Pemasukan Terbesar
        </span>

        <div class="stats-value">
            <strong>${
                stats.highestIncome
                ? formatCurrency(stats.highestIncome.amount)
                : "-"
            }</strong>

            <small>${
                stats.highestIncome
                ? stats.highestIncome.category
                : "-"
            }</small>
        </div>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-money-bill-transfer icon-danger"></i>
            Pengeluaran Terbesar
        </span>

        <div class="stats-value">
            <strong>${
                stats.highestExpense
                ? formatCurrency(stats.highestExpense.amount)
                : "-"
            }</strong>

            <small>${
                stats.highestExpense
                ? stats.highestExpense.category
                : "-"
            }</small>
        </div>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-arrow-trend-up icon-success"></i>
            Rata-rata Pemasukan
        </span>

        <strong>${formatCurrency(incomeAvg)}</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-arrow-trend-down icon-danger"></i>
            Rata-rata Pengeluaran
        </span>

        <strong>${formatCurrency(expenseAvg)}</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-trophy icon-success"></i>
            Top Pemasukan
        </span>

        <strong>${topIncome.name} (${incomePercent.toFixed(1)}%)</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-fire icon-warning"></i>
            Top Pengeluaran
        </span>

        <strong>${topExpense.name} (${expensePercent.toFixed(1)}%)</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-chart-column icon-primary"></i>
            Total Transaksi
        </span>

        <strong>${Finance.table.length}</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-piggy-bank icon-warning"></i>
            Saving Rate
        </span>

        <strong>${summary.savingRate.toFixed(1)}%</strong>
    </div>

</div>
`;
        
}
