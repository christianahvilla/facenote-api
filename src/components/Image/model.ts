import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

export interface IImageModel extends Document {
    extension: String;
    data: String;
}

const ImageSchema: Schema = new Schema(
    {
        extension: String,
        data: String
    },
    {
        collection: 'Images',
        versionKey: false
    }
);

export default connections.db.model<IImageModel>('ImageModel', ImageSchema);
