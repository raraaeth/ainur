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
