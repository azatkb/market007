import mongoose from "mongoose";
export type NftDocument = mongoose.Document & {
    id: string;
    address: string;
    owner: string;
    price: number,
    data: object,
    status: string
};

const naftSchema = new mongoose.Schema({
    id: String,
    address: String,
    owner: String,
    price: Number,
    data: Object,
    status: String
}, { timestamps: true });

const Nft = mongoose.model<NftDocument>("Nft", naftSchema);

export default Nft;
