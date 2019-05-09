import ImageModel, { IImageModel } from './model';
import ImageValidation from './validation';
import { IImageService } from './interface';
import { Types } from 'mongoose';
import * as Joi from 'joi';

const ImageService: IImageService = {

    async insert(image: IImageModel): Promise<IImageModel> {
        try {
            const validate: Joi.ValidationResult<IImageModel> = ImageValidation.create(image);

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            // tslint:disable-next-line:typedef
            const imageObj = await ImageModel.create(image);

            return imageObj;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findOne(id: string): Promise<IImageModel> {
        try {
            const validate: Joi.ValidationResult<{id: string}> = ImageValidation.get({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await ImageModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async remove(id: string): Promise<boolean> {
        let success:boolean = false;
        try {
            const validate: Joi.ValidationResult <{id: string}> = ImageValidation.remove({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            await ImageModel.remove({
                _id: Types.ObjectId(id)
            });
            success = true;
        } catch (error) {
            throw new Error(error.message);
        }

        return success;
    }
};

export default ImageService;
