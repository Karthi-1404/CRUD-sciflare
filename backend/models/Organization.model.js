import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrganizationSchema = new Schema({
  orgName: {
    type: String,
    required: true,
    unique:true
  },
  branchName: {
    type: String
  },
  description: {
    type: String
  }
},{timestamps:true});

const Organization = mongoose.model('Organization', OrganizationSchema);

export default Organization;