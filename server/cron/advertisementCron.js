const cron = require("node-cron");
const Advertisement = require("../models/advertisementModel");

const advertisementCron = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();

      // Update advertisements where endDate is less than or equal to the current date to inactive
      const result = await Advertisement.updateMany(
        { endDate: { $lte: currentDate } },
        { $set: { active: false } }
      );
      console.log(`${result.modifiedCount} advertisements marked as inactive.`);
    } catch (error) {
      console.error(
        "Error occurred while updating expired advertisements:",
        error
      );
    }
  });
};

module.exports = advertisementCron;
