export const getRegistrationOtpTemplate = (otp, name) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
    <h2 style="color: #1e293b; text-align: center;">Verify Your Account</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Use the following code to complete your registration. This code expires in 10 minutes:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="background: #eef2ff; color: #4f46e5; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 10px 20px; border-radius: 6px;">${otp}</span>
    </div>
  </div>
`;