const { body } = require("express-validator");

module.exports = [
  body("storePhone")
    .matches(/^\+([1-9]{1,4})\d{1,14}$/)
    .withMessage(
      "Phone number must be in E.164 format (+<country code><subscriber number>)"
    )
    .isLength({ min: 10, max: 15 })
    .withMessage(
      "Phone number must be between 10 to 15 digits long (excluding any spaces or formatting characters)"
    ),

  body("storeEmail").isEmail().withMessage("Email should be valid"),

  // OWNER PLUS SELLER BUYER INFO

  body("ownerPhone")
    .matches(/^\+([1-9]{1,4})\d{1,14}$/)
    .withMessage(
      "Phone number must be in E.164 format (+<country code><subscriber number>)"
    )
    .isLength({ min: 10, max: 15 })
    .withMessage(
      "Phone number must be between 10 to 15 digits long (excluding any spaces or formatting characters)"
    ),

  body("ownerEmail").isEmail().withMessage("Email should be valid"),

  body("ownerCnicNumber")
    .matches(/^\d{5}-\d{7}-\d{1}$/)
    .withMessage("CNIC must follow the format XXXXX-XXXXXXX-X"),

  // SELLER INFO

  // EXPERIENCE

  body("experience")
    .isArray()
    .withMessage("Experience should be an array")
    .custom((value) => {
      // Custom validation for each item in the experience array
      value.forEach((experience, index) => {
        // Validate required fields for each job experience
        if (
          !experience.repairerJobTitle ||
          !experience.repairerJobType ||
          !experience.repairerCompanyName ||
          !experience.repairerStartingDate ||
          !experience.repairerEndingDate ||
          !experience.repairerJobLocation ||
          !experience.repairerExperienceDescription
        ) {
          throw new Error(
            `Experience entry at index ${index} is missing required fields`
          );
        }
      });
      return true;
    }),

  // Validate each field in each object in the experience array
  body("experience.*.repairerJobTitle")
    .notEmpty()
    .withMessage("Job Title is required"),
  body("experience.*.repairerJobType")
    .notEmpty()
    .withMessage("Job Type is required"),
  body("experience.*.repairerCompanyName")
    .notEmpty()
    .withMessage("Company Name is required"),
  body("experience.*.repairerStartingDate")
    .isDate()
    .withMessage("Starting Date must be a valid date in the format YYYY-MM-DD"),
  body("experience.*.repairerEndingDate")
    .isDate()
    .withMessage("Ending Date must be a valid date in the format YYYY-MM-DD"),
  body("experience.*.repairerJobLocation")
    .notEmpty()
    .withMessage("Job Location is required"),
  body("experience.*.repairerExperienceDescription")
    .notEmpty()
    .withMessage("Experience description is required"),



  //EDUCATION

  // Validation for the education array

  body("education")
    .isArray()
    .withMessage("Education should be an array")
    .custom((value) => {
      // Custom validation for each item in the education array
      value.forEach((education, index) => {
        // Validate each object in the array
        if (
          !education.repairerDegree ||
          !education.repairerInstitute ||
          !education.repairerDegreeStartingDate ||
          !education.repairerDegreeEndingDate ||
          !education.repairerCertificate ||
          !education.repairerDegreeDescription
        ) {
          throw new Error(
            `Education entry at index ${index} is missing required fields`
          );
        }
      });
      return true;
    }),

  // Validate the structure of each individual education item in the array
  body("education.*.repairerDegree")
    .notEmpty()
    .withMessage("Degree is required"),
  body("education.*.repairerInstitute")
    .notEmpty()
    .withMessage("Institute is required"),
  body("education.*.repairerDegreeStartingDate")
    .isDate()
    .withMessage("Starting Date must be a valid date in the format YYYY-MM-DD"),
  body("education.*.repairerDegreeEndingDate")
    .isDate()
    .withMessage("Ending Date must be a valid date in the format YYYY-MM-DD"),
  body("education.*.repairerCertificate")
    .notEmpty()
    .withMessage("Certificate is required"),
  body("education.*.repairerDegreeDescription")
    .notEmpty()
    .withMessage("Degree description is required"),
  
];
