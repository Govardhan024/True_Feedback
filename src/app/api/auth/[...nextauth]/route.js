import nextAuth from "next-auth/next";
import { authOptions } from "./options";
const hadler=nextAuth(authOptions);

export {hadler as GET, hadler as POST}