/* =====================================================
   Life Dashboard v4.0
   File : insight.js

   SMART FINANCE INSIGHT

   Insight Category:

   Expense:
   - Rokok
   - Kopi
   - Lain-lain
   - Belanja
   - Jajan

   Income:
   - Ceperan

   Ignored:
   - Gaji
   - Airdrop
   - Jatah istri
   - Tabungan
   - Other categories
===================================================== */


/* =====================================================
   INSIGHT SETTINGS
===================================================== */

const INSIGHT_RULES = {

    cigarette:{

        category:"rokok",

        normalWeeklyMin:2,

        normalWeeklyMax:3,

        normalGapMin:2

    },

    coffee:{

        category:"kopi",

        normalDailyMax:2,

        normalWeeklyMax:14

    }

};


/* =====================================================
   PROCESS ALL INSIGHT
===================================================== */

function processInsight(){

    Finance.insight = [];

    processFinanceInsight();


    /* =========================
       CRYPTO INSIGHT
    ========================= */

    if(

        typeof processCryptoInsight
        === "function"

    ){

        processCryptoInsight();

    }

}


/* =====================================================
   PROCESS FINANCE INSIGHT
===================================================== */

function processFinanceInsight(){

    const transactions =

    getInsightTransactions();


    if(!transactions.length){

        return;

    }


    const periods =

    createInsightPeriods();


    /* =========================
       ROKOK
    ========================= */

    processCigaretteInsight(

        transactions,

        periods

    );


    /* =========================
       KOPI
    ========================= */

    processCoffeeInsight(

        transactions,

        periods

    );


    /* =========================
       CEPERAN
    ========================= */

    processSideIncomeInsight(

        transactions,

        periods

    );


    /* =========================
       UNEXPECTED EXPENSE
    ========================= */

    processUnexpectedInsight(

        transactions,

        periods

    );


    /* =========================
       BELANJA
    ========================= */

    processMonthlyCategoryInsight({

        transactions,

        periods,

        category:"belanja",

        icon:"🛍️",

        label:"belanja"

    });


    /* =========================
       JAJAN
    ========================= */

    processMonthlyCategoryInsight({

        transactions,

        periods,

        category:"jajan",

        icon:"🍭",

        label:"jajan"

    });

}


/* =====================================================
   GET FINANCE DATA
===================================================== */

function getInsightTransactions(){

    if(

        !Finance ||

        !Array.isArray(
            Finance.data
        )

    ){

        return [];

    }


    return Finance.data

    .map(item => {

        return {

            date:

            normalizeInsightDate(

                item.date ??

                item.Tanggal

            ),


            type:

            normalizeInsightText(

                item.type ??

                item.Jenis

            ),


            category:

            normalizeInsightText(

                item.category ??

                item.Kategori

            ),


            description:

            String(

                item.description ??

                item.Keterangan ??

                ""

            ).trim(),


            amount:

            normalizeInsightAmount(

                item.amount ??

                item.Nominal

            )

        };

    })

    .filter(item => {

        return(

            item.date &&

            !Number.isNaN(

                item.date.getTime()

            )

        );

    });

}


/* =====================================================
   NORMALIZE DATE
===================================================== */

function normalizeInsightDate(value){

    if(

        value instanceof Date

    ){

        return new Date(

            value.getFullYear(),

            value.getMonth(),

            value.getDate()

        );

    }


    if(!value){

        return null;

    }


    const text =

    String(value).trim();


    /* =========================
       YYYY-MM-DD
    ========================= */

    const isoMatch =

    text.match(

        /^(\d{4})-(\d{2})-(\d{2})/

    );


    if(isoMatch){

        return new Date(

            Number(isoMatch[1]),

            Number(isoMatch[2]) - 1,

            Number(isoMatch[3])

        );

    }


    /* =========================
       DD/MM/YYYY
    ========================= */

    const localMatch =

    text.match(

        /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/

    );


    if(localMatch){

        return new Date(

            Number(localMatch[3]),

            Number(localMatch[2]) - 1,

            Number(localMatch[1])

        );

    }


    const date =

    new Date(value);


    if(

        Number.isNaN(

            date.getTime()

        )

    ){

        return null;

    }


    return new Date(

        date.getFullYear(),

        date.getMonth(),

        date.getDate()

    );

}


/* =====================================================
   NORMALIZE TEXT
===================================================== */

