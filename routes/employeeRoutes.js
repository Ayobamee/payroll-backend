const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Import your model

// Create (POST)
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read (GET)
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Modify (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete employee with ID: ${id}`); // Log the ID

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      console.log(`No employee found with ID: ${id}`); // Log if not found
      return res.status(404).json({ message: "Employee not found" });
    }
    console.log(`Deleted employee with ID: ${id}`); // Log if deletion was successful
    res.json({ message: "Employee deleted successfully", employee });
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
