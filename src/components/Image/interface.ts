import { IImageModel } from './model';

export interface IImageService {
    insert(image: IImageModel): Promise<IImageModel>;
    findOne(id: string): Promise<IImageModel>;
    remove(id: string): Promise<boolean>;
}
