/* =====================================================
   Finance Dashboard v1.0
   File : table.js
===================================================== */

/* ===========================
   FILTER
=========================== */
function populateFilters(){

    alert("1");

    const monthFilter =
    document.getElementById("monthFilter");

    const categoryFilter =
    document.getElementById("categoryFilter");

    alert("2");

    if(!monthFilter || !categoryFilter) return;

    monthFilter.innerHTML =
    '<option value="all">Semua Bulan</option>';

    categoryFilter.innerHTML =
    '<option value="all">Semua Kategori</option>';

    alert("3");

    MONTH.forEach((name,index)=>{

        monthFilter.innerHTML +=
        `<option value="${index+1}">${name}</option>`;

    });

    alert("4");

    const categories = [
        ...new Set(
            Finance.data.map(item=>item.category)
        )
    ].sort();

    alert("5");

    categories.forEach(category=>{

        categoryFilter.innerHTML +=
        `<option value="${category}">
            ${category}
        </option>`;

    });

    alert("6");

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

    const tbody = document.getElementById(
        "transactionTable"
    );

    if(!tbody) return;

    tbody.innerHTML = Finance.table
        .map(createTableRow)
        .join("");

}
