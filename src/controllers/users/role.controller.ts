import { RequestHandler } from "express";
import { BadRequestError } from "../../errors/BadRequestError";
import * as roleService from "../../services/users/role.service";

export const getAllRoles : RequestHandler = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRolesService();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

export const getRoleById : RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Role ID is required");
    }

    const role = await roleService.getRoleByIdService(id);
    res.json(role);
  } catch (error) {
    next(error);
  }
}
