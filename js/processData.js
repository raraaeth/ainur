/* =====================================================
   Finance Dashboard v1.0
   File : processData.js
===================================================== */


/* ===========================
   NORMALIZE
=========================== */

function normalizeTransactions(){

    Finance.data = Finance.raw.map(item=>{

        const date = new Date(item.date);

        return{

            date,

            day:date.getDate(),

            month:date.getMonth()+1,

            year:date.getFullYear(),

            type:

            item.type
            .trim()
            .toLowerCase(),

            category:

            item.category
            .trim()
            .toLowerCase(),

            description:

            item.description
            ? item.description.trim()
            : "",

            amount:

            Number(item.amount)||0

        };

    });

}


/* ===========================
   SUMMARY
=========================== */

function calculateSummary(){

    let income = 0;

    let expense = 0;


    /* =====================
       TABUNGAN SEABANK
    ===================== */

    let savingDeposit = 0;

    let savingWithdraw = 0;


    Finance.data.forEach(item=>{


        /* =====================
           INCOME
        ===================== */

        if(

            item.type===

            TRANSACTION.INCOME

        ){

            income +=

            item.amount;

        }


        /* =====================
           EXPENSE
        ===================== */

        if(

            item.type===

            TRANSACTION.EXPENSE

        ){

            expense +=

            item.amount;

        }


        /* =====================
           TABUNGAN SEABANK
        ===================== */

        if(

            item.category===

            CATEGORY.SAVING

        ){

            const description =

            item.description

            .toLowerCase()

            .trim();


            /* =================
               DEPOSIT

               Menambah saldo
            ================= */

            if(

                description.includes(

                    "deposit ke seabank"

                )

            ){

                savingDeposit +=

                item.amount;

            }


            /* =================
               PENARIKAN

               Mengurangi saldo
            ================= */

            if(

                description.includes(

                    "tarik dari seabank"

                )

            ){

                savingWithdraw +=

                item.amount;

            }

        }

    });


    /* =====================
       FINANCE BALANCE
    ===================== */

    const balance =

    income -

    expense;


    /* =====================
       SEABANK BALANCE
    ===================== */

    const savingBalance =

    savingDeposit -

    savingWithdraw;


    /* =====================
       FINANCE SUMMARY
    ===================== */

    Finance.summary={

        income,

        expense,

        balance,


        /* =================
           SAVING RATE

           Tetap memakai
           total dana yang
           disimpan
        ================= */

        savingRate:

        income===0

        ? 0

        :

        (

            savingDeposit /

            income

        ) * 100,


        /* =================
           TABUNGAN SEABANK
        ================= */

        savingDeposit,

        savingWithdraw,

        savingBalance

    };

}


/* ===========================
   CATEGORY
=========================== */

function calculateCategory(){

    const income={};

    const expense={};


    Finance.data.forEach(item=>{


        /* =====================
           INCOME
        ===================== */

        if(

            item.type===

            TRANSACTION.INCOME

        ){

            income[

                item.category

            ]=

            (

                income[

                    item.category

                ]||0

            )

            +

            item.amount;

        }


        /* =====================
           EXPENSE
        ===================== */

        if(

            item.type===

            TRANSACTION.EXPENSE

            &&

            !EXCLUDED_EXPENSE

            .includes(

                item.category

            )

        ){

            expense[

                item.category

            ]=

            (

                expense[

                    item.category

                ]||0

            )

            +

            item.amount;

        }

    });


    Finance.category={

        income,

        expense

    };

}


/* ===========================
   CHART
=========================== */

function calculateChart(){

    const monthly={};


    Finance.data.forEach(item=>{

        const key=

        `${item.year}-${item.month}`;


        if(!monthly[key]){

            monthly[key]={

                year:

                item.year,

                month:

                item.month,

                income:0,

                expense:0

            };

        }


        /* =====================
           INCOME
        ===================== */

        if(

            item.type===

            TRANSACTION.INCOME

        ){

            monthly[key]

            .income +=

            item.amount;

        }


        /* =====================
           EXPENSE
        ===================== */

        if(

            item.type===

            TRANSACTION.EXPENSE

        ){

            monthly[key]

            .expense +=

            item.amount;

        }

    });


    const result=

    Object

    .values(monthly)

    .sort((a,b)=>{

        if(

            a.year!==b.year

        ){

            return(

                a.year-b.year

            );

        }

        return(

            a.month-b.month

        );

    })

    .slice(-3);


    Finance.charts={

        labels:

        result.map(

            item=>

            MONTH_SHORT[

                item.month-1

            ]

        ),


        income:

        result.map(

            item=>

            item.income

        ),


        expense:

        result.map(

            item=>

            item.expense

        )

    };

}


