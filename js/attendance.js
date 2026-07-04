const API_URL =
"https://script.google.com/macros/s/AKfycbxp3uIakJzUSNPLWuHWvyRh8MVAYEZEjN66nLI2kGXx7zwkKhfoGr0s1Z7fnx_KzLNR/exec";

async function checkIn(){

    const button =

    document.querySelector(".btn-checkin");

    button.disabled = true;

    button.textContent = "Checking...";

    try{

        const now = new Date();

        const officeHour = 8;
        const officeMinute = 0;

        const currentMinute =
        now.getHours()*60 +
        now.getMinutes();

        const targetMinute =
        officeHour*60 +
        officeMinute;

        const lateMinutes =
        Math.max(
            currentMinute -
            targetMinute,
            0
        );

        const status =
        lateMinutes > 0
        ? "Late"
        : "On Time";

        const body={

            date:
            now.toLocaleDateString("sv-SE"),

            checkIn:
            now.toLocaleTimeString("id-ID"),

            status,

            lateMinutes,

            month:
            now.toLocaleString(
                "en-US",
                {month:"long"}
            ),

            year:
            now.getFullYear(),

            notes:""

        };

        const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(body)

        });

        const result =
        await response.json();

        if(result.success){

            button.textContent =
            "✅ Checked In";

        }else{

            button.textContent =
            "❌ Failed";

        }

    }catch(error){

        console.error(error);

        button.textContent =
        "❌ Failed";

    }

}
