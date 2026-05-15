const db = require('./db');
const Leave = require('./models/leave');
const User = require('./models/user');

db.connect().then(async () => {
  const leaves = await Leave.find({});
  console.log('Number of leaves:', leaves.length);
  for (const leave of leaves) {
    console.log('Leave ID:', leave._id, 'Applicant ID:', leave.applicantID, 'Title:', leave.title);
    const user = await User.findById(leave.applicantID);
    if (user) {
      console.log('User found:', user.name, user.type);
    } else {
      console.log('User NOT found for applicantID:', leave.applicantID);
    }
  }
  process.exit();
});