function normalizeInsightText(value){

    return String(

        value ?? ""

    )

    .trim()

    .toLowerCase();

}


/* =====================================================
   NORMALIZE AMOUNT
===================================================== */

function normalizeInsightAmount(value){

    if(

        typeof value === "number"

    ){

        return value;

    }


    const amount =

    Number(

        String(

            value ?? 0

        )

        .replace(

            /[^0-9.-]/g,

            ""

        )

    );


    return Number.isFinite(amount)

    ? amount

    : 0;

}


/* =====================================================
   CREATE COMPARISON PERIODS
===================================================== */

function createInsightPeriods(){

    const today =

    startInsightDay(

        new Date()

    );


    /* =========================
       CURRENT WEEK
       MONDAY → TODAY
    ========================= */

    const currentWeekStart =

    getInsightMonday(today);


    const currentWeekEnd =

    today;


    /* =========================
       PREVIOUS EQUAL WEEK
    ========================= */

    const previousWeekStart =

    addInsightDays(

        currentWeekStart,

        -7

    );


    const currentWeekDayIndex =

    getInsightDayDifference(

        currentWeekStart,

        currentWeekEnd

    );


    const previousWeekEnd =

    addInsightDays(

        previousWeekStart,

        currentWeekDayIndex

    );


    /* =========================
       CURRENT MONTH
       DAY 1 → TODAY
    ========================= */

    const currentMonthStart =

    new Date(

        today.getFullYear(),

        today.getMonth(),

        1

    );


    const currentMonthEnd =

    today;


    /* =========================
       PREVIOUS EQUAL MONTH
    ========================= */

    const previousMonthStart =

    new Date(

        today.getFullYear(),

        today.getMonth() - 1,

        1

    );


    const previousMonthLastDay =

    new Date(

        today.getFullYear(),

        today.getMonth(),

        0

    ).getDate();


    const comparisonDay =

    Math.min(

        today.getDate(),

        previousMonthLastDay

    );


    const previousMonthEnd =

    new Date(

        previousMonthStart
        .getFullYear(),

        previousMonthStart
        .getMonth(),

        comparisonDay

    );


    return {

        today,

        currentWeek:{

            start:currentWeekStart,

            end:currentWeekEnd

        },

        previousWeek:{

            start:previousWeekStart,

            end:previousWeekEnd

        },

        currentMonth:{

            start:currentMonthStart,

            end:currentMonthEnd

        },

        previousMonth:{

            start:previousMonthStart,

            end:previousMonthEnd

        }

    };

}


/* =====================================================
   DATE HELPERS
===================================================== */

function startInsightDay(date){

    return new Date(

        date.getFullYear(),

        date.getMonth(),

        date.getDate()

    );

}


function getInsightMonday(date){

    const result =

    startInsightDay(date);


    const day =

    result.getDay();


    const difference =

    day === 0

    ? -6

    : 1 - day;


    result.setDate(

        result.getDate()

        + difference

    );


    return result;

}


function addInsightDays(

    date,

    amount

){

    const result =

    startInsightDay(date);


    result.setDate(

        result.getDate()

        + amount

    );


    return result;

}


function getInsightDayDifference(

    start,

    end

){

    const oneDay =

    1000 * 60 * 60 * 24;


    return Math.round(

        (

            startInsightDay(end)

            -

            startInsightDay(start)

        )

        /

        oneDay

    );

}


function isInsightDateInPeriod(

    date,

    period

){

    return(

        date >= period.start &&

        date <= period.end

    );

}


/* =====================================================
   FILTER TRANSACTIONS
===================================================== */

function getInsightCategoryData({

    transactions,

    category,

    type,

    period

}){

    return transactions

    .filter(item => {

        return(

            item.category

            ===

            normalizeInsightText(

                category

            )

            &&

            item.type

            ===

            normalizeInsightText(

                type

            )

            &&

            isInsightDateInPeriod(

                item.date,

                period

            )

        );

    });

}


/* =====================================================
   TRANSACTION SUMMARY
===================================================== */

function summarizeInsightData(data){

    return {

        total:

        data.reduce(

            (

                total,

                item

            ) => {

                return(

                    total

                    +

                    item.amount

                );

            },

            0

        ),


        frequency:

        data.length

    };

}


/* =====================================================
   PERCENTAGE
===================================================== */

