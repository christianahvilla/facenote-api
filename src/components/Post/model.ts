import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { ObjectID } from 'bson';

export interface IPostModel extends Document {
    _id: string;
    email: string;
    password: string;
    bio: string;
    profileImage: Schema.Types.ObjectId;
    // tslint:disable-next-line:prefer-array-literal
    friends: Array<Schema.Types.ObjectId>;
    // tslint:disable-next-line:prefer-array-literal
    frienRequests: Array<Schema.Types.ObjectId>;
    comparePassword: (password: string) => Promise<boolean>;
}

const Author: Schema = new Schema(
    {
        _id: String,
        name: String,
        profileImage: String
    }
);

const Comment: Schema = new Schema(
    {
        _id: String,
        text: String,
        author: Author
    },
    {
        collection: 'Comments',
        versionKey: false
    });

const PostSchema: Schema = new Schema(
    {
        text: String,
        image: String,
        author: Object,
        comments: Array
    },
    {
        collection: 'Posts',
        versionKey: false
    });

export default connections.db.model<IPostModel>('PostModel', PostSchema);
