import * as userModel from "../../models/user.model";

export const registerUser = async (name: string, email: string, passwordHash: string) => {
  const existing = await userModel.findUserByEmail(email);
  if (existing) throw new Error("Email ya registrado");
  return userModel.createUser(name, email, passwordHash);
};

export const listUsers = async () => {
  return userModel.getAllUsers();
};
