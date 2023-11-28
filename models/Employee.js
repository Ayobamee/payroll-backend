const mongoose = require("mongoose");
// Define Mongoose Schema and Model

const employeeSchema = new mongoose.Schema({
  name: String,
  employeeType: String,
  grossPay: Number,
  loanRepayment: Number,
  netSalary: Number,
  wht: Number, // Withholding Tax
  proratedDays: Number,
  proratedPay: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
