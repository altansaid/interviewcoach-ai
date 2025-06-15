const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String, required: true },
  experience: { type: String, required: true },
  topicsToFocus: { type: String, required: true },
  interviewType: { type: String, default: "Mixed (Technical + Behavioral)" },
  domain: { type: String },
  jobDescription: { type: String },
  includeBehavioral: { type: Boolean, default: false },
  numberOfQuestions: { type: Number, default: 10 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],

  description: String,
  
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
