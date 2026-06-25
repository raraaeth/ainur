/* =====================================================
   Finance Dashboard v1.0
   File : api.js
===================================================== */

/* ===========================
   FETCH DATA
=========================== */
/* =====================================================
   Finance Dashboard v1.0
   File : api.js
===================================================== */

let transactions = [];

/* ===========================
   FETCH DATA
=========================== */

async function fetchTransactions(){

    try{

        const response = await fetch(CONFIG.API_URL);

        if(!response.ok){

            throw new Error(
                "Failed to fetch data."
            );

        }

        const data = await response.json();

        transactions = data.map(item=>({

            date : item.Tanggal,

            type : item.Jenis,

            category : item.Kategori,

            description : item.Keterangan,

            amount : toNumber(item.Nominal)

        }));

        return transactions;

    }

    catch(error){

        console.error(error);

        showError(error.message);

        return [];

    }

}

/* ===========================
   ERROR HANDLER
=========================== */
function showError(message){

    console.error(

        "Finance Dashboard :",

        message

    );

}
