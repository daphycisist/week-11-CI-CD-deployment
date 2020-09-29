import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const organizationSchema = new mongoose.Schema({
  organization: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  products: [String],
  marketvalue: Number,
  address: String,
  ceo: String,
  country: String,
  noOfEmployees: Number,
  employees: [String],
});

organizationSchema.plugin(mongooseUniqueValidator);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization ;
