require("dotenv").config();

const otpMailTemplate = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello, ${user.name}!</h2>
      <p>
        Welcome to <strong>Link India</strong>. Your OTP for verification is:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <h1 style="color: #113c3d;">${user.otp}</h1>
      </div>
      <p>
        Enter this OTP <a href='${process.env.FRONTEND_URL}/auth/verify?email=${user.email}' style="color: #113c3d;">here</a> to complete the verification process.
      </p>
      <p>If you have any questions, feel free to reach out to our support team at 
      <a href="mailto:support@LinkIndia.com" style="color: #113c3d;">support@LinkIndia.com</a>.</p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const welcomeMailTemplate = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello, ${user.name}!</h2>
      <p>
        Welcome to <strong>Link India</strong>. Your account has been verified successfully.
      </p>
      <p>
        You can now <strong>Link India</strong> through our services and find the best 
        <a href='${process.env.FRONTEND_URL}/companies' target='_blank' style="color: #113c3d;">companies</a> in your area.
      </p>
      <p>If you have any questions, feel free to reach out to our support team at 
      <a href="mailto:support@LinkIndia.com" style="color: #113c3d;">support@LinkIndia.com</a>.</p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const forgotPasswordMailTemplate = (user) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello, ${user.name}!</h2>
      <p>
        It seems you've requested to reset your password for your <strong>Link India</strong> account.
      </p>
      <p>
        Click the link below to reset your password:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href='${process.env.FRONTEND_URL}/auth/reset-password?email=${user.email}' 
           style="background-color: #113c3d; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
          Reset My Password
        </a>
      </div>
      <p>If you did not request this, please ignore this email or contact support immediately.</p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const enquiryResponseMailTemplate = (user, response) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello, ${user.name}!</h2>
      <p>
        Thank you for contacting <strong>Link India</strong>. We have reviewed your enquiry and here is our response:
      </p>
      <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
        <strong>${response}</strong>
      </div>
      <p>If you have further questions, feel free to reach out.</p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const listingCompleteMailTemplate = (companyName) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello!</h2>
      <p>
        Your company <strong>${companyName}</strong> has been updated successfully. 
      </p>
      <p>
        Please wait while we verify your changes. You'll be notified once your company is approved.
      </p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const listingConfirmationMailTemplate = (action, companyName) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #113c3d;">Hello, ${companyName}!</h2>
      <p>
        ${action === "approve"
          ? "We are pleased to inform you that your company has been approved and is now active on our platform. You can now access all features and start engaging with users."
          : "We regret to inform you that your company has been rejected. Please review the submission guidelines and make the necessary changes before resubmitting."}
      </p>
      <p>Best regards,<br>Link India Team</p>
      <hr>
    </div>
  `;
};

const enquiryAdminResponseMailTemplate = (user, response) => {
  return `Hello <strong>${user.name}</strong>,<br/>We have received your enquiry and here is the response:<br/><strong>${response}</strong><br/>Thank you for contacting us.<br/>Regards,`;
};

const enquiryForwardMailTemplate = (company, message) => {
  return `Hello <strong>${company.name}</strong>,<br/>You have received a new enquiry:<br/><strong>${message}</strong><br/> View it <a href='${process.env.FRONTEND_URL}/companies/${company.slug}/enquiries'>here</a>. <br/>Regards,`;
};

const weeklyMailCronTemplate = (user) => {
  return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #113c3d;">Hello, ${user?.name}!</h2>
          <p>
            We noticed that you haven't listed your company on our platform yet. 
            By listing your company, you'll have the opportunity to:
          </p>
          <ul style="margin-left: 20px;">
            <li>📈 Attract more customers</li>
            <li>🛒 Showcase your products or services</li>
            <li>🌐 Increase your online visibility</li>
          </ul>
          <p>
            Don’t miss out on this opportunity to grow your business. 
            Click the button below to list your company now:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href='${process.env.FRONTEND_URL}/companies/add' 
               style="background-color: #113c3d; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
              List My Company
            </a>
          </div>
          <p>If you have any questions, feel free to reach out to our support team at 
          <a href="mailto:support@Link India.com" style="color: #113c3d;">support@Link India.com</a>.</p>
          <p>Best regards,<br>Your App Team</p>
          <hr>
        </div>
      `;
};

const monthlyMailCronTemplate = (user, category) => {
  return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        
        <h2 style="color: #113c3d;">Hello, ${user?.name}!</h2>
        <p>
          We hope you're enjoying our platform. This month, we have some exciting updates and promotions in the <strong>${category}</strong> category that we think you'll love!
        </p>
        <p>
          Check out the latest offerings and take advantage of special deals:
        </p>
        <ul style="margin-left: 20px;">
          <li>🔥 Exclusive discounts on top products</li>
          <li>🆕 New arrivals and trending items</li>
          <li>⭐ Top-rated services and reviews</li>
        </ul>
        <p>
          Don't miss out on these opportunities to discover great products and services. Click the button below to Link India the <strong>${category}</strong> category now:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href='${process.env.FRONTEND_URL}/companies/categories/${category}' 
             style="background-color: #113c3d; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
            Link India ${category} on the Link India App.
          </a>
        </div>
        <p>If you have any questions, feel free to reach out to our support team at 
        <a href="mailto:support@Link India.com" style="color: #113c3d;">support@Link India.com</a>.</p>
        <p>Best regards,<br>Link India Team</p>
        <hr>
      </div>
    `;
};

module.exports = {
  otpMailTemplate,
  welcomeMailTemplate,
  forgotPasswordMailTemplate,
  enquiryResponseMailTemplate,
  listingCompleteMailTemplate,
  listingConfirmationMailTemplate,
  enquiryAdminResponseMailTemplate,
  enquiryForwardMailTemplate,
  weeklyMailCronTemplate,
  monthlyMailCronTemplate,
};
