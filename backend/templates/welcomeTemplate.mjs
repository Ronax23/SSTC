export const getWelcomeTemplate = (name) => `
<body style="margin: 0; padding: 30px 10px; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <div style="max-width: 460px; margin: 0 auto; padding: 32px 28px; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px;">
    
    <!-- Header with Checkmark Badge -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; padding: 12px; background: rgba(34, 197, 94, 0.1); border-radius: 50%;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2 style="margin: 16px 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(135deg, #4ade80 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #4ade80;">
        Welcome, ${name}!
      </h2>
      <p style="margin: 0; color: #94a3b8; font-size: 15px; line-height: 1.5;">
        Your account has been successfully verified and activated.
      </p>
    </div>

    <!-- Divider -->
    <div style="height: 1px; background-color: #334155; margin: 24px 0;"></div>

 
    <!-- Feature Bullet Point 2 -->
    <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
      <div style="margin-right: 12px; margin-top: 2px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <div>
        <strong style="color: #f1f5f9; font-size: 14px; display: block; margin-bottom: 2px;">Secure Account Protection</strong>
        <span style="color: #94a3b8; font-size: 13px; line-height: 1.5; display: block;">Your login credentials and data are encrypted and monitored with active security protocols.</span>
      </div>
    </div>

    <!-- Security Footer Notice -->
    <div style="background-color: #0f172a; padding: 14px 16px; border-radius: 8px; border: 1px solid #1e293b;">
      <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5;">
        <strong style="color: #94a3b8;">Security Notice:</strong> If you did not create this account, please disregard this email or notify our support team immediately.
      </p>
    </div>

  </div>

</body>`;