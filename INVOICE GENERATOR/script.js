

function generateinvoice() {
    const clientName = document.getElementById("clientname").value;
    const serviceDescription = document.getElementById("servicedescription").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const discount = parseFloat(document.getElementById("discount").value);

    if (isNaN(amount)) {
        alert('Please enter a valid number for the amount.');
        return;
    }

    //  total after applying discount
    const discountAmount = amount * (discount / 100);
    const total = amount - discountAmount;

    // Display results in the invoice preview
    document.getElementById('clientOutput').innerText = `Client Name: ${clientName}`;
    document.getElementById('serviceOutput').innerText = `Service Description: ${serviceDescription}`;
    document.getElementById('amountOutput').innerText = `Amount: $${amount.toFixed(2)}`;
    document.getElementById('totalOutput').innerText = `Total Amount after Discount: $${total.toFixed(2)}`;

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    const invoiceContent = `
        Invoice:
        Client Name: ${clientName}
        Service Description: ${serviceDescription}
        Amount: $${amount.toFixed(2)}
        Discount: ${discount}%
        Total Amount after Discount: $${total.toFixed(2)}
    `;

    pdf.text(invoiceContent, 10, 10);
    pdf.save('invoice.pdf');
}
