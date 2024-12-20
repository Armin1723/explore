require("dotenv").config();

const cron = require("node-cron");
const User = require("../models/userModel");
const { sendMail } = require("../helpers");
const Review = require("../models/reviewModel");
const { sendNotification } = require("../services/notificationService");

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
          <a href="mailto:support@Link India.com" style="color: #113c3d;">support@Link India.com</a>.</p>
          <p>Best regards,<br>Your App Team</p>
          <hr>
        </div>
      `;

      //Send email to user
      sendMail(user?.email, "Reminder to List Your Company", message);

      // Send Push Notification to user
      if (user.fcmToken) {
          const title = `List Your Company ${user?.name.split(' ')[0]}`; 
          const body = "Don't miss out on the opportunity to grow your business. List your company on our platform now!";
        
        await sendNotification(user?.fcmToken, title, body);
      }
    });
  } catch (error) {
    console.error(
      "Error occurred while sending weekly push notifications:",
      error
    );
  }
  });
};

const monthlyPromotionalMailCron = async () => {
  try {
    cron.schedule("0 9 1 * *", async () => {
      // Send monthly promotional mails to all users
      const reviews = await Review.find().populate("company", "category");
      const uniqueUserReviews = reviews.reduce((acc, review) => {
        if (!acc.some((r) => r.user.toString() === review.user.toString())) {
          acc.push(review);
        }
        return acc;
      }, []);

      uniqueUserReviews.map(async (review) => {
        const user = await User.findById(review.user);
        const category = review.company.category;

        //write message to check out a particular category based on user has reviewed on which category and, if they havent reviewed any category  then chose any cateegory
        const message = `
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

        //Send email to user
        sendMail(user?.email, "Dont miss out.", message);
      });
    });
  } catch (error) {
    console.error(
      "Error occurred while sending monthly promotional mails:",
      error
    );
  }
};

module.exports = {
  weeklyPushNotificationCron,
  monthlyPromotionalMailCron,
};
