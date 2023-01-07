import mongoose from "mongoose";
export type TransactionDocument = mongoose.Document & {
    type: string;
    status: string;
    eth: number;
    crypto: string;
    from: string,
    to: string,
    contract: string
};

const transactionSchema = new mongoose.Schema({
    type: String,
    status: String,
    eth: Number,
    crypto: String,
    from: String,
    to: String,
    contract: String
}, { timestamps: true });

const Transaction = mongoose.model<TransactionDocument>("Transaction", transactionSchema);

export default Transaction;
