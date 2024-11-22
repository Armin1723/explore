const { sendMail } = require("../helpers");
const Advertisement = require("../models/advertisementModel");
const Company = require("../models/companyModel");

const User = require("../models/userModel");

const cloudinary = require("cloudinary");

const createAdvertisement = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("company");
    if (!user.company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    if (user.company.status !== "active") {
      return res
        .status(400)
        .json({ success: false, message: "Company is not active" });
    }

    if (user.company.advertisement) {
      return res
        .status(400)
        .json({ success: false, message: "Advertisement already exists" });
    }

    const advertisement = await Advertisement.create({
      company: user.company._id,
      amount: 500,
    });

    // payment gateway integration
    //TODO

    if (req.files && req.files.banner) {
      const banner = req.files.banner;
      if (banner) {
        const result = await cloudinary.v2.uploader.upload(
          banner.tempFilePath,
          {
            folder: "banners",
          }
        );
        advertisement.banner = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
    }

    await advertisement.save();

    const company = await Company.findById(user.company._id);
    company.advertisement = advertisement._id;
    await company.save();

    await user.save();

    res.status(201).json({ success: true, advertisement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmAdvertisement = async (req, res) => {
  try {
    // const { transactionId } = req.body;

    // const advertisement = await Advertisement.findOne({transactionId});
    // if (!advertisement) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Advertisement not found" });
    // }

    // if (advertisement.paymentStatus === "completed") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Advertisement already confirmed",
    //   });
    // }

    // const { orderID } = req.body;

    // const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // request.requestBody({});
    // const capture = await client.execute(request);
    // console.log(capture.result)

    // advertisement.active = true;
    // advertisement.paymentStatus = "completed";
    // advertisement.startDate = Date.now();
    // advertisement.endDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
    // await advertisement.save();

    // const company = await Company.findById(advertisement.company).select(
    //   "email name advertisement"
    // );

    // company.advertisement = advertisement._id;

    const user = await User.findById(req.user.id).populate("company");

    const advertisement = await Advertisement.findById(
      user.company.advertisement
    );

    advertisement.active = true;
    advertisement.paymentStatus = "completed";

    await advertisement.save();

    const message = `Your advertisement has been confirmed for ${
      user.company.name
    } . Transaction ID: ${
      user.company?.advertisement?.transactionId || "12345"
    }`;
    sendMail(user.company.email, message, "Advertisement Confirmation");

    res.status(200).json({
      success: true,
      message: "Advertisement confirmed successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBanners = async (req, res) => {
  try {
    const {forAdmin = false} = req.query;
    const company = await Advertisement.find({ active: true }, { company: 1 })
      .populate({
        path: "company",
        select: "name banner gallery",
      })
      .sort({ startDate: -1 })
      .limit(5);

    const banners = company.map((ad) => {
      if (ad.company) {
        return {
          image: ad.company.banner.url || ad.company.gallery[0].url,
          name: ad.company.name,
        };
      }
    });

    let regularBanners = [];

    if((!banners || banners.length < 4) && !forAdmin) {
      const regularCompanies = await Company.find({ status: "active" })
        .select("name banner gallery")
        .sort({ createdAt: -1 })
        .limit(4 - banners.length);

      regularBanners = regularCompanies.map((company) => {
        return {
          image: company.banner.url || company.gallery[0].url,
          name: company.name,
        };
      });

    }

    res.status(200).json({ success: true, banners: [...banners, ...regularBanners] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeBanner = async (req, res) => {
  try {
    const { name } = req.params;

    const company = await Company.findOne({ name });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    const advertisement = await Advertisement.findOne({ company: company._id });
    if (!advertisement) {
      return res
        .status(404)
        .json({ success: false, message: "Advertisement not found" });
    }
    advertisement.featured = false;
    await advertisement.save();
    res.status(200).json({ success: true, message: "Banner removed" }); 
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
} 

module.exports = {
  createAdvertisement,
  confirmAdvertisement,
  getBanners,
  removeBanner,
};
