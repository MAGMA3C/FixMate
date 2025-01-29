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
];
