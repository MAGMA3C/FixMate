const mongoose = require('mongoose');

const { Schema } = mongoose;

const repairerSchema = new Schema({
  repairerFirstName: { type: String, required: true },
  repairerLastName: { type: String, required: true },
  repairerPhone: { type: String, required: true },
  repairerAddress: { type: String, required: true },
  repairerEmail: { type: String, required: true },
  repairerDOB: { type: String, required: true },  // Changed to Date
  repairerCnicNumber: { 
    type: String, 
    // required: true, 
    match: [/^\d{5}-\d{7}-\d$/, 'Please fill a valid CNIC number']  // Optional regex for validation
  },
  repairerCnicFront: { type: String, required: true },
  repairerCnicBack: { type: String, required: true },
  repairerVerifiedCnic: { type: String, required: true },  // Fixed typo here
  repairerQualification: [{
    repairerDegree: String,
    repairerDnstitute: String,
    repairerDegreeStartingDate: String,
    repairerDegreeEndingDate: String,
    repairerCertificate: String,
    repairerDegreeDescription: String
  }],
  repairerExperience: [{
    repairerJobTitle: String,
    repairerJobType: String,
    repairerStartingDate: String,
    repairerEndingDate: String,
    repairerJobLocation: String,
    repairerCompanyName: String,
    repairerExperienceDescription: String
  }]
});

module.exports = mongoose.model('Repairer', repairerSchema);
