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
            : "",

            "icon-success"

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
            : "",

            "icon-danger"

        )

        +

        createStatCard(

            "fa-solid fa-chart-column",

            "Total Transaksi",

            Finance.table.length,

            `${Object.keys(stats.incomeByCategory).length}
            kategori pemasukan`,

            "icon-primary"

        )

        +

        createStatCard(

            "fa-solid fa-piggy-bank",

            "Saving Rate",

            summary.savingRate.toFixed(1)+"%",

            "Persentase sisa dari pemasukan",

            "icon-warning"

        )

        +

        createStatCard(

            "fa-solid fa-arrow-trend-up",

            "Rata-rata Pemasukan",

            formatCurrency(
                incomeAvg
            ),

            "Per kategori",

            "icon-success"

        )

        +

        createStatCard(

            "fa-solid fa-arrow-trend-down",

            "Rata-rata Pengeluaran",

            formatCurrency(
                expenseAvg
            ),

            "Per kategori",

            "icon-danger"

        )

        +

        createStatCard(

            "fa-solid fa-trophy",

            "Top Kategori Pemasukan",

            topIncome.name,

            `${incomePercent.toFixed(1)}% dari pemasukan`,

            "icon-success"

        )

        +

        createStatCard(

            "fa-solid fa-fire",

            "Top Kategori Pengeluaran",

            topExpense.name,

            `${expensePercent.toFixed(1)}% dari pengeluaran`,

            "icon-warning"

        );

      }


        

