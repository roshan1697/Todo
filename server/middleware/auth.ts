import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { NextFunction, Request, Response } from 'express';

const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
      if (!user) {
        return res.sendStatus(403)
      }
      if (typeof user === 'string') {
        return res.sendStatus(403)
      }
      req.headers['userId']    = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

  
 export default   authenticateJwt
    

