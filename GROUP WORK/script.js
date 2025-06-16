document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.querySelector(".submit"); // Add button
    const deleteBtn = document.querySelector(".delete"); // Delete button
    const reportBtn = document.querySelector(".create"); // Create report button

    // Input fields
    const customerInputs = document.querySelectorAll(".leftside .input");
    const deliveryTime = document.querySelector(".leftside input[name='time-date']");
    const productInputs = document.querySelectorAll(".rightside input");

    // Table setup
    const tableBody = document.createElement("tbody");
    let table;

    function createTableIfNotExists() {
        if (!table) {
            table = document.createElement("table");
            table.border = 1;
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Order Date</th>
                        <th>Delivery</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Qty</th>
                    </tr>
                </thead>
            `;
            table.appendChild(tableBody);
            document.querySelector("main").appendChild(table);
        }
    }

    // Add functionality
    addBtn.addEventListener("click", function () {
        createTableIfNotExists();

        const customerName = customerInputs[0].value;
        const phone = customerInputs[1].value;
        const address = customerInputs[2].value;
        const orderDate = customerInputs[3].value;
        const deliveryDate = customerInputs[4].value;
        const deliveryTimeVal = deliveryTime.value;
        const deliveryFull = `${deliveryDate} ${deliveryTimeVal}`;

        const productName = productInputs[0].value;
        const store = productInputs[1].value;
        const category = productInputs[2].value;
        const size = productInputs[3].value;
        const qty = productInputs[4].value;

        if (
            !customerName || !phone || !address || !orderDate ||
            !deliveryDate || !deliveryTimeVal || !productName || !store || !category || !size || !qty
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customerName}</td>
            <td>${phone}</td>
            <td>${address}</td>
            <td>${orderDate}</td>
            <td>${deliveryFull}</td>
            <td>${productName}</td>
            <td>${store}</td>
            <td>${category}</td>
            <td>${size}</td>
            <td>${qty}</td>
        `;
        tableBody.appendChild(row);

        // Clear input fields
        [...customerInputs, ...productInputs, deliveryTime].forEach(input => input.value = "");
    });

    // Delete functionality
    deleteBtn.addEventListener("click", function () {
        if (tableBody.lastElementChild) {
            tableBody.removeChild(tableBody.lastElementChild);
        } else {
            alert("No data to delete.");
        }
    });

    // Create report functionality
    reportBtn.addEventListener("click", function () {
        const rows = tableBody.querySelectorAll("tr");
        let totalQty = 0;

        rows.forEach(row => {
            totalQty += parseInt(row.cells[9].textContent) || 0;
        });

        alert(`Total entries: ${rows.length}\nTotal quantity: ${totalQty}`);
    });
});