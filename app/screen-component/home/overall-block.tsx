import { HStack } from "@/components/ui/hstack";
import React from "react";
import BigBox from "./big-box";
import { useAppSelector } from "@/hooks/useRedux";

const OverallBlock = () => {
  const expenseData = useAppSelector((state) => state.expense);
  const { expense } = expenseData;

  const totalExpense = expense.reduce(
    (prev, curr) => (curr.is_expense ? prev + Number(curr.amount) : prev),
    0
  );

  const totalIncome = expense.reduce(
    (prev, curr) => (curr.is_expense ? prev : prev + Number(curr.amount)),
    0
  );

  return (
    <HStack space="sm">
      <BigBox title="Expense" value={`RM${totalExpense}`} />
      <BigBox title="Income" value={`RM${totalIncome}`} />
    </HStack>
  );
};

export default OverallBlock;
