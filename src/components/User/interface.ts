import { IUserModel } from './model';

export interface IUserService {
    findOne(code: string): Promise<IUserModel>;
    insert(IUserModel: IUserModel): Promise<IUserModel>;
    remove(id: string): Promise<boolean>;
}
