import User from "../models/user";
import bcrypt from "bcrypt";
import ResponseModel from "../utils/responseModel";
import type { NextApiRequest, NextApiResponse } from "next";

export const RegisterUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, username, password } = req.body as {
    email: string;
    username: string;
    password: string;
  };

  const exists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exists) {
    const response = new ResponseModel(false, "User Already Exists.", null);
    res.status(500).json(response);
  }
  const salt = await bcrypt.genSalt(10); // create a salt and send and save it to db
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, email, password: hashPassword });
  const response = new ResponseModel(true, "Successfully  created user", user);
  res.status(200).json(response);
};
