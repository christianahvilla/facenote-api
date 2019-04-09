import ImageService from './service';
import { HttpError } from '../../config/error';
import { IImageModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function findOne(req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
        const image: IImageModel = await ImageService.findOne(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
