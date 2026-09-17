export const getInvoiceEmailTemplate = (name, invoiceNumber, date, amount) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #334155;">
    <p style="font-size: 15px; margin-top: 0;">Hi <strong>${name}</strong>,</p>
    
    <p style="font-size: 15px; line-height: 1.5;">
      As per your request, we have sent you your invoice copy over mail attached below.
    </p>

    <!-- Small Summary Box -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin: 20px 0;">
      <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #334155;">
        <tr>
          <td><strong>Invoice No:</strong></td>
          <td align="right">${invoiceNumber}</td>
        </tr>
        <tr>
          <td><strong>Dated:</strong></td>
          <td align="right">${date}</td>
        </tr>
        <tr>
          <td><strong>Amount:</strong></td>
          <td align="right"><strong>${amount}</strong></td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
      Please check the attached PDF for full details.
    </p>
  </div>
`;