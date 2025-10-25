import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  location: string;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'weekly' | 'biweekly' | 'monthly';
    endDate?: Date;
  };
  rsvps: {
    user: mongoose.Types.ObjectId;
    status: 'yes' | 'no' | 'maybe';
    respondedAt: Date;
  }[];
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true,
      default: 60
    },
    location: {
      type: String,
      required: true
    },
    isRecurring: {
      type: Boolean,
      default: false
    },
    recurringPattern: {
      frequency: {
        type: String,
        enum: ['weekly', 'biweekly', 'monthly']
      },
      endDate: {
        type: Date
      }
    },
    rsvps: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['yes', 'no', 'maybe'],
        required: true
      },
      respondedAt: {
        type: Date,
        default: Date.now
      }
    }],
    notes: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMeeting>('Meeting', MeetingSchema);
