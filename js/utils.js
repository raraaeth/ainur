/* =====================================================
   Finance Dashboard v1.0
   File : utils.js
===================================================== */

/* ===========================
   FORMAT
=========================== */
function formatCurrency(value){

    return new Intl.NumberFormat(

        "id-ID",

        {

            style:"currency",

            currency:"IDR",

            maximumFractionDigits:0

        }

    ).format(value);

}
/* =========================
   SHORT IDR
========================= */

function formatShortIDR(value){

    value = Number(value || 0);

    if(value >= 1000000000){

        return "Rp" +

        (value / 1000000000)

        .toFixed(2)

        .replace(/\.?0+$/,"")

        + " M";

    }

    if(value >= 1000000){

        return "Rp" +

        (value / 1000000)

        .toFixed(1)

        .replace(".",",")

        .replace(/,0$/,"")

        + " Jt";

    }

    if(value >= 1000){

        return "Rp" +

        (value / 1000)

        .toFixed(0)

        + " Rb";

    }

    return formatCurrency(value);

}

/* ===========================
   DATE
=========================== */
function formatDate(date){

    return new Date(date)

    .toLocaleDateString(

        "id-ID",

        {

            day:"2-digit",

            month:"short",

            year:"numeric"

        }

    );

}

/* ===========================
   NUMBER
=========================== */
function toNumber(value){

    return Number(value)||0;

}

/* ===========================
   DOM HELPERS
=========================== */
function $(selector){

    return document.querySelector(selector);

}

function $$(selector){

    return document.querySelectorAll(selector);

}

/* ===========================
   MESSAGE
=========================== */

function showToast(message){

    console.log(message);

}

