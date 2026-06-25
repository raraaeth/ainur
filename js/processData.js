/* =====================================================
   Finance Dashboard v1.0
   File : processData.js
===================================================== */

/* ===========================
   SUMMARY
=========================== */
function getSummary(){

    let income=0;

    let expense=0;

    let savingIncome=0;

    let savingExpense=0;

    transactions.forEach(item=>{

        if(item.type===TRANSACTION.INCOME){

            income+=item.amount;

        }

        if(item.type===TRANSACTION.EXPENSE){

            expense+=item.amount;

        }

        if(

            item.type===TRANSACTION.INCOME &&

            item.category===CATEGORY.SAVING

        ){

            savingIncome+=item.amount;

        }

        if(

            item.type===TRANSACTION.EXPENSE &&

            item.category===CATEGORY.SAVING

        ){

            savingExpense+=item.amount;

        }

    });

    const balance=

    income-expense;

    const savingRate=

    income===0

    ?0

    :((balance/income)*100);

    return{

        income,

        expense,

        balance,

        savingRate,

        savingIncome,

        savingExpense,

        savingDifference:

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
