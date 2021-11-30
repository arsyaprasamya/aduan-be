/* eslint-disable @typescript-eslint/no-unsafe-call */
import StatusCodes, { INTERNAL_SERVER_ERROR } from "http-status-codes";
import { Request, Response } from "express";
import RoleRepo from "src/repositories/RoleRepo";
const { OK } = StatusCodes;

export const getAllRoles: (req: Request, res: Response) => any = (
  req: Request,
  res: Response
) => {
  RoleRepo.getAllRoles()
    .then((result: any) => {
      return res.status(OK).json({
        messsage: "success",
        data: {
          roles: result,
        },
      });
    })
    .catch((reason: any) => {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Server Error",
        data: {
          reason,
        },
      });
    });
};
