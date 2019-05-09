import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import * as Joi from 'joi';
import { IUserService } from './interface';
import { Types } from 'mongoose';

const UserService: IUserService = {

    async findOne(id: string): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult<{id: string}> = UserValidation.getUser({ id });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await UserModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insert(body: IUserModel): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user: IUserModel = await UserModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async remove(id: string): Promise<boolean> {
        let success:boolean = false;

        try {
            const validate: Joi.ValidationResult<{id: string}> = UserValidation.removeUser({ id });

            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user: IUserModel = await UserModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });
            success = true;
        } catch (error) {
            throw new Error(error.message);
        }

        return success;
    }
};

export default UserService;
