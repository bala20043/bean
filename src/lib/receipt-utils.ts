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
 * Directly downloads a styled HTML/PDF printable receipt file without popup blocker glitches
 */
export function downloadOrderBill(order: PastOrder) {
  const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tax_Invoice_${order.id}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #12100E;
      color: #F5EFE6;
      padding: 30px;
      margin: 0;
    }
    .receipt-box {
      max-width: 480px;
      margin: 0 auto;
      background: #1C1815;
      border: 1px solid #D9A15B;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
    }
    .brand {
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      color: #D9A15B;
      letter-spacing: 1px;
    }
    .sub-brand {
      text-align: center;
      font-size: 11px;
      color: #A89F91;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 25px;
    }
    .info-table {
      width: 100%;
      margin-bottom: 20px;
      font-size: 13px;
      color: #A89F91;
      border-bottom: 1px dashed rgba(217,161,91,0.25);
      padding-bottom: 15px;
    }
    .info-table td { padding: 4px 0; }
    .info-table td.right {
      text-align: right;
      color: #F5EFE6;
      font-weight: 600;
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
      color: #D9A15B;
      border-bottom: 1px solid rgba(217,161,91,0.2);
      padding-bottom: 8px;
    }
    .item-table td {
      padding: 10px 0;
      font-size: 13px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .item-table td.price {
      text-align: right;
      font-weight: 700;
      color: #F5EFE6;
    }
    .total-section {
      border-top: 2px solid #D9A15B;
      padding-top: 15px;
      margin-top: 15px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 6px;
      color: #A89F91;
    }
    .grand-total {
      font-size: 18px;
      font-weight: 800;
      color: #D9A15B;
      margin-top: 10px;
    }
    .footer-note {
      text-align: center;
      margin-top: 25px;
      font-size: 11px;
      color: #A89F91;
      border-top: 1px dashed rgba(217,161,91,0.25);
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
      Thank you for ordering at Brew &amp; Bean!<br>
      14 Marina Walk, Bandra West, Mumbai 400050<br>
      GSTIN: 27AAAAA0000A1Z5 · Support: hello@brewandbean.in
    </div>
  </div>
</body>
</html>
  `;

  // Create Blob & Direct Download Link
  const blob = new Blob([receiptHtml], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Bill_${order.id}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Directly downloads Table Reservation Slip Voucher
 */
export function downloadReservationSlip(res: ReservationDetails) {
  const slipHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reservation_${res.id}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #12100E;
      color: #F5EFE6;
      padding: 30px;
      margin: 0;
    }
    .slip-box {
      max-width: 460px;
      margin: 0 auto;
      background: #1C1815;
      border: 2px solid #D9A15B;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(217,161,91,0.25);
      text-align: center;
    }
    .header-tag {
      display: inline-block;
      background: rgba(217,161,91,0.15);
      color: #D9A15B;
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
      color: #F5EFE6;
      margin-bottom: 5px;
    }
    .cafe-name {
      font-size: 13px;
      color: #D9A15B;
      margin-bottom: 25px;
    }
    .grid-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      background: #12100E;
      padding: 18px;
      border-radius: 14px;
      border: 1px solid rgba(217,161,91,0.2);
      margin-bottom: 25px;
      text-align: left;
    }
    .info-item label {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      color: #A89F91;
      letter-spacing: 1px;
      margin-bottom: 3px;
    }
    .info-item span {
      font-size: 13px;
      font-weight: 700;
      color: #F5EFE6;
    }
    .notes-box {
      background: rgba(255,255,255,0.03);
      padding: 12px;
      border-radius: 10px;
      font-size: 12px;
      color: #A89F91;
      margin-bottom: 25px;
      text-align: left;
    }
    .guidelines {
      font-size: 11px;
      color: #A89F91;
      line-height: 1.5;
      border-top: 1px dashed rgba(217,161,91,0.25);
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
        <span style="color:#D9A15B;">${res.id}</span>
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
</body>
</html>
  `;

  // Create Blob & Direct Download Link
  const blob = new Blob([slipHtml], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Reservation_${res.id}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

