import * as multer from 'multer';
import * as path from 'path';

// Application context specific multer configurations goes here
export const MulterCustomConfigForProfile = {
    storage: multer.diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
            const fileName = req.user._id +  path.extname(file.originalname);
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('File type not supported'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024,
        files: 10,
    },
};