import IPostService from './service';
import { HttpError } from '../../config/error';
import { IPostModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function findOne(req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
        const image: IPostModel = await IPostService.findOne(req.params.id);

        res.status(200).json(image);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function getAll(req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
        const posts: Array<IPostModel> = await IPostService.all(req.params.id);

        res.status(200).json(posts);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise <void> {
    try {
        const post: IPostModel = await IPostService.insert(req.body);

        res.status(200).json(post);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
