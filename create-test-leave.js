const db = require('./db');
const Leave = require('./models/leave');
const User = require('./models/user');
const mongoose = require('mongoose');

db.connect().then(async () => {
  // Find an employee
  const employee = await User.findOne({ type: 'employee' });
  if (!employee) {
    console.log('No employee found');
    process.exit();
  }

  // Find an admin for delegate
  const admin = await User.findOne({ type: 'admin' });
  if (!admin) {
    console.log('No admin found');
    process.exit();
  }

  const leave = new Leave({
    applicantID: employee._id,
    title: 'Test Annual Leave',
    type: 'Annual Leave',
    startDate: new Date('2026-05-10'),
    endDate: new Date('2026-05-12'),
    appliedDate: new Date(),
    period: 3,
    reason: 'Test reason',
    adminResponse: 'Pending',
    delegateTo: admin._id,
    delegateContent: 'Please handle my tasks',
  });

  await leave.save();
  console.log('Created test leave for employee:', employee.name);
  process.exit();
});