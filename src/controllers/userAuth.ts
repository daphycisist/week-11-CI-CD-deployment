import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function UserAuth(req: any) {
  const token = await req.headers["authorization"];
  if (!token) {
    throw new Error("Please login");
  }

  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const decoded = jwt.verify(token, secret);
  if (!decoded) throw new Error("Session expired");
  
  req.userData = decoded;
}

export default UserAuth;
