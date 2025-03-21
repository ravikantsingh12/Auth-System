import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ipAddress: { type: String, default: null }, // Store IP Address for session validation
});

const User = mongoose.model('User', userSchema);
export default User;
