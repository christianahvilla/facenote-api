import ImageModel, { IImageModel } from './model';
import ImageValidation from './validation';
import { IImageService } from './interface';
import { Types } from 'mongoose';

const ImageService: IImageService = {

    async insert(image: IImageModel): Promise<IImageModel> {
        try {
            const validate = ImageValidation.create(image);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const imageObj = await ImageModel.create(image);
            return imageObj;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findOne(id: string): Promise<IImageModel> {
        try {
            const validate = ImageValidation.get({id});
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
        var success = false;
        try {
            const validate = ImageValidation.remove({id});
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
