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

        const response = await fetch(

    CONFIG.TRANSACTION_API_URL

);

        if(!response.ok){

            throw new Error(
                "Failed to fetch data."
            );

        }

        const data = await response.json();

        Finance.raw = data.map(item=>({

    date:item.Tanggal,

    type:item.Jenis,

    category:item.Kategori,

    description:item.Keterangan,

    amount:toNumber(item.Nominal)

}));

        return Finance.raw;

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
