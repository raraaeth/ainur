/* =====================================================
   AIRDROP UTILS
===================================================== */

/* =========================
   POPULATE FILTER
========================= */

function populateAirdropFilters(){

    populateSelect(

        "airdropWalletFilter",

        [...new Set(

            Airdrop.data.map(

                item=>item.wallet

            )

        )]

    );

    populateSelect(

        "airdropCategoryFilter",

        [...new Set(

            Airdrop.data.map(

                item=>item.category

            )

        )]

    );

    populateSelect(

        "airdropStatusFilter",

        [...new Set(

            Airdrop.data.map(

                item=>item.status

            )

        )]

    );

}
/* =========================
   POPULATE SELECT
========================= */

function populateSelect(

    id,

    data

){

    const select =

    document.getElementById(id);

    if(!select) return;

    data

    .sort()

    .forEach(item=>{

        const option =

        document.createElement(

            "option"

        );

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });

}
