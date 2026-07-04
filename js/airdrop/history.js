/* =====================================================
   AIRDROP HISTORY
===================================================== */

/* =========================
   FILTER HISTORY
========================= */

function filterHistory(){

    const keyword =

    document.getElementById(

        "airdropSearch"

    )?.value

    .trim()

    .toLowerCase() || "";

    const wallet =

    document.getElementById(

        "airdropWalletFilter"

    )?.value || "";

    const category =

    document.getElementById(

        "airdropCategoryFilter"

    )?.value || "";

    const status =

    document.getElementById(

        "airdropStatusFilter"

    )?.value || "";

    return Airdrop.history.filter(item=>{

        const matchKeyword =

            keyword === "" ||

            item.project

            .toLowerCase()

            .includes(keyword);

        const matchWallet =

            wallet === "" ||

            item.wallet === wallet;

        const matchCategory =

            category === "" ||

            item.category === category;

        const matchStatus =

            status === "" ||

            item.status === status;

        return(

            matchKeyword &&

            matchWallet &&

            matchCategory &&

            matchStatus

        );

    });

}

/* =========================
   STATUS BADGE
========================= */

function getStatusBadge(status){

    const badge={

        ClaimAll:
        "badge-success",

        ClaimVesting:
        "badge-info",

        DistriAll:
        "badge-success",

        Eligible:
        "badge-warning",

        Ongoing:
        "badge-primary",

        NotEligible:
        "badge-danger",

        NotWin:
        "badge-danger",

        Mint:
        "badge-purple"

    };

    return `

    <span class="status-badge ${

        badge[status]||

        "badge-default"

    }">

        ${status}

    </span>

    `;

}

/* =========================
   UPDATE HISTORY
========================= */

function updateHistory(){

    const container =

    document.getElementById(

        "airdropHistory"

    );

    if(!container) return;

    const keyword =

    document.getElementById(

        "airdropSearch"

    )?.value

    .trim();

    const wallet =

    document.getElementById(

        "airdropWalletFilter"

    )?.value || "";

    const category =

    document.getElementById(

        "airdropCategoryFilter"

    )?.value || "";

    const status =

    document.getElementById(

        "airdropStatusFilter"

    )?.value || "";

    /* =====================
       DEFAULT EMPTY
    ===================== */

    if(

        keyword==="" &&

        wallet==="" &&

        category==="" &&

        status===""

    ){

        container.innerHTML = `

        <div class="airdrop-empty">

            🪂

            <p>

                Pilih filter atau cari nama project
                untuk melihat riwayat airdrop.

            </p>

        </div>

        `;

        return;

    }

    const data =

    filterHistory();

    if(data.length===0){

        container.innerHTML = `

        <div class="airdrop-empty">

            🔍

            <p>

                Tidak ada project yang ditemukan.

            </p>

        </div>

        `;

        return;

    }

    renderHistory(

        data

    );

      }

/* =========================
   RENDER HISTORY
========================= */

function renderHistory(data){

    const container =

    document.getElementById(

        "airdropHistory"

    );

    if(!container) return;

    container.innerHTML = `

    <div class="table-wrapper">

    <table class="airdrop-table">

        <thead>

            <tr>

                <th>Project</th>

                <th>Wallet</th>

                <th>Status</th>

                <th>Kategori</th>

                <th>Token</th>

                <th>USD</th>

            </tr>

        </thead>

        <tbody>

        ${data.map(item=>`

            <tr>

                <td>

                    ${item.project}

                </td>

                <td>

                    ${item.wallet}

                </td>

                <td>

    ${getStatusBadge(item.status)}

</td>

                <td>

                    ${item.category}

                </td>

                <td>

                    ${item.qty}

                    ${item.token}

                </td>

                <td>

                    ${formatUSD(

    item.totalUSD

)}

                </td>

            </tr>

        `).join("")}

        </tbody>

    </table>

    </div>

    `;

}

/* =========================
   INIT FILTER
========================= */

function initAirdropFilters(){

    document

    .getElementById(

        "airdropSearch"

    )

    ?.addEventListener(

        "keyup",

        updateHistory

    );

    document

    .getElementById(

        "airdropWalletFilter"

    )

    ?.addEventListener(

        "change",

        updateHistory

    );

    document

    .getElementById(

        "airdropCategoryFilter"

    )

    ?.addEventListener(

        "change",

        updateHistory

    );

    document

    .getElementById(

        "airdropStatusFilter"

    )

    ?.addEventListener(

        "change",

        updateHistory

    );

}

