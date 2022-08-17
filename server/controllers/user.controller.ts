import { User } from '../models/users.model'
import { sample_users } from '../sample_users'
import { Request, Response } from 'express';
import { IUser } from '../types'


//type SortType = "name" | "_id" | "email" | "phone" | "verified" | "country";
type SortType ={
    name: string,
    _id: string,
    email: string,
    phone: string,
    verified: boolean,
    country: string
}

export const createMany = async(req: Request, res: Response): Promise<void>=>{
    try{
        let data = await User.insertMany(sample_users);
        res.status(200).json(data);
    }catch(e: any){
        res.status(400).json({
            error: e.message
        })
    }
}


export const filteredFetch = async(req: Request, res: Response) =>{
    try{
        let order = req.query.order as | 1 | -1 | {$meta: "textScore"} ?? 1;
        let sortBy: string = req.query.sortBy as string ?? '_id';
        let limit: number = req.query.limit? parseInt(req.query.limit as string) : 3;
        let skip: number = Number(req.query.skip)? Number(req.query.skip as string) : 0;

        const sort: Record<string, | 1 | -1 | {$meta: "textScore"}> = {[sortBy]: order};

        let totalDoc: number = await User.countDocuments();

        let pages: number = Math.ceil(totalDoc / limit);

        let pageNumber = Number(req.query.page)? Number(req.query.page) : 1;

        let startFrom: number = (pageNumber -1) * limit;

        let data: IUser[] = await User.find({}).sort(sort).skip(skip).skip(startFrom).limit(limit);
        res.status(200).json({
            data,
            pages,
            pageNumber,
        });
    }catch(e: any){
        res.status(400).json({
            error: e.message
        })
    }
}


export const filterVerified = async(req: Request, res: Response): Promise<void>=>{
    try{
        let { verified } = req.body ?? false;
        let data: IUser[] = await User.find({ verified: verified });
        res.status(200).json(data);
    }catch(e: any){
        //console.log(e)
        res.status(400).json({
            error: e.message
        })
    }
}


export const clearCollection = async(req: Request, res: Response): Promise<void>=>{
    try{
        await User.remove({});
        res.status(200).json({
            msg: 'Collection cleared'
        })
    }catch(e: any){

    }
}

export const editCell = async(req: Request, res: Response): Promise<void>=>{
    try{
        let { id, formData } = req.body;

        let obj: {[key: string]: string} = {};

        for(let key in formData){
            obj[key] = formData[key];
        }

        console.log(obj);

        let data = await User.findByIdAndUpdate(id, obj);
        data = await User.findById(id);
        res.status(200).json(data);
    }catch(e: any){
        res.status(400).json({
            error: e.message
        })
    }
}

export const deleteUser = async(req: Request, res: Response): Promise<void>=>{
    try{
        let { id } = req.body;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'User deleted'
        });
    }catch(e: any){
        res.status(400).json({
            error: e.message
        })
    }
}