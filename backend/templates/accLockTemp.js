export const getAccountLockedTemplate = (name, unlockTime, supportEmail = "support@yourapp.com") => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #334155;">
    <h2 style="color: #dc2626; text-align: center; margin-top: 0; font-size: 20px;">Account Temporarily Locked</h2>
    
    <p style="font-size: 15px; margin-top: 0;">Hi <strong>${name}</strong>,</p>
    
    <p style="font-size: 15px; line-height: 1.5;">
      Your account has been temporarily locked due to multiple incorrect password attempts. This is a security measure to protect your data.
    </p>

    <!-- Details Box -->
    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px 16px; margin: 20px 0;">
      <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #991b1b;">
        <tr>
          <td><strong>Status:</strong></td>
          <td align="right">Locked</td>
        </tr>
        <tr>
          <td><strong>Auto-Unlock At:</strong></td>
          <td align="right"><strong>${unlockTime}</strong></td>
        </tr>
      </table>
    </div>

    <p style="font-size: 14px; line-height: 1.5;">
      You can try logging in again after the time specified above, or use the password reset option if you need immediate access.
    </p>

    <p style="font-size: 13px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0;">
      If you did not attempt to sign in, please contact our support team immediately at <a href="mailto:${supportEmail}" style="color: #4f46e5; text-decoration: none;">${supportEmail}</a>.
    </p>
  </div>
`;