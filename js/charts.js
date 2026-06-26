/* =====================================================
   Finance Dashboard v1.0
   File : charts.js
===================================================== */

/* ===========================
   BAR CHART
=========================== */
let monthlyChart = null;

function updateMonthlyChart(){

    const canvas = document.getElementById("monthlyChart");

    if(!canvas) return;

    if(monthlyChart){

        monthlyChart.destroy();

    }

    monthlyChart = new Chart(canvas,{

        type:"bar",

        data:{

            labels:Finance.charts.labels,

            datasets:[

                {

                    label:"Pemasukan",

                    data:Finance.charts.income,

                    backgroundColor:"#22C55E",

                    borderRadius:8

                },

                {

                    label:"Pengeluaran",

                    data:Finance.charts.expense,

                    backgroundColor:"#EF4444",

                    borderRadius:8

                }

            ]

        },

        options:{

    responsive:true,

    maintainAspectRatio:false,

    layout:{

        padding:{

            top:10,

            bottom:10,

            left:0,

            right:0

        }

    },

    plugins:{

                legend:{

                    labels:{

                        color:"#F8FAFC"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{

                        color:"#94A3B8"

                    },

                    grid:{

                        display:false

                    }

                },

                y:{

                    ticks:{

                        color:"#94A3B8"

                    },

                    grid:{

                        color:"rgba(255,255,255,.08)"

                    }

                }

            }

        }

    });

}

/* ===========================
   DOUGHNUT CHART
=========================== */
// Reserved for v1.1


/* ===========================
   FUNCTION CHART
=========================== */

function updateCharts(){

    updateMonthlyChart();

}
