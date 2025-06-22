import { HStack } from "@/components/ui/hstack";
import React from "react";
import BigBox from "./big-box";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "react-i18next";

const OverallBlock = () => {
  const { stats } = useAppSelector((state) => state.expense);
  const { totalExpenses, totalIncome } = stats;
  const { t } = useTranslation();

  return (
    <HStack space="sm">
      <BigBox title={t("Expense")} value={`RM${totalExpenses}`} />
      <BigBox title={t("Income")} value={`RM${totalIncome}`} />
    </HStack>
  );
};

export default OverallBlock;
