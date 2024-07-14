import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const directory = "./images";
        if(!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        cb(null, directory);
    },
    filename: (req, file, cb) =>{
        const fileNmae = `${Date.now()}-${file.originalname}`;
        cb(null, fileNmae);
    }
})

export const upload = multer({storage});


// validating uploaded files
const validateFileAndUpload = (req, res, next) =>{

    upload.array("images", 2)(req, res, (err)=>{

        if(err){
            return res.status(400).json("More than two files are uploaded");
        }

        if(!req.files){
            return res.status(400).json({message: "Files are required"});
        }

        const files = req.files;
        console.log(files);
        const errors = [];

        files.forEach(file => {
            const allowedType = ['image/png', 'image/jpg', 'image/jpeg'];
            const maxSize = 1*1024*1024; //1MB

            if(!allowedType.includes(file.mimetype)){
                errors.push(`File type invalid ${file.originalname}`);
            }

            if(file.size > maxSize){
                errors.push(`File too large ${file.originalname}`);
            }
        });

        if(errors.length > 0){
            files.forEach((file)=>{
                fs.unlinkSync(file.path);
            })
            return res.status(400).json(errors);
        }
        
        req.fiels = files;
        next();
    })
    
}


export default validateFileAndUpload;