/* ===========================
   TABLE
=========================== */

function prepareTable(){

    Finance.table=[

        ...Finance.data

    ]

    .sort(

        (a,b)=>

        b.date-a.date

    );

}


/* ===========================
   STATISTICS BULANAN
=========================== */

function calculateStatistics(){

    const today=

    new Date();


    const currentMonth=

    today.getMonth()+1;


    const currentYear=

    today.getFullYear();


    const stats={

        highestExpense:null,

        highestIncome:null,

        expenseByCategory:{},

        incomeByCategory:{},

        monthlyIncome:0,

        monthlyExpense:0,

        monthlyBalance:0

    };


    const currentData=

    Finance.data

    .filter(item=>

        item.month===

        currentMonth

        &&

        item.year===

        currentYear

    );


    currentData

    .forEach(item=>{


        /* =====================
           MONTHLY CASHFLOW
        ===================== */

        if(

            item.type===

            TRANSACTION.INCOME

        ){

            stats

            .monthlyIncome +=

            item.amount;

        }


        if(

            item.type===

            TRANSACTION.EXPENSE

        ){

            stats

            .monthlyExpense +=

            item.amount;

        }


        /* =====================
           EXPENSE
        ===================== */

        if(

            item.type===

            TRANSACTION.EXPENSE

            &&

            !EXCLUDED_EXPENSE

            .includes(

                item.category

            )

        ){

            stats

            .expenseByCategory[

                item.category

            ]=

            (

                stats

                .expenseByCategory[

                    item.category

                ]

                ||0

            )

            +

            item.amount;


            if(

                !stats

                .highestExpense

                ||

                item.amount

                >

                stats

                .highestExpense

                .amount

            ){

                stats

                .highestExpense=

                item;

            }

        }


        /* =====================
           INCOME
        ===================== */

        if(

            item.type===

            TRANSACTION.INCOME

        ){

            stats

            .incomeByCategory[

                item.category

            ]=

            (

                stats

                .incomeByCategory[

                    item.category

                ]

                ||0

            )

            +

            item.amount;


            if(

                !stats

                .highestIncome

                ||

                item.amount

                >

                stats

                .highestIncome

                .amount

            ){

                stats

                .highestIncome=

                item;

            }

        }

    });


    stats.monthlyBalance=

    stats.monthlyIncome

    -

    stats.monthlyExpense;


    Finance.statistics=

    stats;


    console.log(

        "Monthly Statistics",

        Finance.statistics

    );

}


/* ===========================
   INSIGHT
=========================== */

function generateInsight(){

    const summary=

    Finance.summary;


    const stats=

    Finance.statistics;


    const insight=[];


    /* =====================
       CASHFLOW
    ===================== */

    if(

        summary.balance>0

    ){

        insight.push({

            icon:"📈",

            text:

            "Cashflow bulan ini masih positif."

        });

    }

    else{

        insight.push({

            icon:"⚠️",

            text:

            "Cashflow bulan ini negatif."

        });

    }


    /* =====================
       SAVING RATE
    ===================== */

    if(

        summary.savingRate>=20

    ){

        insight.push({

            icon:"🏦",

            text:

            `Saving Rate ${summary.savingRate.toFixed(1)}%. Sangat baik, pertahankan!`

        });

    }

    else{

        insight.push({

            icon:"💰",

            text:

            `Saving Rate ${summary.savingRate.toFixed(1)}%. Coba tingkatkan hingga minimal 20%.`

        });

    }


    /* =====================
       TOP EXPENSE
    ===================== */

    if(

        stats.highestExpense

    ){

        insight.push({

            icon:"💸",

            text:

            `Pengeluaran operasional terbesar berasal dari kategori "${stats.highestExpense.category}".`

        });

    }


    /* =====================
       TOP INCOME
    ===================== */

    if(

        stats.highestIncome

    ){

        insight.push({

            icon:"💵",

            text:

            `Sumber pemasukan terbesar berasal dari "${stats.highestIncome.category}".`

        });

    }


    Finance.insight=

    insight;

}


/* ===========================
   ALL FUNCTION
=========================== */

function processFinanceData(){

    normalizeTransactions();

    calculateSummary();

    calculateCategory();

    calculateChart();

    prepareTable();

    calculateStatistics();

    generateInsight();

}
