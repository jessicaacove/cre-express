const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myInvestmentSchema = new Schema(
  {
    investmentPercentage: {
      type: Number,
      required: true
    },
    // project: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Project'
    // },
    // investor: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Investor'
    // }
  },
  {
    timestamps: true
  }
);

const InvestmentModel = mongoose.model('Investment', myInvestmentSchema);

module.exports = InvestmentModel;
