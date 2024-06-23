const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Members = new Schema({
  email: {type: String, required: true},
  name: { type: String },
  password: { type: String },
  role: {type: Number, default: 0}
}, {
  timestamps: true,
});


module.exports = mongoose.model("Mem", Members);