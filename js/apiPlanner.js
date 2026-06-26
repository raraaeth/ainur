/* =====================================================
   Life Dashboard v1.0
   File : apiPlanner.js
===================================================== */

/* ===========================
   FETCH PLANNER
=========================== */

async function fetchPlanner(){

    try{

        const response =

        await fetch(
            CONFIG.PLANNER_API_URL
        );

        const data =
        await response.json();

        Finance.plannerRaw =
        data;

    }

    catch(error){

        console.error(

            "Planner Error :",

            error

        );

        Finance.plannerRaw=[];

    }

}
