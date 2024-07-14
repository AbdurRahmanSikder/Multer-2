import Upload from "../model/Upload.model.js";


export const fileUpload = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username)
            res.status(404).json({ message: "User name is not found" });

        const files = req.files.map((file) => ({
            fileName: file.filename,
            filePath: file.path,
            fileSize: file.size
        }
        ))

        const imagesData = new Upload({username, files});
        const savedImages = await imagesData.save();
        res.status(200).json(savedImages);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}