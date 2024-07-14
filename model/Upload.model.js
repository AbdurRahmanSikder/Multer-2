import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    files: [
        {
            fileName: String,
            filePath: String,
            fileSize: String
        }
    ]
})

const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;