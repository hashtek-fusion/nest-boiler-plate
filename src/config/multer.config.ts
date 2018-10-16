import { Injectable, MulterOptionsFactory, Inject, MulterModuleOptions, Logger } from '@nestjs/common';
import { EnvProperties } from './env-properties.model';
import { ENV_CONFIG_TOKEN } from './constants';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(@Inject(ENV_CONFIG_TOKEN) private readonly config: EnvProperties){}
    createMulterOptions(): MulterModuleOptions {
        return {
            // dest: this.config.multer.dest,
            storage: multer.diskStorage({
                destination: this.config.multer.dest,
                filename: (req, file, cb) => {
                    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                    cb(null, fileName);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||
                    file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
                    cb(null, true);
                }else {
                    cb(new Error('File type not supported'), false);
                }
            },
            limits: {
                fileSize: 1024 * 1024,
                files: 10,
            },
        };
    }
}
