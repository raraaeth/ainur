/* =====================================================
   TOP HOLDING
===================================================== */

function processTopHolding(){

    const holdings = {};

    for(const wallet of Wallet.tokens){

        for(const token of wallet.tokens){

            const symbol =
            token.symbol || "UNKNOWN";

            const usd =
            Number(
                token.usd_value || 0
            );

            if(!holdings[symbol]){

                holdings[symbol]={

                    symbol,

                    usd:0,

                    wallets:new Set()

                };

            }

            holdings[symbol].usd += usd;

            holdings[symbol].wallets.add(
                wallet.portfolio
            );

        }

    }

    Wallet.summary.topHolding =

    Object.values(holdings)

    .map(item=>({

        symbol:item.symbol,

        usd:item.usd,

        wallets:item.wallets.size

    }))

    .sort(

        (a,b)=>

        b.usd-a.usd

    );

}
/* =========================
   RENDER TOP HOLDING
========================= */

function renderTopHolding(){

    const container =

    document.getElementById(
        "topHoldingList"
    );

    if(!container) return;

    const data =

    Wallet.summary.topHolding || [];

    container.innerHTML =

    data

    .slice(0,10)

    .map(item=>`

        <div class="holding-item">

            <div>

                <strong>${item.symbol}</strong>

                <div>

                    ${item.wallets} Wallet

                </div>

            </div>

            <div>

                $${item.usd.toFixed(2)}

            </div>

        </div>

    `).join("");

}

/* =========================
   TOP HOLDING CHART
========================= */

let topHoldingChart = null;

function renderTopHoldingChart(){

    const canvas =

    document.getElementById(
        "topHoldingChart"
    );

    if(!canvas) return;

    const data =

    Wallet.summary.topHolding
    .slice(0,5);

    if(topHoldingChart){

        topHoldingChart.destroy();

    }

    topHoldingChart =

    new Chart(

        canvas,

        {

            type:"doughnut",

            data:{

                labels:

                data.map(

                    item=>item.symbol

                ),

                datasets:[{

                    data:

                    data.map(

                        item=>item.usd

                    )

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        position:"bottom"

                    }

                }

            }

        }

    );

}