function calculateInsightPercentage(

    current,

    previous

){

    if(previous === 0){

        return null;

    }


    return(

        (

            current

            -

            previous

        )

        /

        previous

    )

    *

    100;

}


/* =====================================================
   FORMAT
===================================================== */

function formatInsightMoney(value){

    return new Intl

    .NumberFormat(

        "id-ID",

        {

            style:"currency",

            currency:"IDR",

            maximumFractionDigits:0

        }

    )

    .format(value);

}


function formatInsightPercent(value){

    return Math.abs(value)

    .toFixed(1)

    .replace(

        ".0",

        ""

    );

}


/* =====================================================
   ADD INSIGHT
===================================================== */

function addFinanceInsight(

    icon,

    text

){

    Finance.insight.push({

        icon,

        text

    });

}


/* =====================================================
   EXPENSE COMPARISON
===================================================== */

function createExpenseComparisonInsight({

    icon,

    label,

    periodLabel,

    current,

    previous

}){

    if(

        current === 0 &&

        previous === 0

    ){

        return;

    }


    if(

        current > 0 &&

        previous === 0

    ){

        addFinanceInsight(

            icon,

            `Pengeluaran ${label} ${periodLabel} tercatat ${formatInsightMoney(current)}. Belum ada pengeluaran ${label} pada periode pembanding.`

        );

        return;

    }


    if(

        current === 0 &&

        previous > 0

    ){

        addFinanceInsight(

            icon,

            `Hebat, belum ada pengeluaran ${label} ${periodLabel}. Pada periode sebelumnya pengeluaranmu mencapai ${formatInsightMoney(previous)}.`

        );

        return;

    }


    const percentage =

    calculateInsightPercentage(

        current,

        previous

    );


    if(percentage > 0){

        addFinanceInsight(

            icon,

            `Hati-hati, pengeluaran ${label} ${periodLabel} naik ${formatInsightPercent(percentage)}% menjadi ${formatInsightMoney(current)}, dari sebelumnya ${formatInsightMoney(previous)}.`

        );

        return;

    }


    if(percentage < 0){

        addFinanceInsight(

            icon,

            `Bagus, pengeluaran ${label} ${periodLabel} turun ${formatInsightPercent(percentage)}% menjadi ${formatInsightMoney(current)}, dari sebelumnya ${formatInsightMoney(previous)}.`

        );

        return;

    }


    addFinanceInsight(

        icon,

        `Pengeluaran ${label} ${periodLabel} tetap stabil sebesar ${formatInsightMoney(current)}.`

    );

}


/* =====================================================
   ROKOK INSIGHT
===================================================== */

function processCigaretteInsight(

    transactions,

    periods

){

    const currentWeekData =

    getInsightCategoryData({

        transactions,

        category:"rokok",

        type:"keluar",

        period:

        periods.currentWeek

    });


    const previousWeekData =

    getInsightCategoryData({

        transactions,

        category:"rokok",

        type:"keluar",

        period:

        periods.previousWeek

    });


    const currentMonthData =

    getInsightCategoryData({

        transactions,

        category:"rokok",

        type:"keluar",

        period:

        periods.currentMonth

    });


    const previousMonthData =

    getInsightCategoryData({

        transactions,

        category:"rokok",

        type:"keluar",

        period:

        periods.previousMonth

    });


    const currentWeek =

    summarizeInsightData(

        currentWeekData

    );


    const previousWeek =

    summarizeInsightData(

        previousWeekData

    );


    const currentMonth =

    summarizeInsightData(

        currentMonthData

    );


    const previousMonth =

    summarizeInsightData(

        previousMonthData

    );


    /* =========================
       WEEKLY NOMINAL
    ========================= */

    createExpenseComparisonInsight({

        icon:"🚬",

        label:"rokok",

        periodLabel:"minggu ini",

        current:

        currentWeek.total,

        previous:

        previousWeek.total

    });


    /* =========================
       MONTHLY NOMINAL
    ========================= */

    createExpenseComparisonInsight({

        icon:"🚬",

        label:"rokok",

        periodLabel:"bulan ini",

        current:

        currentMonth.total,

        previous:

        previousMonth.total

    });


    /* =========================
       WEEKLY FREQUENCY
    ========================= */

    processCigaretteFrequency({

        currentData:

        currentWeekData,

        previousData:

        previousWeekData

    });

}


