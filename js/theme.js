console.log(
    "===== THEME ENGINE ====="
);

/* ===========================
   THEME ELEMENT
=========================== */

const themeToggle =

document.getElementById(
    "themeToggle"
);

const themeIcon =

document.getElementById(
    "themeIcon"
);


/* ===========================
   GET SAVED THEME
=========================== */

const savedTheme =

localStorage.getItem(
    "lifeDashboardTheme"
);


/* ===========================
   APPLY THEME
=========================== */

function applyTheme(theme){

    document.documentElement

    .setAttribute(

        "data-theme",

        theme

    );

    /* ======================
       UPDATE ICON
    ====================== */

    if(!themeIcon) return;

    if(theme==="light"){

        themeIcon.className =

        "fa-solid fa-moon";

        themeToggle.setAttribute(

            "aria-label",

            "Aktifkan mode gelap"

        );

    }

    else{

        themeIcon.className =

        "fa-solid fa-sun";

        themeToggle.setAttribute(

            "aria-label",

            "Aktifkan mode terang"

        );

    }

}


/* ===========================
   INITIAL THEME
=========================== */

applyTheme(

    savedTheme ||

    "dark"

);


/* ===========================
   TOGGLE THEME
=========================== */

if(themeToggle){

    themeToggle.addEventListener(

        "click",

        ()=>{

            const currentTheme =

            document.documentElement

            .getAttribute(

                "data-theme"

            );

            const newTheme =

            currentTheme==="dark"

            ?

            "light"

            :

            "dark";

            /* APPLY */

            applyTheme(

                newTheme

            );

            /* SAVE */

            localStorage.setItem(

                "lifeDashboardTheme",

                newTheme

            );

        }

    );

              }
