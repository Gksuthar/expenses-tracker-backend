import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createExpenseSchema,
  expenseIdSchema,
  updateExpenseSchema,
} from "../validation/expense.validation";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { Permissions } from "../enums/role.enum";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import {
  createExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  updateExpenseService,
} from "../services/expense.service";
import { HTTPSTATUS } from "../config/http.config";

export const createExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = createExpenseSchema.parse(req.body);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.CREATE_TASK]); // Reusing permission, or add Permissions.MANAGE_EXPENSES

    const { expense } = await createExpenseService(workspaceId, userId, body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Expense created successfully",
      expense,
    });
  }
);

export const getAllExpensesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const filters = {
      projectId: req.query.projectId as string | undefined,
      category: req.query.category as string | undefined,
      status: req.query.status as string | undefined,
      month: req.query.month as string | undefined,
      year: req.query.year as string | undefined,
    };

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const result = await getAllExpensesService(workspaceId, filters);

    return res.status(HTTPSTATUS.OK).json({
      message: "Expenses fetched successfully",
      ...result,
    });
  }
);

export const updateExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateExpenseSchema.parse(req.body);
    const expenseId = expenseIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.EDIT_TASK]);

    const { expense } = await updateExpenseService(expenseId, workspaceId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Expense updated successfully",
      expense,
    });
  }
);

export const deleteExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const expenseId = expenseIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.DELETE_TASK]);

    await deleteExpenseService(expenseId, workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Expense deleted successfully",
    });
  }
);
