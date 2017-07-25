const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myLoanSchema = new Schema(
  {
    debtPercentage: {
      type: Number,
      required: true
    },
    projectId: {
      type: String
    },
    projectName: {
      type: String
    },
    lenderId: {
      type: String
    },
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
  },
  {
    timestamps: true
  }
);

const LoanModel = mongoose.model('Loan', myLoanSchema);

module.exports = LoanModel;
