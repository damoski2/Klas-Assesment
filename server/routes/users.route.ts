import express from 'express';
import { Router } from 'express';
import { createMany } from '../controllers/user.controller'

export const userRoute: Router  = Router();


userRoute.post('/createMany', createMany);