/* =====================================================
   ROKOK FREQUENCY
===================================================== */

function processCigaretteFrequency({

    currentData,

    previousData

}){

    const current =

    currentData.length;


    const previous =

    previousData.length;


    if(

        current === 0 &&

        previous === 0

    ){

        return;

    }


    if(

        current < previous

    ){

        addFinanceInsight(

            "🌿",

            `Hebat, frekuensi membeli rokok berkurang dari ${previous} kali menjadi ${current} kali minggu ini. Satu bungkus tampaknya bertahan lebih lama.`

        );

    }

    else if(

        current > previous

    ){

        if(

            current >

            INSIGHT_RULES
            .cigarette
            .normalWeeklyMax

        ){

            addFinanceInsight(

                "⚠️",

                `Frekuensi membeli rokok meningkat dari ${previous} kali menjadi ${current} kali minggu ini. Angka ini lebih tinggi dari kebiasaan normal 2–3 kali per minggu.`

            );

        }

        else{

            addFinanceInsight(

                "🚬",

                `Frekuensi membeli rokok meningkat dari ${previous} kali menjadi ${current} kali minggu ini, tetapi masih berada dalam kebiasaan normal 2–3 kali per minggu.`

            );

        }

    }

    else{

        if(

            current >=

            INSIGHT_RULES
            .cigarette
            .normalWeeklyMin

            &&

            current <=

            INSIGHT_RULES
            .cigarette
            .normalWeeklyMax

        ){

            addFinanceInsight(

                "🚬",

                `Frekuensi membeli rokok masih dalam kebiasaan normalmu, yaitu ${current} kali minggu ini.`

            );

        }

        else if(

            current >

            INSIGHT_RULES
            .cigarette
            .normalWeeklyMax

        ){

            addFinanceInsight(

                "⚠️",

                `Frekuensi membeli rokok tetap tinggi, yaitu ${current} kali minggu ini. Kebiasaan normalmu sekitar 2–3 kali per minggu.`

            );

        }

    }


    /* =========================
       SHORTEST PURCHASE GAP
    ========================= */

    const shortestGap =

    getShortestPurchaseGap(

        currentData

    );


    if(

        shortestGap !== null

        &&

        shortestGap <

        INSIGHT_RULES
        .cigarette
        .normalGapMin

    ){

        addFinanceInsight(

            "🚬",

            `Jarak pembelian rokok terpendek minggu ini hanya ${shortestGap} hari. Biasanya satu bungkus dapat bertahan sekitar 2–3 hari.`

        );

    }

}


/* =====================================================
   SHORTEST PURCHASE GAP
===================================================== */

function getShortestPurchaseGap(data){

    const uniqueDates =

    [

        ...new Set(

            data

            .map(item => {

                return(

                    item.date
                    .getTime()

                );

            })

        )

    ]

    .sort(

        (

            a,

            b

        ) => a - b

    );


    if(

        uniqueDates.length < 2

    ){

        return null;

    }


    let shortest =

    Infinity;


    for(

        let i = 1;

        i < uniqueDates.length;

        i++

    ){

        const difference =

        Math.round(

            (

                uniqueDates[i]

                -

                uniqueDates[i - 1]

            )

            /

            (

                1000

                *

                60

                *

                60

                *

                24

            )

        );


        shortest =

        Math.min(

            shortest,

            difference

        );

    }


    return shortest;

}


/* =====================================================
   KOPI INSIGHT
===================================================== */

