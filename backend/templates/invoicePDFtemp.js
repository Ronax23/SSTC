// Helper function to convert numbers to Indian Rupee Words
const numberToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const inWords = (n) => {
    if ((n = n.toString()).length > 9) return 'Overflow';
    let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n_array) return '';
    let words = '';
    words += (n_array[1] != 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
    words += (n_array[2] != 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
    words += (n_array[3] != 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
    words += (n_array[4] != 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
    words += (n_array[5] != 0) ? ((words != '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) : '';
    return words;
  };

  const amount = Math.floor(num);
  const paise = Math.round((num - amount) * 100);
  let str = 'Rupees ' + inWords(amount).trim();
  if (paise > 0) {
    str += ' and ' + inWords(paise).trim() + ' Paise';
  }
  return str + ' Only';
};

export const getTaxInvoicePdfHtml = (invoiceData) => {
  const {
    invoiceNumber,
    invoiceDate,
    gstType = "INTRA_STATE", // "INTRA_STATE" (CGST + SGST) or "INTER_STATE" (IGST)
    company = {
      name: "ACME Industrial Solutions Pvt. Ltd.",
      address: "Plot 42, Industrial Area, Phase 1, New Delhi - 110020",
      gstin: "07AAAAA0000A1Z5"
    },
    buyer = {
      name: "Apex Engineering Works",
      contactPerson: "Rajesh Kumar",
      address: "12/B, GT Road, Industrial Zone, Ludhiana, Punjab - 141003",
      gstin: "03BBBCC1111B1Z2",
      shippingAddress: "Warehouse 4, Focal Point, Ludhiana, Punjab - 141010" // Optional
    },
    items = [
      { name: "Hydro Turbine Runner Blade", hsn: "84109000", qty: 2, price: 45000, gstRate: 18 },
      { name: "CNC Machined Shaft Sleeve", hsn: "84831090", qty: 5, price: 8500, gstRate: 18 }
    ],
    signatoryName = "Authorized Signatory"
  } = invoiceData;

  // Calculate row amounts & total tax
  let subtotal = 0;
  let totalTax = 0;

  const itemRows = items.map((item, index) => {
    const itemTotal = item.qty * item.price;
    const taxAmount = (itemTotal * item.gstRate) / 100;
    subtotal += itemTotal;
    totalTax += taxAmount;

    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${index + 1}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.hsn}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.qty}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.gstRate}%</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600;">₹${itemTotal.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }).join('');

  const grandTotal = subtotal + totalTax;
  const grandTotalInWords = numberToWords(grandTotal);

  // Dynamic Tax Breakdown Logic
  let taxBreakdownHtml = '';
  if (gstType === "INTER_STATE") {
    taxBreakdownHtml = `
      <tr>
        <td style="padding: 4px 0; color: #64748b;">Integrated Tax (IGST):</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${totalTax.toLocaleString('en-IN')}</td>
      </tr>
    `;
  } else {
    const halfTax = totalTax / 2;
    taxBreakdownHtml = `
      <tr>
        <td style="padding: 4px 0; color: #64748b;">Central Tax (CGST):</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${halfTax.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b;">State Tax (SGST):</td>
        <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${halfTax.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Tax Invoice - ${invoiceNumber}</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        color: #1e293b;
        margin: 0;
        padding: 30px;
        background: #ffffff;
      }
      .invoice-box {
        max-width: 800px;
        margin: auto;
        border: 1px solid #cbd5e1;
        padding: 24px;
        border-radius: 6px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <!-- Top Bar / Header -->
      <table style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <tr>
          <td style="vertical-align: top;">
            <h2 style="margin: 0; color: #0f172a; font-size: 22px; text-transform: uppercase;">TAX INVOICE</h2>
            <p style="margin: 4px 0 0 0; color: #2563eb; font-weight: bold; font-size: 14px;">${company.name}</p>
            <p style="margin: 2px 0 0 0; color: #475569; font-size: 12px; line-height: 1.4;">
              ${company.address}<br>
              <strong>GSTIN:</strong> ${company.gstin}
            </p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
              <strong>Invoice No:</strong> ${invoiceNumber}<br>
              <strong>Date:</strong> ${invoiceDate}
            </p>
          </td>
        </tr>
      </table>

      <!-- Billing & Shipping Details -->
      <table style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 16px; font-size: 13px;">
        <tr>
          <!-- Billed To / Seller Address -->
          <td style="padding: 12px; vertical-align: top; width: 50%;">
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">Billed To (Buyer):</strong><br>
            <strong style="color: #0f172a; font-size: 14px;">${buyer.name}</strong><br>
            <span style="color: #475569;">
              <strong>Attn:</strong> ${buyer.contactPerson}<br>
              ${buyer.address}<br>
              <strong>GSTIN:</strong> ${buyer.gstin}
            </span>
          </td>

          <!-- Shipping Address (If differs) -->
          <td style="padding: 12px; vertical-align: top; width: 50%; border-left: 1px solid #e2e8f0;">
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">Shipped To:</strong><br>
            <span style="color: #475569;">
              ${buyer.shippingAddress ? buyer.shippingAddress : '<em>Same as Billing Address</em>'}
            </span>
          </td>
        </tr>
      </table>

      <!-- Items Table -->
      <table style="border: 1px solid #e2e8f0; font-size: 13px; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f1f5f9; color: #0f172a; text-align: left; font-size: 12px; text-transform: uppercase;">
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: center;">#</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1;">Item Description</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: center;">HSN</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: center;">Qty</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: right;">Unit Price</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: center;">GST %</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <!-- Calculation & Tax Summary -->
      <table style="margin-bottom: 16px;">
        <tr>
          <td style="width: 55%; vertical-align: top; padding-right: 16px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px;">
              <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">Amount in Words:</strong>
              <p style="margin: 4px 0 0 0; color: #0f172a; font-size: 13px; font-weight: bold;">${grandTotalInWords}</p>
            </div>
          </td>
          <td style="width: 45%; vertical-align: top;">
            <table style="font-size: 13px;">
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Subtotal:</td>
                <td style="padding: 4px 0; text-align: right; font-weight: 600;">₹${subtotal.toLocaleString('en-IN')}</td>
              </tr>
              ${taxBreakdownHtml}
              <tr style="border-top: 2px solid #0f172a;">
                <td style="padding: 8px 0; font-size: 15px; font-weight: bold; color: #0f172a;">Total Payable:</td>
                <td style="padding: 8px 0; text-align: right; font-size: 15px; font-weight: bold; color: #2563eb;">₹${grandTotal.toLocaleString('en-IN')}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Stamp and Signature Block -->
      <table style="margin-top: 30px;">
        <tr>
          <td style="vertical-align: bottom; color: #94a3b8; font-size: 11px; width: 60%;">
            Terms & Conditions:<br>
            1. Goods once sold will not be taken back.<br>
            2. Payment due within 15 days of invoice date.
          </td>
          <td style="text-align: right; vertical-align: top; width: 40%;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #0f172a;">For ${company.name}</p>
            
            <!-- Company Stamp & Digital Signature Box -->
            <div style="display: inline-block; text-align: center; border: 1px dashed #cbd5e1; padding: 12px 20px; border-radius: 6px; background: #fafafa;">
              <div style="border: 2px solid #1d4ed8; color: #1d4ed8; border-radius: 50%; width: 50px; height: 50px; line-height: 50px; margin: 0 auto 6px auto; font-size: 10px; font-weight: bold; transform: rotate(-10deg);">
                STAMP
              </div>
              <span style="font-size: 10px; color: #16a34a; font-weight: bold; letter-spacing: 1px;">✓ DIGITALLY SIGNED</span><br>
              <strong style="font-size: 12px; color: #0f172a;">${signatoryName}</strong>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
};