const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myInvestorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    // investments: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Investment'
    // }
  },
  {
    timestamps: true
  }
);

const InvestorModel = mongoose.model('Investor', myInvestorSchema);

module.exports = InvestorModel;
