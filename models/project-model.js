const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    projectType: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    totalCost: {
      type: Number,
      required: true
    },
    investments: [
      {
      investmentPercentage: {
        type: Number
      },
      investorName: {
        type: String
      },
      investorId: {
        type: Schema.Types.ObjectId
      }
    }
    ],
    debt: [
      {
      debtPercentage: {
        type: Number
      },
      institutionName: {
        type: String,
      },
      lenderId: {
        type: String
      }
      // contactFirstName: {
      //   type: String,
      //   required: true
      // },
      // contactLastName: {
      //   type: String,
      //   required: true
      // }
    }
    ],
    mainImage: {
      type: String,
      default: '/images/logoimg.png'
    }
  },
  {
    timestamps: true
  }
);

const ProjectModel = mongoose.model('Project', myProjectSchema);

module.exports = ProjectModel;
