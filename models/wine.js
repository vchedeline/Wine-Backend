const mongoose = require("mongoose")

const Schema = mongoose.Schema
const wineSchema = new Schema  ({
    name: String,
    type: String,
    year:String,
    price: Number,
    details:String,
    image:String,
  })
  
const Wine = mongoose.model("Wine", wineSchema)

module.exports = Wine