import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  status: 'new' | 'read' | 'replied'
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
})

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema)
