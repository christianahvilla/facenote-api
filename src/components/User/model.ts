import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    profileImage: Schema.Types.ObjectId;
    friends: Array<Schema.Types.ObjectId>;
    frienRequests: Array<Schema.Types.ObjectId>;
    tokens: AuthToken[];
    comparePassword: (password: string) => Promise<boolean>;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

const UserSchema: Schema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: String,
    bio: String,
    profileImage: Schema.Types.ObjectId,
    friends: Array,
    frienRequests: Array,
    tokens: Array,
}, {
    collection: 'Users',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);
        return match;
    } catch (error) {
        return error;
    }
};

export default connections.db.model<IUserModel>('UserModel', UserSchema);
