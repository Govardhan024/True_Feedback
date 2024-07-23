
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const MessageModel =
  
  mongoose.model('Message', MessageSchema);

export default MessageModel;