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

        const matchMonth =
        month === "all" ||
        item.month == Number(month);

        const matchCategory =
        category === "all" ||
        item.category === category;

        const matchType =
        type === "all" ||
        item.type === type.toLowerCase();

        return (
            matchMonth &&
            matchCategory &&
            matchType
        );

    });

}

/* ===========================
   SEARCH
=========================== */

// SOON

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

    tbody.innerHTML =
    data
    .map(createTableRow)
    .join("");

}
