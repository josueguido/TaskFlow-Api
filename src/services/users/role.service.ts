import { IRole } from "../../interfaces/role.interface";
import { getAllRoles, getRoleById } from "../../models/role.model";
import { BadRequestError } from "../../errors/BadRequestError";

export const getAllRolesService = async (): Promise<IRole[]> => {
  return await getAllRoles();
};

export const getRoleByIdService = async (id: string): Promise<IRole> => {
  const role = await getRoleById(Number(id));
  if (isNaN(Number(id))) {
  throw new BadRequestError("Role ID must be a number");
}
  return role;
};
