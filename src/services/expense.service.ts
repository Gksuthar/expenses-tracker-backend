import ExpenseModel from "../models/expense.model";
import ProjectModel from "../models/project.model";
import { NotFoundException } from "../utils/appError";

export const createExpenseService = async (
  workspaceId: string,
  userId: string,
  body: {
    name: string;
    description?: string;
    amount: number;
    category: string;
    projectId?: string;
    date: string;
    status: "outstanding" | "paid";
  }
) => {
  const { name, description, amount, category, projectId, date, status } = body;

  if (projectId) {
    const project = await ProjectModel.findById(projectId);
    if (!project || project.workspace.toString() !== workspaceId.toString()) {
      throw new NotFoundException("Project not found or does not belong to this workspace");
    }
  }

  const expense = new ExpenseModel({
    name,
    description,
    amount,
    category,
    project: projectId || null,
    workspace: workspaceId,
    createdBy: userId,
    date: new Date(date),
    status,
  });

  await expense.save();

  return { expense };
};

export const getAllExpensesService = async (
  workspaceId: string,
  filters: {
    projectId?: string;
    category?: string;
    status?: string;
    month?: string;
    year?: string;
  }
) => {
  const query: any = { workspace: workspaceId };

  if (filters.projectId) {
    query.project = filters.projectId;
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.month && filters.year) {
    const startDate = new Date(parseInt(filters.year), parseInt(filters.month) - 1, 1);
    const endDate = new Date(parseInt(filters.year), parseInt(filters.month), 0, 23, 59, 59);
    query.date = { $gte: startDate, $lte: endDate };
  }

  const expenses = await ExpenseModel.find(query)
    .populate("project", "name")
    .populate("createdBy", "name email")
    .sort({ date: -1 });

  // Calculate analytics
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const usedBudget = expenses.filter((e) => e.status === "paid").reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = 0; // You can set a budget field later
  const outstandingAmount = expenses.filter((e) => e.status === "outstanding").reduce((sum, exp) => sum + exp.amount, 0);

  // Category distribution
  const categoryDistribution: { [key: string]: number } = {};
  expenses.forEach((exp) => {
    if (!categoryDistribution[exp.category]) {
      categoryDistribution[exp.category] = 0;
    }
    categoryDistribution[exp.category] += exp.amount;
  });

  return {
    expenses,
    analytics: {
      totalExpenses,
      usedBudget,
      remainingBudget,
      outstandingAmount,
      categoryDistribution,
    },
  };
};

export const updateExpenseService = async (
  expenseId: string,
  workspaceId: string,
  body: {
    name?: string;
    description?: string;
    amount?: number;
    category?: string;
    projectId?: string;
    date?: string;
    status?: "outstanding" | "paid";
  }
) => {
  const expense = await ExpenseModel.findById(expenseId);

  if (!expense || expense.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException("Expense not found");
  }

  if (body.name) expense.name = body.name;
  if (body.description !== undefined) expense.description = body.description;
  if (body.amount) expense.amount = body.amount;
  if (body.category) expense.category = body.category;
  if (body.projectId) expense.project = body.projectId as any;
  if (body.date) expense.date = new Date(body.date);
  if (body.status) expense.status = body.status;

  await expense.save();

  return { expense };
};

export const deleteExpenseService = async (expenseId: string, workspaceId: string) => {
  const expense = await ExpenseModel.findById(expenseId);

  if (!expense || expense.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException("Expense not found");
  }

  await ExpenseModel.findByIdAndDelete(expenseId);

  return { message: "Expense deleted successfully" };
};
