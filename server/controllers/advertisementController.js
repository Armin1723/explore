const { sendMail } = require("../helpers");
const Advertisement = require("../models/advertisementModel");
const Company = require("../models/companyModel");

const createAdvertisement = async (req, res) => {
  try {
    const { companyId, amount } = req.body;

    if (!companyId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Company Id and amount are required",
      });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const advertisement = await Advertisement.create({
      company: companyId,
      amount,
    });

    company.advertisement = advertisement._id;

    await company.save();

    //TODO: payment gateway integration

    res.status(201).json({ success: true, advertisement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmAdvertisement = async (req, res) => {
    try {
        const { advertisementId } = req.body;
    
        const advertisement = await Advertisement.findById(advertisementId);
        if (!advertisement) {
        return res
            .status(404)
            .json({ success: false, message: "Advertisement not found" });
        }

        if(advertisement.paymentStatus === "completed"){
            return res.status(400).json({
                success: false,
                message: "Advertisement already confirmed",
            });
        }
    
        advertisement.active = true;
        advertisement.paymentStatus = "completed";
        advertisement.transactionId = "1234567890";
        advertisement.startDate = Date.now();
        advertisement.endDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
        await advertisement.save();

        const company = await Company.findById(advertisement.company).select('email name advertisement');

        company.advertisement = advertisement._id;

        const message = `Your advertisement has been confirmed for ${company.name} . Transaction ID: ${advertisement.transactionId}`;
        sendMail(company.email, message, "Advertisement Confirmation");
    
        res.status(200).json({
        success: true,
        message: "Advertisement confirmed successfully",
        advertisement,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBanners = async (req, res) => {
    try {
        const company = await Advertisement.find({ active: true },{company : 1}).populate({
          path: "company",
          select: "name logo banner",
        }).sort({ startDate: -1 }).limit(5);
        res.status(200).json({ success: true, company });
      }
      catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };

module.exports = {
  createAdvertisement,
  confirmAdvertisement,
  getBanners,
};
