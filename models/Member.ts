import mongoose, { Schema, Document } from 'mongoose'

export interface IMember extends Document {
  fullName: string
  email: string
  phone: string
  college: string
  year: string
  skills: string
  experience: string
  motivation: string
  joinedAt: Date
  status: 'pending' | 'approved' | 'rejected'
}

const memberSchema = new Schema<IMember>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String },
  skills: { type: String },
  experience: { type: String },
  motivation: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
})

export const Member = mongoose.models.Member || mongoose.model<IMember>('Member', memberSchema)
