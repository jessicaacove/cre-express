const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myLenderSchema = new Schema(
  {
    institutionName: {
      type: String,
      required: true
    },
    contactFirstName: {
      type: String,
      required: true
    },
    contactLastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    projectSizeMin: {
      type: Number,
      required: true
    },
    projectSizeMax: {
      type: Number,
    },
    geographicalArea: {
      type: [String]
    },
    projectTypes: {
      type: [String]
    },
    debtIds: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

const LenderModel = mongoose.model('Lender', myLenderSchema);

module.exports = LenderModel;
