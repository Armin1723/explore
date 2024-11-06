const { sendMail } = require("../helpers");
const Advertisement = require("../models/advertisementModel");
const Company = require("../models/companyModel");

const paypal = require("@paypal/checkout-server-sdk");
const User = require("../models/userModel");

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

const createAdvertisement = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).populate("company");
    if (!user.company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const advertisement = await Advertisement.create({
      company: user.company._id,
      amount: 5,
    });

    // payment gateway integration
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "5.00",
          },
        },
      ],
    });

    const order = await client.execute(request);

    advertisement.transactionId = order.result.id;
    await advertisement.save();

    user.company.advertisement = advertisement._id;

    await user.save();

    res.status(201).json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmAdvertisement = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const advertisement = await Advertisement.findOne({transactionId});
    if (!advertisement) {
      return res
        .status(404)
        .json({ success: false, message: "Advertisement not found" });
    }

    if (advertisement.paymentStatus === "completed") {
      return res.status(400).json({
        success: false,
        message: "Advertisement already confirmed",
      });
    }

    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await client.execute(request);
    console.log(capture.result)

    advertisement.active = true;
    advertisement.paymentStatus = "completed";
    advertisement.startDate = Date.now();
    advertisement.endDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
    await advertisement.save();

    const company = await Company.findById(advertisement.company).select(
      "email name advertisement"
    );

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
    const company = await Advertisement.find({ active: true }, { company: 1 })
      .populate({
        path: "company",
        select: "name logo banner",
      })
      .sort({ startDate: -1 })
      .limit(5);
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAdvertisement,
  confirmAdvertisement,
  getBanners,
};
