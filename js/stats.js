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
    stats.monthlyIncome /
    Math.max(
        1,
        Object.keys(
            stats.incomeByCategory
        ).length
    );

    const expenseAvg =
    stats.monthlyExpense /
    Math.max(
        1,
        Object.keys(
            stats.expenseByCategory
        ).length
    );

    const incomePercent =
    stats.monthlyIncome===0
    ?0
    :(topIncome.amount/
    stats.monthlyIncome)*100;

    const expensePercent =
    stats.monthlyExpense===0
    ?0
    :(topExpense.amount/
    stats.monthlyExpense)*100;

    const savingRate =
    stats.monthlyIncome===0
    ?0
    :(stats.monthlyExpense/
    stats.monthlyIncome)*100;

    container.innerHTML = `

<div class="stats-box">

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
            Total Kategori
        </span>

        <strong>${
            Object.keys(stats.incomeByCategory).length +
            Object.keys(stats.expenseByCategory).length
        }</strong>
    </div>

    <div class="stats-row">
        <span>
            <i class="fa-solid fa-piggy-bank icon-warning"></i>
            Saving Rate
        </span>

        <strong>${savingRate.toFixed(1)}%</strong>
    </div>

</div>

`;

}
                
