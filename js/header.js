console.log("===== HEADER ENGINE =====");

/* ===========================
   UPDATE HEADER
=========================== */

function updateHeaderClock(){

    const clock =

    document.getElementById(

        "headerClock"

    );

    const date =

    document.getElementById(

        "headerDate"

    );

    const greeting =

    document.getElementById(

        "greetingText"

    );

    if(

        !clock ||

        !date ||

        !greeting

    ) return;

    const now =

    new Date();

    /* ======================
       CLOCK
    ====================== */

clock.textContent =

now

.toLocaleTimeString(

"id-ID",

{

hour:"2-digit",

minute:"2-digit",

second:"2-digit"

}

)

.replaceAll(".",":");

    /* ======================
       DATE
    ====================== */

    date.textContent =

    now.toLocaleDateString(

        "id-ID",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

    /* ======================
       GREETING
    ====================== */

    const hour =

    now.getHours();

    let text = "";

    if(hour < 11){

        text =

        "☀️ Selamat Pagi";

    }

    else if(hour < 15){

        text =

        "🌤️ Selamat Siang";

    }

    else if(hour < 18){

        text =

        "🌇 Selamat Sore";

    }

    else{

        text =

        "🌙 Selamat Malam";

    }

    greeting.textContent =

    text;

}

/* ===========================
   INIT
=========================== */

updateHeaderClock();

setInterval(

    updateHeaderClock,

    1000

);
