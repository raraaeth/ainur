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


    /* =========================
       CHART THEME COLOR
    ========================= */

    const isLightMode =

    document.documentElement
    .getAttribute("data-theme")
    === "light";


    const chartTextColor =

    isLightMode

    ? "#64748B"

    : "#FFFFFF";


    const chartGridColor =

    isLightMode

    ? "rgba(100,116,139,.16)"

    : "rgba(255,255,255,.08)";


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

                        color:chartTextColor,

                        callback:v =>

                        "$"+v.toFixed(0)

                    },

                    grid:{

                        color:chartGridColor

                    }

                },

                y:{

                    ticks:{

                        color:chartTextColor

                    },

                    grid:{

                        display:false

                    }

                }

            }

        }

    });

}
