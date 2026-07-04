const API_URL =
"https://script.google.com/macros/s/AKfycbxp3uIakJzUSNPLWuHWvyRh8MVAYEZEjN66nLI2kGXx7zwkKhfoGr0s1Z7fnx_KzLNR/exec";

async function checkIn(){

    const now = new Date();

    const hour = now.getHours();
    const minute = now.getMinutes();

    const totalMinute = hour * 60 + minute;

    // Jam masuk kerja
    const officeMinute = 8 * 60;

    const lateMinutes =
    Math.max(
        totalMinute - officeMinute,
        0
    );

    const status =
    lateMinutes > 0
    ? "Late"
    : "On Time";

    const body = {

        date:
        now.toISOString().split("T")[0],

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

    const res =
    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify(body)

    });

    const json =
    await res.json();

    alert(
        json.success
        ? "✅ Check In Success"
        : "❌ Failed"
    );

}
