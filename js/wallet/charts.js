/* =====================================================
   WALLET CHARTS
===================================================== */

let walletAllocationChart = null;


/* =========================
   PORTFOLIO ALLOCATION
========================= */

function renderWalletAllocationChart(){

    const canvas =
    document.getElementById(
        "walletAllocationChart"
    );

    if(!canvas) return;

    const portfolios =
    Object.values(
        Wallet.summary.portfolios || {}
    );

    if(!portfolios.length) return;

    const labels =
    portfolios.map(
        item => item.name
    );

    const values =
    portfolios.map(
        item => item.totalUSD
    );

    if(walletAllocationChart){

        walletAllocationChart.destroy();

    }

    walletAllocationChart =
    new Chart(canvas,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                label:"USD",

                data:values,

                borderRadius:8,

                borderSkipped:false

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            indexAxis:"y",

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                x:{

                    beginAtZero:true,

                    ticks:{
                        callback:value =>
                        "$" + value
                    }

                },

                y:{

                    grid:{
                        display:false
                    }

                }

            }

        }

    });

}
