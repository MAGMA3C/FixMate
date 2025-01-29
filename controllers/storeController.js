const catchAsyncError = require("../middleware/utilities/catch-async-errors");

const HttpsErrors = require("../middleware/utilities/http-errors");

const { validationResult } = require("express-validator");

const STOREMODEL = require("../model/storeModel");

const OWNERMODEL = require("../model/ownerModel");

const SELLERMODEL = require("../model/sellerModel");

const REPAIRERMODEL = require("../model/repairerModel");

const BRANCHMODEL = require("../model/branchModel");

module.exports.createStore = catchAsyncError(async (req, res, next) => {
  const {
    // BUSINESS INFO

    businessName,
    logo,
    storePhone,
    storeEmail,
    businessRegistration,
    socialMedia,
    fullAddress,
    country,
    city,
    area,
    lat,
    long,
    storeType,

    // OWNER PLUS SELLER BUYER INFO

    ownerFirstName,
    ownerLastName,
    ownerPhone,
    ownerAddress,
    ownerEmail,
    ownerDOB,
    ownerCnicNumber,
    ownerCnicFront,
    ownerCnicBack,
    ownerVerifiedCnic,

    // SELLER INFO

    // EXPERIENCE

    // repairerJobTitle,
    // repairerJobType,
    // repairerCompanyName,
    // repairerStartingDate,
    // repairerEndingDate,
    // repairerJobLocation,
    // repairerExperienceDescription,

    experience,

    //EDUCATION

    // repairerDegree,
    // repairerInstitute,
    // repairerDegreeStartingDate,
    // repairerDegreeEndingDate,
    // repairerCertificate,
    // repairerDegreeDescription,

    education
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const owner = await OWNERMODEL.create({
    ownerFirstName,
    ownerLastName,
    ownerPhone,
    ownerAddress,
    ownerEmail,
    ownerDOB,
    ownerCnicNumber,
    ownerCnicFront,
    ownerCnicBack,
    ownerVerifiedCnic,
  });

  if (storeType == "SINGLE_EMPLOYEE") {
    // IN THIS STORE OUR OWNER IS OUR SELLER

    const repairer = await REPAIRERMODEL.create({
      repairerFirstName: ownerFirstName,
      repairerLastName: ownerLastName,
      repairerPhone: ownerPhone,
      repairerAddress: ownerAddress,
      repairerEmail: ownerEmail,
      repairerDOB: ownerDOB,
      repairerCnicNumber: ownerCnicNumber,
      repairerCnicFront: ownerCnicFront,
      repairerCnicBack: ownerCnicBack,
      repairerVerifiedCnic: ownerVerifiedCnic,
      repairerQualification: education,
      repairerExperience: experience
    });

    const branch = await BRANCHMODEL.create({
      branchName: businessName,
      location: fullAddress,
      lat,
      long,
    });

    const store = await STOREMODEL.create({
      businessName,
      logo,
      storePhone,
      storeEmail,
      businessRegistration,
      socialMedia,
      fullAddress,
      country,
      city,
      area,
      lat,
      long,
      owner: owner._id,
      sellers: [],
      repairers: [repairer._id],
      branches: [branch._id],
      numberOfEmployees: 1,
      plan: storeType,
    });

    res
      .status(200)
      .json({ message: "Single Person Store Created !!", store: store });
  }
});
