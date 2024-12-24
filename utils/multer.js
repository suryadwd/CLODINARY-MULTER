// import multer from "multer"

// const upload = multer({
//   storage:multer.memoryStorage()
// })

// export default upload


import multer from "multer"
import path from "path";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

export default upload