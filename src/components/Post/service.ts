import PostModel, { IPostModel } from './model';
import PostValidation from './validation';
import * as Joi from 'joi';
import { IPostService } from './interface';
import { Types } from 'mongoose';

const PostService: IPostService = {

    async findOne(id: string): Promise < IPostModel > {
        try {
            const validate: Joi.ValidationResult<{id: string}> = PostValidation.getPost({ id });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await PostModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insert(body: IPostModel): Promise < IPostModel > {
        try {
            const validate: Joi.ValidationResult<IPostModel> = PostValidation.createPost(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const post: IPostModel = await PostModel.create(body);

            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async all(id: string): Promise < Array<IPostModel> > {
        try {
            const validate: Joi.ValidationResult<{id: string}> = PostValidation.getPosts({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const post: Array<IPostModel> = await PostModel.find({});

            return post;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PostService;
