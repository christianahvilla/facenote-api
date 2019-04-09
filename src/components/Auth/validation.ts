import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

class AuthValidation extends Validation {

    constructor() {
        super();
    }
    
    createUser( params: IUserModel ): Joi.ValidationResult<IUserModel> {
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    }
    
    getUser( params: IUserModel ): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema);
    } 
}

export default new AuthValidation();
