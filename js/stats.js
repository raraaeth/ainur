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

    container.innerHTML =

        createStatCard(

            "fa-solid fa-money-bill-trend-up",

            "Pemasukan Terbesar",

            stats.highestIncome
            ? formatCurrency(
                stats.highestIncome.amount
            )
            : "-",

            stats.highestIncome
            ? stats.highestIncome.category
            : ""

        )

        +

        createStatCard(

            "fa-solid fa-money-bill-transfer",

            "Pengeluaran Terbesar",

            stats.highestExpense
            ? formatCurrency(
                stats.highestExpense.amount
            )
            : "-",

            stats.highestExpense
            ? stats.highestExpense.category
            : ""

        )

        +

        createStatCard(

            "fa-solid fa-chart-column",

            "Total Transaksi",

            Finance.table.length,

            "Semua transaksi"

        )

        +

        createStatCard(

            "fa-solid fa-piggy-bank",

            "Saving Rate",

            summary.savingRate
            .toFixed(1)+"%",

            "Dari total pemasukan"

        )

        +

        createStatCard(

            "fa-solid fa-arrow-trend-up",

            "Rata-rata Pemasukan",

            formatCurrency(
                incomeAvg
            ),

            "Per kategori"

        )

        +

        createStatCard(

            "fa-solid fa-arrow-trend-down",

            "Rata-rata Pengeluaran",

            formatCurrency(
                expenseAvg
            ),

            "Per kategori"

        )

        +

        createStatCard(

            "fa-solid fa-trophy",

            "Kategori Pemasukan",

            topIncome.name,

            formatCurrency(
                topIncome.amount
            )

        )

        +

        createStatCard(

            "fa-solid fa-fire",

            "Kategori Pengeluaran",

            topExpense.name,

            formatCurrency(
                topExpense.amount
            )

        );

       }


