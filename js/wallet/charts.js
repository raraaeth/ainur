/* =====================================================
   PORTFOLIO ALLOCATION
===================================================== */

let walletAllocationChart = null;

function renderWalletAllocationChart(){

    const canvas =
    document.getElementById(
        "walletAllocationChart"
    );

    if(!canvas) return;

    const portfolios =
    Object.entries(
        Wallet.summary.portfolios || {}
    );

    if(!portfolios.length) return;

    const labels =
    portfolios.map(
        ([name]) => name
    );

    const values =
    portfolios.map(
        ([,item]) => item.totalUSD
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

                data:values,

                borderRadius:10,

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
                        color:"#ffffff",
                        callback:v =>
                        "$"+v.toFixed(0)
                    },

                    grid:{
                        color:"rgba(255,255,255,.08)"
                    }

                },

                y:{

                    ticks:{
                        color:"#ffffff"
                    },

                    grid:{
                        display:false
                    }

                }

            }

        }

    });

}
