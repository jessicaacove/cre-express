const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myInvestmentSchema = new Schema(
  {
    investmentPercentage: {
      type: Number,
      required: true
    },
    projectId: {
      type: String
    },
    investorId: {
      type: String
    },
    investorName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const InvestmentModel = mongoose.model('Investment', myInvestmentSchema);

module.exports = InvestmentModel;
