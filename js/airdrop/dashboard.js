/* =====================================================
   AIRDROP DASHBOARD
===================================================== */

/* =========================
   UPDATE SUMMARY
========================= */

function updateAirdropSummary(){

    const totalProject =

    document.getElementById(

        "airdropTotalProject"

    );

    const totalUSD =

    document.getElementById(

        "airdropTotalUSD"

    );

    const won =

    document.getElementById(

        "airdropWon"

    );

    const failed =

    document.getElementById(

        "airdropFailed"

    );

    if(totalProject){

        totalProject.textContent =

        Airdrop.summary.totalProject;

    }

    if(totalUSD){

        totalUSD.textContent =

        formatCurrency(

            Airdrop.summary.totalUSD

        );

    }

    if(won){

        won.textContent =

        Airdrop.summary.won;

    }

    if(failed){

        failed.textContent =

        Airdrop.summary.failed;

    }

}

/* =========================
   HALL OF FAME
========================= */

function updateHallOfFame(){

    const container =

    document.getElementById(

        "hallOfFame"

    );

    if(!container) return;

    const medal = [

        "🥇",

        "🥈",

        "🥉",

        "⭐"

    ];

    container.innerHTML =

    Airdrop.hallOfFame

    .map((item,index)=>`

        <div class="hall-card">

            <div class="hall-rank">

                ${medal[index]}

            </div>

            <div class="hall-project">

                ${item.project}

            </div>

            <div class="hall-usd">

                ${formatCurrency(

                    item.totalUSD

                )}

            </div>

            <div class="hall-token">

                ${item.qty}

                ${item.token}

            </div>

            <div class="hall-wallet">

                👛 ${item.wallet}

            </div>

        </div>

    `)

    .join("");

}

/* =========================
   UPCOMING
========================= */

function updateUpcoming(){

    const container =

    document.getElementById(

        "upcomingList"

    );

    if(!container) return;

    const data =

    Airdrop.upcoming

    .slice(0,3);

    if(data.length===0){

        container.innerHTML =

        `

        <div class="upcoming-empty">

            Tidak ada project yang sedang
            menunggu distribusi.

        </div>

        `;

        return;

    }

    container.innerHTML =

    data

    .map(item=>`

        <div class="upcoming-item">

            <div>

                <strong>

                    ${item.project}

                </strong>

                <small>

                    ${item.status}

                </small>

            </div>

            <div>

                <small>

                    ${formatDate(

                        item.estimationEnd

                    )}

                </small>

            </div>

        </div>

    `)

    .join("");

                  }
