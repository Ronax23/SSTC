export const getSalarySlipPdfHtml = (slipData) => {
  const {
    slipNumber,
    payPeriod, // e.g., "September 2026"
    issueDate,
    company = {
      name: "ACME Industrial Solutions Pvt. Ltd.",
      address: "Plot 42, Industrial Area, Phase 1, New Delhi - 110020",
      gstin: "07AAAAA0000A1Z5"
    },
    employee = {
      code: "EMP-1024",
      name: "Rahul Sharma",
      designation: "Senior Software Engineer",
      department: "Engineering",
      bankAccount: "XXXXXXXX4821",
      pan: "ABCDE1234F"
    },
    attendance = {
      totalDays: 30,
      daysAttended: 26,
      paidLeaves: 2,
      unpaidLeaves: 2
    },
    earnings = [
      { label: "Basic Salary", amount: 45000 },
      { label: "House Rent Allowance (HRA)", amount: 18000 },
      { label: "Special Allowance", amount: 12000 },
      { label: "Conveyance Allowance", amount: 3000 }
    ],
    deductions = [
      { label: "Provident Fund (PF)", amount: 1800 },
      { label: "Employee State Insurance (ESI)", amount: 0 },
      { label: "Professional Tax (PT)", amount: 200 },
      { label: "Income Tax (TDS)", amount: 2500 }
    ],
    signatoryName = "Authorized Signatory"
  } = slipData;

  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netPayable = totalEarnings - totalDeductions;

  // Generate earnings table rows
  const maxRows = Math.max(earnings.length, deductions.length);
  let tableRows = '';
  for (let i = 0; i < maxRows; i++) {
    const earn = earnings[i] || { label: '', amount: '' };
    const ded = deductions[i] || { label: '', amount: '' };
    tableRows += `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${earn.label}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${earn.amount ? '₹' + earn.amount.toLocaleString('en-IN') : ''}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; border-left: 1px solid #e2e8f0;">${ded.label}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${ded.amount ? '₹' + ded.amount.toLocaleString('en-IN') : ''}</td>
      </tr>
    `;
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Salary Slip - ${slipNumber}</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        color: #1e293b;
        margin: 0;
        padding: 30px;
        background: #ffffff;
      }
      .slip-box {
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
    <div class="slip-box">
      <!-- Header: Company & Slip Meta -->
      <table style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
        <tr>
          <td style="vertical-align: top;">
            <h2 style="margin: 0; color: #0f172a; font-size: 22px; text-transform: uppercase;">${company.name}</h2>
            <p style="margin: 4px 0 0 0; color: #475569; font-size: 12px; line-height: 1.4;">
              ${company.address}<br>
              <strong>GSTIN:</strong> ${company.gstin}
            </p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <h3 style="margin: 0; color: #2563eb; font-size: 16px; text-transform: uppercase;">Payslip for ${payPeriod}</h3>
            <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">
              <strong>Slip No:</strong> ${slipNumber}<br>
              <strong>Issue Date:</strong> ${issueDate}
            </p>
          </td>
        </tr>
      </table>

      <!-- Employee Details & Attendance Summary -->
      <table style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 16px; font-size: 13px;">
        <tr>
          <td style="padding: 10px; vertical-align: top; width: 50%;">
            <strong>Employee Code:</strong> ${employee.code}<br>
            <strong>Name:</strong> ${employee.name}<br>
            <strong>Designation:</strong> ${employee.designation}<br>
            <strong>Department:</strong> ${employee.department}
          </td>
          <td style="padding: 10px; vertical-align: top; width: 50%; border-left: 1px solid #e2e8f0;">
            <strong>Bank A/C No:</strong> ${employee.bankAccount}<br>
            <strong>PAN:</strong> ${employee.pan}<br>
            <strong>Working Days:</strong> ${attendance.totalDays} | <strong>Attended:</strong> ${attendance.daysAttended}<br>
            <strong>Paid Leaves:</strong> ${attendance.paidLeaves} | <strong>Unpaid Leaves:</strong> ${attendance.unpaidLeaves}
          </td>
        </tr>
      </table>

      <!-- Earnings and Deductions Table -->
      <table style="border: 1px solid #e2e8f0; font-size: 13px; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f1f5f9; color: #0f172a; text-align: left; font-size: 12px; text-transform: uppercase;">
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1;">Earnings</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: right;">Amount</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; border-left: 1px solid #cbd5e1;">Deductions</th>
            <th style="padding: 8px; border-bottom: 1px solid #cbd5e1; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold; background: #f8fafc; border-top: 1px solid #cbd5e1;">
            <td style="padding: 8px;">Total Earnings (A)</td>
            <td style="padding: 8px; text-align: right; color: #16a34a;">₹${totalEarnings.toLocaleString('en-IN')}</td>
            <td style="padding: 8px; border-left: 1px solid #e2e8f0;">Total Deductions (B)</td>
            <td style="padding: 8px; text-align: right; color: #dc2626;">₹${totalDeductions.toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Net Payable Callout -->
      <table style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 6px; padding: 12px; margin-bottom: 24px;">
        <tr>
          <td style="font-size: 15px; font-weight: bold; color: #1e1b4b;">
            Net Salary Payable (A - B):
          </td>
          <td style="font-size: 18px; font-weight: bold; color: #4338ca; text-align: right;">
            ₹${netPayable.toLocaleString('en-IN')}
          </td>
        </tr>
      </table>

      <!-- Digital Signature & Footnote -->
      <table style="margin-top: 30px;">
        <tr>
          <td style="vertical-align: bottom; color: #94a3b8; font-size: 11px;">
            This is a computer-generated document and does not require a physical signature.
          </td>
          <td style="text-align: right; vertical-align: top;">
            <!-- Digital Signature Box -->
            <div style="display: inline-block; text-align: center; border: 1px dashed #cbd5e1; padding: 8px 16px; border-radius: 4px; background: #fafafa;">
              <span style="font-size: 10px; color: #16a3a0; font-weight: bold; letter-spacing: 1px;">✓ DIGITALLY SIGNED</span><br>
              <strong style="font-size: 12px; color: #0f172a;">${signatoryName}</strong><br>
              <span style="font-size: 10px; color: #64748b;">${company.name}</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
};