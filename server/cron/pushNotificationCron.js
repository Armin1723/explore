require("dotenv").config();

const cron = require("node-cron");
const User = require("../models/userModel");
const { sendMail } = require("../helpers");
const Review = require("../models/reviewModel");
const { weeklyMailCronTemplate } = require("../templates/email");

const weeklyPushNotificationCron = async () => {
  cron.schedule("0 9 * * 1", async () => {
  try {
    // Send weekly mails to all users who have registered but not listed yet.
    const usersWithNoListing = await User.find({
      company: { $exists: false },
    });

    usersWithNoListing.forEach(async (user) => {
      const message = weeklyMailCronTemplate(user);

      //Send email to user
      sendMail(user?.email, "Reminder to List Your Company", message);

      // TODO: integrate Push Notification to user
      
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
        const message = monthlyMailCronTemplate(user, category);

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
