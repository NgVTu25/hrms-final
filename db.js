const mongoose = require("mongoose");
require("dotenv").config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const url = process.env.NODE_ENV === "test" ? process.env.DB_URL_TEST : process.env.DB_URL;
    
    console.log("[DB] Đang khởi tạo kết nối mới tới MongoDB...");
    
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Tắt bufferCommands: Nếu chưa có kết nối, báo lỗi ngay lập tức thay vì đợi 10s
      bufferCommands: false, 
    };

    cached.promise = mongoose.connect(url, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

const close = () => {
  return mongoose.connection.close();
};

function getConnection() {
  if (!mongoose.connection.readyState) {
    throw new Error('Please connect to database first');
  }
  return mongoose.connection;
}

module.exports = { connect, close, getConnection };