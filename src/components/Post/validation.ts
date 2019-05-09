import * as Joi from 'joi';
import Validation from '../validation';
import { IPostModel } from './model';

class PostValidation extends Validation {

    constructor() {
        super();
    }

    createPost(params: IPostModel): Joi.ValidationResult<IPostModel> {
        const schema: Joi.Schema = Joi.object().keys({
            text: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    getPosts(body: {id: string}): Joi.ValidationResult<{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    getPost(body: {id: string}): Joi.ValidationResult<{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }


}

export default new PostValidation();
