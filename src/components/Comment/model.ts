import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

export interface ICommentModel extends Document {
    _id: string;
    text: string;
    author: Author;
}

type Author = {
    _id: String,
    name: String,
    profileImage: String
};

const CommentSchema: Schema = new Schema(
    {
        _id: String,
        text: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }
    },
    {
        collection: 'Comments',
        versionKey: false
    });

export default connections.db.model<ICommentModel>('CommentModel', CommentSchema);
