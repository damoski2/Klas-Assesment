import { User } from '../models/users.model'
import { sample_users } from '../sample_users'
import { Request, Response } from 'express';

export const createMany = async(req: Request, res: Response)=>{
    try{
        let data = await User.insertMany(sample_users);
        res.status(200).json(data);
    }catch(e){
        res.status(400).json({
            error: e
        })
    }
}