function processCoffeeInsight(

    transactions,

    periods

){

    const currentWeekData =

    getInsightCategoryData({

        transactions,

        category:"kopi",

        type:"keluar",

        period:

        periods.currentWeek

    });


    const previousWeekData =

    getInsightCategoryData({

        transactions,

        category:"kopi",

        type:"keluar",

        period:

        periods.previousWeek

    });


    const currentMonthData =

    getInsightCategoryData({

        transactions,

        category:"kopi",

        type:"keluar",

        period:

        periods.currentMonth

    });


    const previousMonthData =

    getInsightCategoryData({

        transactions,

        category:"kopi",

        type:"keluar",

        period:

        periods.previousMonth

    });


    const currentWeek =

    summarizeInsightData(

        currentWeekData

    );


    const previousWeek =

    summarizeInsightData(

        previousWeekData

    );


    const currentMonth =

    summarizeInsightData(

        currentMonthData

    );


    const previousMonth =

    summarizeInsightData(

        previousMonthData

    );


    /* =========================
       WEEKLY NOMINAL
    ========================= */

    createExpenseComparisonInsight({

        icon:"☕",

        label:"kopi",

        periodLabel:"minggu ini",

        current:

        currentWeek.total,

        previous:

        previousWeek.total

    });


    /* =========================
       MONTHLY NOMINAL
    ========================= */

    createExpenseComparisonInsight({

        icon:"☕",

        label:"kopi",

        periodLabel:"bulan ini",

        current:

        currentMonth.total,

        previous:

        previousMonth.total

    });


    /* =========================
       WEEKLY FREQUENCY
    ========================= */

    processCoffeeFrequency({

        currentData:

        currentWeekData,

        previousData:

        previousWeekData

    });

}


/* =====================================================
   KOPI FREQUENCY
===================================================== */

function processCoffeeFrequency({

    currentData,

    previousData

}){

    const current =

    currentData.length;


    const previous =

    previousData.length;


    if(

        current === 0 &&

        previous === 0

    ){

        return;

    }


    if(

        current < previous

    ){

        addFinanceInsight(

            "☕",

            `Hebat, frekuensi membeli kopi berkurang dari ${previous} kali menjadi ${current} kali minggu ini. Jangan berlebihan minum kopinya, ya.`

        );

    }

    else if(

        current > previous

    ){

        if(

            current >

            INSIGHT_RULES
            .coffee
            .normalWeeklyMax

        ){

            addFinanceInsight(

                "⚠️",

                `Frekuensi membeli kopi meningkat dari ${previous} kali menjadi ${current} kali minggu ini dan sudah melewati batas 14 kali per minggu.`

            );

        }

        else{

            addFinanceInsight(

                "☕",

                `Frekuensi membeli kopi meningkat dari ${previous} kali menjadi ${current} kali minggu ini, tetapi masih di bawah batas 14 kali per minggu.`

            );

        }

    }

    else{

        if(

            current <=

            INSIGHT_RULES
            .coffee
            .normalWeeklyMax

        ){

            addFinanceInsight(

                "☕",

                `Frekuensi membeli kopi tetap ${current} kali minggu ini dan masih berada di bawah batas 14 kali per minggu.`

            );

        }

        else{

            addFinanceInsight(

                "⚠️",

                `Frekuensi membeli kopi tetap tinggi, yaitu ${current} kali minggu ini. Coba kurangi agar tidak melebihi 2 kali per hari.`

            );

        }

    }


    /* =========================
       BUSIEST COFFEE DAY
    ========================= */

    const busiestDay =

    getBusiestPurchaseDay(

        currentData

    );


    if(

        busiestDay

        &&

        busiestDay.count >

        INSIGHT_RULES
        .coffee
        .normalDailyMax

    ){

        addFinanceInsight(

            "☕",

            `Hati-hati, kamu membeli kopi sampai ${busiestDay.count} kali pada hari ${busiestDay.day}. Batas kebiasaan harianmu adalah 2 kali.`

        );

    }

}


/* =====================================================
   BUSIEST PURCHASE DAY
===================================================== */

function getBusiestPurchaseDay(data){

    if(!data.length){

        return null;

    }


    const days = {};


    data.forEach(item => {

        const key =

        item.date

        .toISOString()

        .slice(

            0,

            10

        );


        if(!days[key]){

            days[key] = {

                date:item.date,

                count:0

            };

        }


        days[key].count++;

    });


    const result =

    Object.values(days)

    .sort(

        (

            a,

            b

        ) => {

            return(

                b.count

                -

                a.count

            );

        }

    )[0];


    return {

        count:

        result.count,


        day:

        result.date

        .toLocaleDateString(

            "id-ID",

            {

                weekday:"long"

            }

        )

    };

}


/* =====================================================
   CEPERAN INSIGHT
===================================================== */

