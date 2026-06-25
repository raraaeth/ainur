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

            day : date.getDate(),

            month : date.getMonth()+1,

            year : date.getFullYear(),

            type : item.type
.trim()
.toLowerCase(),

            category : item.category
.trim()
.toLowerCase(),
            description : item.description,

            amount : Number(item.amount)||0

        };

    });

}

/* ===========================
   SUMMARY
=========================== */

function calculateSummary(){

    let income = 0;
    let expense = 0;

    let savingIncome = 0;
    let savingExpense = 0;

    Finance.data.forEach(item=>{

        if(item.type===TRANSACTION.INCOME){

            income += item.amount;

        }

        if(item.type===TRANSACTION.EXPENSE){

            expense += item.amount;

        }

        if(

            item.type===TRANSACTION.INCOME &&

            item.category===CATEGORY.SAVING

        ){

            savingIncome += item.amount;

        }

        if(

            item.type===TRANSACTION.EXPENSE &&

            item.category===CATEGORY.SAVING

        ){

            savingExpense += item.amount;

        }

    });

    Finance.summary = {

        income,

        expense,

        balance :

        income-expense,

        savingRate :

        income===0

        ?0

        :((income-expense)/income)*100,

        savingIncome,

        savingExpense,

        savingDifference :

        savingIncome-savingExpense

    };

}

/* ===========================
   CATEGORY
=========================== */
function calculateCategory(){

    const income = {};

    const expense = {};

    Finance.data.forEach(item=>{

        if(item.type===TRANSACTION.INCOME){

            income[item.category] =

            (income[item.category]||0)

            + item.amount;

        }

        else{

            if(

                item.category!==CATEGORY.WIFE

            ){

                expense[item.category] =

                (expense[item.category]||0)

                + item.amount;

            }

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

    const monthly = {};

    Finance.data.forEach(item=>{

        const key = `${item.year}-${item.month}`;

        if(!monthly[key]){

            monthly[key]={

                income:0,

                expense:0

            };

        }

        if(item.type===TRANSACTION.INCOME){

            monthly[key].income+=item.amount;

        }

        else{

            monthly[key].expense+=item.amount;

        }

    });

    const result=

    Object.entries(monthly)

    .sort()

    .slice(-3);

    Finance.chart={

        labels:result.map(

            ([key])=>key

        ),

        income:result.map(

            ([,value])=>value.income

        ),

        expense:result.map(

            ([,value])=>value.expense

        )

    };

       }

/* ===========================
   TABLE
=========================== */
function prepareTable(){

    Finance.table=[

        ...Finance.data

    ].sort(

        (a,b)=>

        b.date-a.date

    );

}


/* ===========================
   STATISTICS
=========================== */

function calculateStatistics(){

    const stats={

        highestExpense:null,

        highestIncome:null,

        expenseByCategory:{},

        incomeByCategory:{}

    };

    Finance.data.forEach(item=>{

        if(item.type===TRANSACTION.EXPENSE){

            if(

                item.category!==CATEGORY.WIFE

            ){

                stats.expenseByCategory[item.category]=

                (stats.expenseByCategory[item.category]||0)

                +item.amount;

            }

            if(

                !stats.highestExpense ||

                item.amount>

                stats.highestExpense.amount

            ){

                stats.highestExpense=item;

            }

        }

        if(item.type===TRANSACTION.INCOME){

            stats.incomeByCategory[item.category]=

            (stats.incomeByCategory[item.category]||0)

            +item.amount;

            if(

                !stats.highestIncome ||

                item.amount>

                stats.highestIncome.amount

            ){

                stats.highestIncome=item;

            }

        }

    });

    Finance.statistics=stats;

}

/* ===========================
   INSIGHT
=========================== */
function generateInsight(){

    const summary=

    Finance.summary;

    const insight=[];

    if(summary.balance>0){

        insight.push(

            "Cashflow bulan ini masih positif."

        );

    }

    else{

        insight.push(

            "Pengeluaran lebih besar daripada pemasukan."

        );

    }

    if(summary.savingRate>=30){

        insight.push(

            "Saving rate sangat baik."

        );

    }

    else if(summary.savingRate>=15){

        insight.push(

            "Saving rate cukup baik."

        );

    }

    else{

        insight.push(

            "Saving rate masih rendah."

        );

    }

    Finance.insight=insight;

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

