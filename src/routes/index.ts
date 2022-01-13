/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { getAllAduans } from "./Aduans";
import { getAllRoles } from "./Roles";
import { getUserPelapor, addOneUser, updateOneUser, deleteOneUser, getUserLembaga } from "./Users";

// User-route
const userRouter = Router();
userRouter.get("/pelapor", getUserPelapor);
userRouter.get("/lembaga", getUserLembaga);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete/:id", deleteOneUser);

// Aduan route
const aduanRouter = Router();
aduanRouter.get("/all", getAllAduans);

// Role route
const roleRouter = Router();
roleRouter.get("/all", getAllRoles);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/users", userRouter);
baseRouter.use("/aduans", aduanRouter);
baseRouter.use("/roles", roleRouter);
export default baseRouter;
