import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const {username, password} = req.body; // this is to extract the username and password from request body

  //to find the user in the database by the username
  const user = await User.findOne({
    where: {username}
  })
  //this will send a failed response if the user is not found
  if (!user) {
    return res.status(401).json({message: "Invalid username or password"});
  }
  //this will compare the passowrd stored in the database (hashed) with the password provided by the user  
  const passwordIsValid = await bcrypt.compare(password, user.password);

  //this will send a failed response if the password is not valid
  if (!passwordIsValid) {
    return res.status(401).json({message: "Invalid username or password"});
  }
  // this will get the secret key from the environment variables
  // this is used to sign the JWT token
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // this will create a JWT token with the username and the secret key
  // the token will expire in 1 hour
  const token = jwt.sign({ username}, secretKey, {expiresIn: '1h'});
  return res.json({token}) //this will send the token as a response


};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
