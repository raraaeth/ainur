/* =====================================================
   Finance Dashboard v1.0
   File : config.js
===================================================== */


/* ===========================
   APP
=========================== */

const APP = {

    NAME : "Finance Dashboard",

    VERSION : "1.0.0"

};


/* ===========================
   OPENSHEET
=========================== */

const CONFIG = {

    SHEET_ID :

    "18SyIR5CwehYNStVL5DKpx18yhBj7On8slqsQ4-p_s-M",

    SHEET_NAME :

    "transaksi",

    API_URL :

    "https://opensheet.elk.sh/18SyIR5CwehYNStVL5DKpx18yhBj7On8slqsQ4-p_s-M/transaksi"

};


/* ===========================
   TRANSACTION TYPE
=========================== */

const TRANSACTION = {

    INCOME : "masuk",

    EXPENSE : "keluar"

};


/* ===========================
   SPECIAL CATEGORY
=========================== */

const CATEGORY = {

    WIFE :

    "jatah istri",

    SAVING :

    "tabungan"

};


/* ===========================
   MONTH
=========================== */

const MONTH = [

    "Januari",

    "Februari",

    "Maret",

    "April",

    "Mei",

    "Juni",

    "Juli",

    "Agustus",

    "September",

    "Oktober",

    "November",

    "Desember"

];

const MONTH_SHORT = [

    "Jan",

    "Feb",

    "Mar",

    "Apr",

    "Mei",

    "Jun",

    "Jul",

    "Agu",

    "Sep",

    "Okt",

    "Nov",

    "Des"

];


/* ===========================
   GLOBAL STORE
=========================== */

const Finance = {

    raw : [],

    data : [],

    summary : {},

    chart : {},

    category : {},

    statistics : {},

    insight : {},

    table : []

};
