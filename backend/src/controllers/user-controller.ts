import { Request, Response } from 'express';
import config from '../config'
import { sign } from 'jsonwebtoken'


import User from  '../models/User'

import { BadRequestError, ValidationError , AuthenticationError} from '../errors'


export const Login = async (req: Request, res: Response) => {

    //TODO Validation

    const {email, password } = req.body;

    const user:any = await User.findOne({ where: {email:email}})

    if(!user) throw new AuthenticationError('User not found')

    if(password !== user.password) throw new AuthenticationError('Incorect password')

    /**
     * Generate token
     */

    const token = sign({ id:user.id, firstName: user.firstName}, config.appSecret, { expiresIn: '1h'})

   
    res.json({message: "Loggedin successfully", token})

}

export const Register = async (req: Request, res: Response) => {

   // TODO : Validation

    const { firstName, lastName, email, password } = req.body;

    // TODO password hashing

    // Check user exists or not

    const match = await User.findOne({ where: {email:email}})

    if(match) throw new AuthenticationError('Email alredy exists')

    console.log('Body ', req.body)

    const newuser = await User.create({firstName, lastName, email, password})

    res.json({message: "User registration successfully completed "})

}

/**
 * Get all users
 */
export const Index = async (req: Request, res: Response) => {

    const result = await User.findAll({ attributes: ["id","firstName","lastName","email"]});
    
    res.json(result)


}