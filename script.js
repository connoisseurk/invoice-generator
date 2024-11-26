// Function to generate invoice preview on the web page
function generateInvoicePreview() {
  // Get form values
  const clientName = document.getElementById("clientname").value;
  const location = document.getElementById("location").value;
  const serviceDescription = document.getElementById("servicedescription").value;
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  // Calculate total after discount
  const discountAmount = (amount * discount) / 100;
  const total = amount - discountAmount;

  // Display invoice preview in the HTML
  document.getElementById("clientOutput").innerText = clientName;
  document.getElementById("locationOutput").innerText = location;
  document.getElementById("serviceOutput").innerText = serviceDescription;
  document.getElementById("amountOutput").innerText = `$${amount.toFixed(2)}`;
  document.getElementById("discountOutput").innerText = `${discount}%`;
  document.getElementById("totalOutput").innerText = `$${total.toFixed(2)}`;
}

// Function to generate the PDF
function generatePDF() {
  // Get form values
  const clientName = document.getElementById("clientname").value;
  const location = document.getElementById("location").value;
  const serviceDescription = document.getElementById("servicedescription").value;
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  // Calculate discount and total
  const discountAmount = (amount * discount) / 100;
  const totalAmount = amount - discountAmount;

  // Format amounts in INR
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

// Add company logo at the top
const logo = new Image();
logo.src = "https://www.myctoinnovations.com/assets/logo-r9K3yGJm.png"; // Path to your logo file
logo.onload = () => {
  doc.addImage(logo, "PNG", 90, 10, 30, 30); // Centered on top
  generatePDFContent(doc, clientName, location, serviceDescription, amount, discount, totalAmount);
};

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("TAX INVOICE", 105, 20, { align: "center" });

  // Company Details
  doc.setFontSize(12);
  doc.text("My CTO", 10, 30);
  doc.text("Greater Noida", 10, 40);
  doc.text("hello@useanvil.com", 10, 50);

  // Client and location details
  doc.setFont("helvetica", "normal");
  doc.text(`Client Name: ${clientName}`, 10, 70);
  doc.text(`Location: ${location}`, 10, 80);

  // Invoice and Date Details
  const date = new Date().toLocaleDateString();
  doc.text(`Invoice Date: ${date}`, 140, 70);
  doc.text(`Invoice No: 12345`, 140, 80);

  // Table Header
  doc.setFont("helvetica", "bold");
  doc.text("Qty", 10, 100);
  doc.text("Description", 50, 100);
  doc.text("Price", 140, 100);
  doc.text("Subtotal", 170, 100);

  // Table Content
  doc.setFont("helvetica", "normal");
  doc.text("1", 10, 110);
  doc.text(serviceDescription, 50, 110);
  doc.text(`$${amount.toFixed(2)}`, 140, 110);
  doc.text(`$${totalAmount.toFixed(2)}`, 170, 110);

  // Footer and Grand Total
  const sgst = (totalAmount * 6) / 100;
  const cgst = (totalAmount * 6) / 100;
  const grandTotal = totalAmount + sgst + cgst;

  doc.text(`SGST (6%): $${sgst.toFixed(2)}`, 10, 130);
  doc.text(`CGST (6%): $${cgst.toFixed(2)}`, 10, 140);
  doc.setFont("helvetica", "bold");
  doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 10, 160);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", 10, 180);
  doc.text("For queries, email us at sudhanshu@mycto.com", 10, 190);

  // Save the PDF
  doc.save("invoice.pdf");
}

// Add event listeners for preview and download buttons
document.querySelector(".btn-outline-primary").addEventListener("click", generateInvoicePreview);
document.querySelector(".btn-download-pdf").addEventListener("click", generatePDF);
