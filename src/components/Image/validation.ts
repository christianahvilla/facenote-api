import * as Joi from 'joi';
import Validation from '../validation';
import { IImageModel } from './model';

class ImageValidation extends Validation {

    constructor() {
        super();
    }

    create(data: IImageModel): Joi.ValidationResult<IImageModel> {
        const schema: Joi.Schema = Joi.object().keys({
            extension: Joi.string().required(),
            data: Joi.object().required()
        });
        return Joi.validate(data, schema);
    }

    
    get(data: { id: string }): Joi.ValidationResult<{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(data, schema);
    }

    remove(data: {id: string}): Joi.ValidationResult <{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.customJoi().required()
        });
        return Joi.validate(data, schema);
    }
}

export default new ImageValidation();
