const mongoose = require("mongoose");
const { Schema } = mongoose;

// Branch schema
const branchSchema = new Schema({
  branchName: { type: String, required: true },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

const BranchModel = mongoose.model('Branch', branchSchema);

// Exporting models and store plans
module.exports = BranchModel;
