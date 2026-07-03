/* =====================================================
   AIRDROP PROCESS
===================================================== */

/* =========================
   NORMALIZE
========================= */

function normalizeAirdrop(){

    Airdrop.data =

    Airdrop.raw.map(item=>{

        return{

            project:

            item.Project
            ?.trim() || "",

            source:

            item.Source
            ?.trim() || "",

            category:

            item.Kategori
            ?.trim() || "",

            wallet:

            item.Wallet
            ?.trim() || "",

            status:

            item.Status
            ?.trim() || "",

            started:

            item.Started

            ? new Date(item.Started)

            : null,

            estimationEnd:

            item.EstimationEnd

            ? new Date(
                item.EstimationEnd
            )

            : null,

            token:

            item.Token
            ?.trim() || "",

            qty:

            Number(
                item.QTY
            ) || 0,

            sellPrice:

            Number(
                item.SellPrice
            ) || 0,

            totalUSD:

            Number(
                item.TotalUSD
            ) || 0,

            notes:

            item.Notes
            ?.trim() || ""

        };

    });

}
