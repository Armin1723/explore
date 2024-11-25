require("dotenv").config();

const cron = require("node-cron");
const User = require("../models/userModel");
const { sendMail } = require("../helpers");

const weeklyPushNotificationCron = async () => {
    
  cron.schedule("0 9 * * 1", async () => {
    try {
      // Send weekly mails to all users who have registered but not listed yet.
      const usersWithNoListing = await User.find({
        company: { $exists: false },
      });

      usersWithNoListing.forEach(async (user) => {
        const message = `
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
          <a href="mailto:support@explore.com" style="color: #113c3d;">support@explore.com</a>.</p>
          <p>Best regards,<br>Your App Team</p>
          <hr>
        </div>
      `;

        //Send email to user
        sendMail(user?.email, "Reminder to List Your Company", message);
      });
    } catch (error) {
      console.error(
        "Error occurred while sending weekly push notifications:",
        error
      );
    }
  });
};

module.exports = weeklyPushNotificationCron;
