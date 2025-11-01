import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  name: string;
  description?: string;
  amount: number;
  category: string;
  project?: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  date: Date;
  status: "outstanding" | "paid";
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "materials",
        "labor",
        "equipment",
        "transportation",
        "permits",
        "utilities",
        "other",
      ],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["outstanding", "paid"],
      default: "outstanding",
    },
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.index({ workspace: 1, date: -1 });
ExpenseSchema.index({ project: 1 });

const ExpenseModel = mongoose.model<IExpense>("Expense", ExpenseSchema);

export default ExpenseModel;
