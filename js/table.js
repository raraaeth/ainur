/* =====================================================
   Finance Dashboard v1.0
   File : table.js
===================================================== */

/* ===========================
   FILTER
=========================== */
function populateFilters(){

    const monthFilter =
    document.getElementById("monthFilter");

    const categoryFilter =
    document.getElementById("categoryFilter");

    if(!monthFilter || !categoryFilter) return;

    // Bulan sekarang
    const currentMonth =
    new Date().getMonth() + 1;

    // Reset
    monthFilter.innerHTML =
    '<option value="all">Semua Bulan</option>';

    categoryFilter.innerHTML =
    '<option value="all">Semua Kategori</option>';

    // Isi Bulan
    MONTH.forEach((name,index)=>{

        monthFilter.innerHTML +=
        `<option value="${index+1}">
            ${name}
        </option>`;

    });

    // Default ke bulan sekarang
    monthFilter.value =
    String(currentMonth);

    // Ambil kategori unik
    const categories = [
        ...new Set(
            Finance.data.map(
                item => item.category
            )
        )
    ].sort();

    // Isi kategori
    categories.forEach(category=>{

        categoryFilter.innerHTML +=
        `<option value="${category}">
            ${category}
        </option>`;

    });

}

function getFilteredData(){

    const month =
    document.getElementById("monthFilter").value;

    const category =
    document.getElementById("categoryFilter").value;

    const type =
    document.getElementById("typeFilter").value;

    return Finance.table.filter(item=>{

    const keyword =
    getSearchKeyword();

    const matchMonth =
    month === "all" ||
    item.month == Number(month);

    const matchCategory =
    category === "all" ||
    item.category === category;

    const matchType =
    type === "all" ||
    item.type === type.toLowerCase();

    const matchSearch =

        keyword === "" ||

        item.description
        .toLowerCase()
        .includes(keyword) ||

        item.category
        .toLowerCase()
        .includes(keyword) ||

        item.type
        .toLowerCase()
        .includes(keyword) ||

        String(item.amount)
        .includes(keyword);

    return (

        matchMonth &&
        matchCategory &&
        matchType &&
        matchSearch

    );

});

}

/* ===========================
   SEARCH
=========================== */

function getSearchKeyword(){

    return document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

}

/* ===========================
   TABLE
=========================== */

function createTableRow(item){

    return `

    <tr>

        <td>${formatDate(item.date)}</td>

        <td>

            <span class="badge ${item.type}">

                ${item.type}

            </span>

        </td>

        <td>${item.category}</td>

        <td>${item.description}</td>

        <td class="${item.type}">

            ${formatCurrency(item.amount)}

        </td>

    </tr>

    `;

}

function updateTable(){

    const tbody =
    document.getElementById(
        "transactionTable"
    );

    if(!tbody) return;

    const data =
    getFilteredData();

    updateTableCounter(data);

    updateFilterSummary(data);

    if(data.length===0){

        tbody.innerHTML = `

        <tr>

            <td
                colspan="5"
                class="empty-state">

                📭<br><br>

                Tidak ada transaksi
                yang sesuai
                dengan filter.

            </td>

        </tr>

        `;

        return;

    }

    const displayData =
Finance.tableExpand
? data
: data.slice(0, Finance.tableLimit);

tbody.innerHTML =
displayData
.map(createTableRow)
.join("");

renderTableButton(data.length);

}

/* ===========================
   TABLE COUNTER
=========================== */

function updateTableCounter(filtered){

    const counter =
    document.getElementById(
        "tableCounter"
    );

    if(!counter) return;

    counter.textContent =

    `Menampilkan ${filtered.length} dari ${Finance.table.length} transaksi`;

}

/* ===========================
   FILTER SUMMARY
=========================== */

function updateFilterSummary(data){

    const totalTransaction =

    document.getElementById(
        "filterTotalTransaction"
    );

    const totalAmount =

    document.getElementById(
        "filterTotalAmount"
    );

    const amountLabel =

    document.getElementById(
        "filterAmountLabel"
    );

    if(

        !totalTransaction ||

        !totalAmount ||

        !amountLabel

    ) return;

    const total =

    data.reduce(

        (sum,item)=>

        sum + Number(item.amount),

        0

    );

    totalTransaction.textContent =

    data.length;

    totalAmount.textContent =

    formatCurrency(total);

    const type =

    document.getElementById(
        "typeFilter"
    ).value;

    switch(type){

        case "Masuk":

            amountLabel.textContent =

            "💰 Total Pemasukan";

            break;

        case "Keluar":

            amountLabel.textContent =

            "💸 Total Pengeluaran";

            break;

        default:

            amountLabel.textContent =

            "💵 Total Nominal";

    }

}

/* =========================
   TABLE BUTTON
========================= */

function renderTableButton(total){

    let button =
    document.getElementById("tableMoreBtn");

    if(!button){

        button =
        document.createElement("button");

        button.id = "tableMoreBtn";

        button.className = "btn-more";

        document
        .querySelector(".table-wrapper")
        .appendChild(button);

    }

    if(total <= Finance.tableLimit){

        button.style.display = "none";

        return;

    }

    button.style.display = "block";

    button.textContent =
    Finance.tableExpand
    ? "Sembunyikan"
    : `Lihat ${total - Finance.tableLimit} transaksi lainnya`;

    button.onclick = () => {

        Finance.tableExpand =
        !Finance.tableExpand;

        updateTable();

    };

}


/* ===========================
   INIT FILTER
=========================== */

function initFilters(){

    document
    .getElementById("monthFilter")
    .addEventListener(
        "change",
        updateTable
    );

    document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        updateTable
    );

    document
    .getElementById("typeFilter")
    .addEventListener(
        "change",
        updateTable
    );
   
   document
.getElementById("searchInput")
.addEventListener(
    "input",
    updateTable
);

}