function processSideIncomeInsight(

    transactions,

    periods

){

    const currentWeek =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"ceperan",

            type:"masuk",

            period:

            periods.currentWeek

        })

    );


    const previousWeek =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"ceperan",

            type:"masuk",

            period:

            periods.previousWeek

        })

    );


    const currentMonth =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"ceperan",

            type:"masuk",

            period:

            periods.currentMonth

        })

    );


    const previousMonth =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"ceperan",

            type:"masuk",

            period:

            periods.previousMonth

        })

    );


    createIncomeComparisonInsight({

        periodLabel:

        "minggu ini",

        current:

        currentWeek.total,

        previous:

        previousWeek.total

    });


    createIncomeComparisonInsight({

        periodLabel:

        "bulan ini",

        current:

        currentMonth.total,

        previous:

        previousMonth.total

    });

}


/* =====================================================
   CEPERAN COMPARISON
===================================================== */

function createIncomeComparisonInsight({

    periodLabel,

    current,

    previous

}){

    if(current === 0){

        return;

    }


    if(previous === 0){

        addFinanceInsight(

            "💵",

            `Ada tambahan ceperan sebesar ${formatInsightMoney(current)} ${periodLabel}. Lumayan untuk menambah pemasukan.`

        );

        return;

    }


    const percentage =

    calculateInsightPercentage(

        current,

        previous

    );


    if(percentage > 0){

        addFinanceInsight(

            "💵",

            `Ceperan ${periodLabel} meningkat ${formatInsightPercent(percentage)}% menjadi ${formatInsightMoney(current)}, dari sebelumnya ${formatInsightMoney(previous)}.`

        );

    }

    else if(

        percentage < 0

    ){

        addFinanceInsight(

            "💵",

            `Ceperan ${periodLabel} berkurang ${formatInsightPercent(percentage)}% menjadi ${formatInsightMoney(current)}, dari sebelumnya ${formatInsightMoney(previous)}.`

        );

    }

    else{

        addFinanceInsight(

            "💵",

            `Ceperan ${periodLabel} tetap stabil sebesar ${formatInsightMoney(current)}.`

        );

    }

}


/* =====================================================
   UNEXPECTED EXPENSE
===================================================== */

function processUnexpectedInsight(

    transactions,

    periods

){

    const currentWeek =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"lain-lain",

            type:"keluar",

            period:

            periods.currentWeek

        })

    );


    const currentMonth =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category:"lain-lain",

            type:"keluar",

            period:

            periods.currentMonth

        })

    );


    if(currentWeek.total > 0){

        addFinanceInsight(

            "⚠️",

            `Ada pengeluaran tak terduga sebesar ${formatInsightMoney(currentWeek.total)} dari ${currentWeek.frequency} transaksi minggu ini.`

        );

    }


    if(currentMonth.total > 0){

        addFinanceInsight(

            "🧾",

            `Total pengeluaran tak terduga bulan ini mencapai ${formatInsightMoney(currentMonth.total)} dari ${currentMonth.frequency} transaksi.`

        );

    }

}


/* =====================================================
   MONTHLY CATEGORY
===================================================== */

function processMonthlyCategoryInsight({

    transactions,

    periods,

    category,

    icon,

    label

}){

    const current =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category,

            type:"keluar",

            period:

            periods.currentMonth

        })

    );


    const previous =

    summarizeInsightData(

        getInsightCategoryData({

            transactions,

            category,

            type:"keluar",

            period:

            periods.previousMonth

        })

    );


    createExpenseComparisonInsight({

        icon,

        label,

        periodLabel:

        "bulan ini",

        current:

        current.total,

        previous:

        previous.total

    });

}


/* =====================================================
   CREATE INSIGHT HTML
===================================================== */

function createInsightItem(item){

    return `

    <div class="insight-item">

        <span class="insight-text">

            ${item.icon}

            ${item.text}

        </span>

    </div>

    `;

}


/* =====================================================
   UPDATE INSIGHT
===================================================== */

function updateInsight(){

    const container =

    document.getElementById(

        "insightContainer"

    );


    const dailyInsight =

    document.getElementById(

        "dailyInsight"

    );


    if(container){

        container.innerHTML =

        Finance.insight

        .map(

            createInsightItem

        )

        .join("");

    }


    if(dailyInsight){

        if(

            Finance.insight.length

            ===

            0

        ){

            dailyInsight.innerHTML =

            "💡 Belum ada insight keuangan untuk periode ini.";

        }

        else{

            const random =

            Math.floor(

                Math.random()

                *

                Finance.insight.length

            );


            const item =

            Finance.insight[random];


            dailyInsight.innerHTML =

            `${item.icon} ${item.text}`;

        }

    }

}
