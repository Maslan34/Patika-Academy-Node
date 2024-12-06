const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  photo: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now  
  },
  dateUptated: {
    type: Date,
    default: Date.now  
  },
});

const Portfolio = mongoose.model('Portfolios', PortfolioSchema); // İlk yazılan oluşturulan collection ismidir

module.exports = Portfolio;
