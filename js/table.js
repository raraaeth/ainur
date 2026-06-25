/* =====================================================
   Finance Dashboard v1.0
   File : table.js
===================================================== */

/* ===========================
   FILTER
=========================== */
// SOON

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
