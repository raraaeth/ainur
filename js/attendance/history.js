/* =====================================================
   ATTENDANCE HISTORY
===================================================== */

let attendancePage = 1;

const attendancePerPage = 5;

let attendanceMonth = "";

let attendanceYear = "";

/* =========================
   PREPARE HISTORY
========================= */

function prepareAttendanceHistory(){

    Attendance.history =

    [...Attendance.data]

    .sort(

        (a,b)=>

        b.dateObject -

        a.dateObject

    );

    populateAttendanceFilters();

}

/* =========================
   POPULATE FILTER
========================= */

function populateAttendanceFilters(){

    const monthSelect =

    document.getElementById(

        "attendanceMonth"

    );

    const yearSelect =

    document.getElementById(

        "attendanceYear"

    );

    if(

        !monthSelect ||

        !yearSelect

    ) return;

    const months =

    [...new Set(

        Attendance.history.map(

            item=>item.month

        )

    )];

    const years =

    [...new Set(

        Attendance.history.map(

            item=>item.year

        )

    )];

    monthSelect.innerHTML =

    months.map(month=>`

        <option value="${month}">

            ${month}

        </option>

    `).join("");

    yearSelect.innerHTML =

    years.map(year=>`

        <option value="${year}">

            ${year}

        </option>

    `).join("");

    attendanceMonth =

    monthSelect.value;

    attendanceYear =

    yearSelect.value;

    attendancePage = 1;

    monthSelect.onchange = ()=>{

        attendanceMonth =

        monthSelect.value;

        attendancePage = 1;

        updateAttendanceHistory();

    };

    yearSelect.onchange = ()=>{

        attendanceYear =

        yearSelect.value;

        attendancePage = 1;

        updateAttendanceHistory();

    };

    }

/* =========================
   RENDER HISTORY
========================= */

function updateAttendanceHistory(){

    const container =

    document.getElementById(

        "attendanceHistory"

    );

    if(!container) return;

    const filtered =

    Attendance.history.filter(item=>{

        return(

            item.month===attendanceMonth &&

            String(item.year)===

            String(attendanceYear)

        );

    });

    const start =

(attendancePage - 1) *

attendancePerPage;

const end =

start +

attendancePerPage;

const data =

filtered.slice(

    start,

    end

);

    if(data.length===0){

        container.innerHTML=

        `

        <div class="attendance-empty">

            Belum ada data attendance.

        </div>

        `;

        return;

    }

    container.innerHTML=

    data.map(item=>{

        let color="#22c55e";

        let icon="🟢";

        switch(item.status){

            case "Late":

                color="#ef4444";

                icon="🔴";

                break;

            case "Holiday":

                color="#f59e0b";

                icon="🏖️";

                break;

            case "Sick":

                color="#3b82f6";

                icon="🤒";

                break;

            case "Leave":

                color="#a855f7";

                icon="📅";

                break;

        }

        return `

        <div

        class="attendance-history-card"

        style="border-left:4px solid ${color};">

            <div class="history-top">

                <strong>

                    ${icon}

                    ${item.status}

                </strong>

                <small>

                    ${formatDate(item.date)}

                </small>

            </div>

            <div class="history-bottom">

                <span>

                    🕒

                    ${item.checkIn

                    ?

                    item.checkIn.replaceAll(".",":")

                    :

                    "-"}

                </span>

                <span>

                    ${item.lateMinutes>0

                    ?

                    item.lateMinutes +

                    " min"

                    :

                    ""}

                </span>

            </div>

        </div>

        `;

    }).join("");
   
   updateAttendancePagination();

}

/* =========================
   HISTORY PAGINATION
========================= */

function updateAttendancePagination(){

    const prev =

    document.getElementById(

        "attendancePrev"

    );

    const next =

    document.getElementById(

        "attendanceNext"

    );

    const indicator =

    document.getElementById(

        "attendanceIndicator"

    );

    const pageInfo =

    document.getElementById(

        "attendancePageInfo"

    );

    if(

        !prev ||

        !next ||

        !indicator ||

        !pageInfo

    ) return;

    const totalData =

    Attendance.history.filter(item=>

        item.month===attendanceMonth &&

        String(item.year)===String(attendanceYear)

    ).length;

    const totalPage =

    Math.max(

        1,

        Math.ceil(

            totalData /

            attendancePerPage

        )

    );

    pageInfo.textContent =

    `Halaman ${attendancePage} / ${totalPage}`;

    const active =

    (attendancePage - 1) % 3;

    const dots =

    ["○","○","○"];

    dots[active] = "●";

    indicator.innerHTML =

    dots.join(" ");

    prev.disabled =

    attendancePage === 1;

    next.disabled =

    attendancePage === totalPage;

    prev.onclick = ()=>{

        if(attendancePage>1){

            attendancePage--;

            updateAttendanceHistory();

            updateAttendancePagination();

        }

    };

    next.onclick = ()=>{

        if(attendancePage<totalPage){

            attendancePage++;

            updateAttendanceHistory();

            updateAttendancePagination();

        }

    };

}
