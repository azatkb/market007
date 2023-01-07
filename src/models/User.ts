import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
    email: string;
    name: string;
    address: string;
};

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String
}, { timestamps: true });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
