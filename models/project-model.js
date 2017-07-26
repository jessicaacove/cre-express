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
    // investments: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Investment'              // "ref" is the string name of a model that the ID refers to           // you NEED "ref" to use "populate()"
    // },
    // Debt: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Loan'
    // },
    mainImage: {
        type: String,
        default: '/images/logoimg.png'
    }
    // detailImages: {
    //     type: [String]
    // }
  },
  {
    timestamps: true
  }
);

const ProjectModel = mongoose.model('Project', myProjectSchema);

module.exports = ProjectModel;
