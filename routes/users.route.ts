import express from 'express';
import { Router } from 'express';
import { createMany, filterVerified, clearCollection, filteredFetch, editCell, deleteUser } from '../controllers/user.controller'

export const userRoute: Router  = Router();


userRoute.post('/createMany', createMany);

userRoute.post('/filter/fetch', filteredFetch);

userRoute.get('/filter/verified', filterVerified);

userRoute.get('/clear', clearCollection);

userRoute.put('/edit', editCell);

userRoute.delete('/delete', deleteUser);




