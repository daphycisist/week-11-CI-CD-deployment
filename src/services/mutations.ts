import Organization from "../schema/organizationMongooseSchema";
import jwt from "jsonwebtoken";
import User from "../schema/userMongooseSchema";
import bcrypt from "bcryptjs";
import { validateLoginInput, validateSignupInput, validateOrganizationInput } from "../validations/validations";
import dotenv from "dotenv";
import UserAuth from "../controllers/userAuth";
dotenv.config()
class Mutations {
  static async createOrganization(args: Record<string, unknown>) {
    try {
      validateOrganizationInput(args)
      
      const userInput: any = new Organization(args);
      userInput["noOfEmployees"] = userInput["employees"].length;
      return userInput.save();
    } catch (error) {
      return error;
    }
  }
  static async updateOrganization(args: Record<string, unknown>) {
    try {

      const organization = await Organization.findOneAndUpdate(
        { organization: args.organization },
        { ...args },
        { new: true }
      ).exec();
      return organization!.save();
    } catch (err) {
      return err;
    }
  }
  static async deleteOrganization(args: Record<string, unknown>) {
    try {
      return await Organization.findOneAndDelete({
        organization: args.organization,
      }).exec();
    } catch (err) {
      return err;
    }
  }

  static async login(args: Record<string, unknown>) {
    try {
      validateLoginInput(args)
      const { email, password } = args;

      const user = await User.findOne({
        email
      });

      if (!user) {
        throw new Error("User does not exists");
      }

      const hashPassword = user.get("password")
      const validPass = await bcrypt.compare(password, hashPassword);
      if (!validPass) {
        throw new Error("Incorrect email or password");
      }

      const id = user.id;
      const payload = { email: email, id: id };
      const secret = process.env.ACCESS_TOKEN_SECRET as string;
      const token = jwt.sign(payload, secret, {
        expiresIn: "10m"
      });

      user["token"] = token; 
      return user;
    } catch (err) {
      return err;
    }
  }

  static async signup(args: Record<string, unknown>) {
    validateSignupInput(args);
    try {
      const { email } = args;
      const userExists = User.findOne({
        email
      })
      
      if(userExists) throw new Error("User already Exists");
      
      const newClient = new User(args);
      newClient["password"] = bcrypt.hashSync(newClient["password"]);
      const data = newClient;
      return data;
    } catch (err) {
      return err;
    }
  } 
}


 export default Mutations