import { IPostModel } from './model';

export interface IPostService {
    findOne(code: string): Promise<IPostModel>;
    insert(IPostModel: IPostModel): Promise<IPostModel>;
    all(id: string): Promise<Array<IPostModel>>;

}
