const db = require('./db');
const User = require('./models/user');

db.connect().then(async () => {
  const users = await User.find({});
  console.log('Number of users:', users.length);
  users.forEach(user => {
    console.log('User:', user.name, user.type, user._id);
  });
  process.exit();
});