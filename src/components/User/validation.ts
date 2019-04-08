import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from './model';

class UserValidation extends Validation {

    constructor() {
        super();
    }

    createUser(params: IUserModel): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    }

    getUser(body: {id: string}): Joi.ValidationResult<{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    removeUser(body: {id: string}): Joi.ValidationResult<{id: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new UserValidation();
