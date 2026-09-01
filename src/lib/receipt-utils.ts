export type PastOrder = {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  orderType: "dine-in" | "takeaway";
  tableNo?: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: "Completed" | "Preparing";
};

export type ReservationDetails = {
  id: string;
  customerName: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
  tableAssigned: string;
};

/**
 * Triggers browser Print / Save to PDF dialog directly (no .html file saved!)
 */
export function downloadOrderBill(order: PastOrder) {
  const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bill_${order.id}</title>
  <style>
    @page { size: auto; margin: 15mm; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #12100E;
      padding: 20px;
      margin: 0;
    }
    .receipt-box {
      max-width: 480px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #12100E;
      padding: 30px;
      border-radius: 16px;
    }
    .brand {
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      color: #12100E;
      letter-spacing: 1px;
    }
    .sub-brand {
      text-align: center;
      font-size: 11px;
      color: #555555;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 25px;
    }
    .info-table {
      width: 100%;
      margin-bottom: 20px;
      font-size: 13px;
      color: #333333;
      border-bottom: 1px dashed #aaaaaa;
      padding-bottom: 15px;
    }
    .info-table td { padding: 4px 0; }
    .info-table td.right {
      text-align: right;
      color: #12100E;
      font-weight: 700;
    }
    .item-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .item-table th {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #12100E;
      border-bottom: 2px solid #12100E;
      padding-bottom: 8px;
    }
    .item-table td {
      padding: 10px 0;
      font-size: 13px;
      border-bottom: 1px solid #eeeeee;
    }
    .item-table td.price {
      text-align: right;
      font-weight: 700;
      color: #12100E;
    }
    .total-section {
      border-top: 2px solid #12100E;
      padding-top: 15px;
      margin-top: 15px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 6px;
      color: #444444;
    }
    .grand-total {
      font-size: 18px;
      font-weight: 800;
      color: #12100E;
      margin-top: 10px;
    }
    .footer-note {
      text-align: center;
      margin-top: 25px;
      font-size: 11px;
      color: #666666;
      border-top: 1px dashed #aaaaaa;
      padding-top: 15px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="receipt-box">
    <div class="brand">BREW &amp; BEAN</div>
    <div class="sub-brand">Artisanal Coffee &amp; Bakery · Bandra West</div>
    
    <table class="info-table">
      <tr>
        <td>Invoice Ref:</td>
        <td class="right">${order.id}</td>
      </tr>
      <tr>
        <td>Date &amp; Time:</td>
        <td class="right">${order.date}</td>
      </tr>
      <tr>
        <td>Customer Name:</td>
        <td class="right">${order.customerName}</td>
      </tr>
      <tr>
        <td>Order Type:</td>
        <td class="right">${order.orderType === "dine-in" ? `Dine-In (${order.tableNo || "Table #04"})` : "Takeaway / Pickup"}</td>
      </tr>
    </table>

    <table class="item-table">
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align:center;">Qty</th>
          <th style="text-align:right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (i) => `
          <tr>
            <td>${i.name}</td>
            <td style="text-align:center;">${i.qty}</td>
            <td class="price">₹${i.price * i.qty}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>

    <div class="total-section">
      <div class="total-row">
        <span>Subtotal</span>
        <span>₹${order.subtotal}</span>
      </div>
      <div class="total-row">
        <span>GST / Tax (5%)</span>
        <span>₹${order.tax}</span>
      </div>
      <div class="total-row grand-total">
        <span>TOTAL AMOUNT PAID</span>
        <span>₹${order.total}</span>
      </div>
    </div>

    <div class="footer-note">
      Thank you for visiting Brew &amp; Bean!<br>
      14 Marina Walk, Bandra West, Mumbai 400050<br>
      GSTIN: 27AAAAA0000A1Z5 · Support: hello@brewandbean.in
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>
  `;

  const printWindow = window.open("", "_blank", "width=600,height=700");
  if (printWindow) {
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  } else {
    // Fallback if popup blocked: use iframe to trigger print to PDF dialog
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(receiptHtml);
      doc.close();
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }
  }
}

/**
 * Triggers browser Print / Save to PDF for Table Reservation Voucher (no .html file saved!)
 */
export function downloadReservationSlip(res: ReservationDetails) {
  const slipHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reservation_${res.id}</title>
  <style>
    @page { size: auto; margin: 15mm; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #12100E;
      padding: 20px;
      margin: 0;
    }
    .slip-box {
      max-width: 460px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #12100E;
      padding: 30px;
      border-radius: 16px;
      text-align: center;
    }
    .header-tag {
      display: inline-block;
      background: #eeeeee;
      color: #12100E;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 15px;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      color: #12100E;
      margin-bottom: 5px;
    }
    .cafe-name {
      font-size: 13px;
      color: #666666;
      margin-bottom: 25px;
    }
    .grid-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      background: #f9f9f9;
      padding: 18px;
      border-radius: 14px;
      border: 1px solid #dddddd;
      margin-bottom: 25px;
      text-align: left;
    }
    .info-item label {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      color: #666666;
      letter-spacing: 1px;
      margin-bottom: 3px;
    }
    .info-item span {
      font-size: 13px;
      font-weight: 700;
      color: #12100E;
    }
    .notes-box {
      background: #f0f0f0;
      padding: 12px;
      border-radius: 10px;
      font-size: 12px;
      color: #444444;
      margin-bottom: 25px;
      text-align: left;
    }
    .guidelines {
      font-size: 11px;
      color: #666666;
      line-height: 1.5;
      border-top: 1px dashed #aaaaaa;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="slip-box">
    <span class="header-tag">Table Reservation Voucher</span>
    <div class="title">RESERVATION CONFIRMED</div>
    <div class="cafe-name">Brew &amp; Bean · Bandra West, Mumbai</div>

    <div class="grid-info">
      <div class="info-item">
        <label>Pass Code</label>
        <span style="color:#12100E;">${res.id}</span>
      </div>
      <div class="info-item">
        <label>Guest Name</label>
        <span>${res.customerName}</span>
      </div>
      <div class="info-item">
        <label>Date</label>
        <span>${res.date}</span>
      </div>
      <div class="info-item">
        <label>Time Slot</label>
        <span>${res.time}</span>
      </div>
      <div class="info-item">
        <label>Party Size</label>
        <span>${res.guests} Guests</span>
      </div>
      <div class="info-item">
        <label>Table Preference</label>
        <span>${res.tableAssigned}</span>
      </div>
    </div>

    ${
      res.notes
        ? `<div class="notes-box"><strong>Special Request:</strong> ${res.notes}</div>`
        : ""
    }

    <div class="guidelines">
      • Please present this digital voucher at the host station.<br>
      • Tables are held for up to 15 minutes past reservation time.<br>
      • 14 Marina Walk, Bandra West, Mumbai 400050 · Phone: +91 98200 45678
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() { window.close(); }, 500);
    };
  </script>
</body>
</html>
  `;

  const printWindow = window.open("", "_blank", "width=600,height=700");
  if (printWindow) {
    printWindow.document.write(slipHtml);
    printWindow.document.close();
  } else {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(slipHtml);
      doc.close();
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }
  }
}


