import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface IPostModel extends Document {
    _id: string;
    text: string;
    image: string;
    author: Author;
    comments: Array<Schema.Types.ObjectId>;
}

type Author = {
    _id: String,
    name: String,
    profileImage: String
};

const PostSchema: Schema = new Schema(
    {
        text: String,
        image: String,
        author: Object,
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'CommentModel'
        }]
    },
    {
        collection: 'Posts',
        versionKey: false
    });

export default connections.db.model<IPostModel>('PostModel', PostSchema);
