import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'member' | 'mentor';
  avatar?: string;
  skillTags: string[];
  meetingPreferences: {
    preferredDays: string[];
    preferredTime: string;
  };
  points: number;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['member', 'mentor'],
      default: 'member'
    },
    avatar: {
      type: String,
      default: ''
    },
    skillTags: [{
      type: String
    }],
    meetingPreferences: {
      preferredDays: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }],
      preferredTime: {
        type: String,
        default: 'afternoon'
      }
    },
    points: {
      type: Number,
      default: 0
    },
    badges: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

// Remove password from JSON responses
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser>('User', UserSchema);
