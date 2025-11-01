import { Router } from "express";
import {
  createExpenseController,
  deleteExpenseController,
  getAllExpensesController,
  updateExpenseController,
} from "../controllers/expense.controller";

const expenseRoutes = Router();

expenseRoutes.post("/workspace/:workspaceId/create", createExpenseController);

expenseRoutes.get("/workspace/:workspaceId/all", getAllExpensesController);

expenseRoutes.put("/:id/workspace/:workspaceId/update", updateExpenseController);

expenseRoutes.delete("/:id/workspace/:workspaceId/delete", deleteExpenseController);

export default expenseRoutes;
