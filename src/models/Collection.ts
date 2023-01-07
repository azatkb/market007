import mongoose from "mongoose";
export type CollectionDocument = mongoose.Document & {
    address: string;
    owner: string;
    author: string;
    name: string;
    description: string;
    logo: string,
    type: string,
    totalSupply: number
};

const collectionSchema = new mongoose.Schema({
    address: String,
    owner: String,
    author: String,
    name: String,
    description: String,
    logo: String,
    type: String,
    totalSupply: String
}, { timestamps: true });

const Collection = mongoose.model<CollectionDocument>("Collection", collectionSchema);

export default Collection;
