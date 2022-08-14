import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { IUser } from '../types'



const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },

    email: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    verified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
        required: true,
        enum: ['India', 'USA', 'UK', 'Canada']
    }
})

export const User = mongoose.model<IUser>('User', userSchema);