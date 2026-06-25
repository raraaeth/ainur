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

            type : item.type,

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


/* ===========================
   CHART
=========================== */


/* ===========================
   STATISTICS
=========================== */
