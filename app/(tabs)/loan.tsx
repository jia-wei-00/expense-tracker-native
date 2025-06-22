import React from "react";
import { ScreenContainer, Text } from "@/components";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RefreshControl } from "react-native";
import { fetchLoans } from "@/store/features";

const Loan = () => {
  const { t } = useTranslation();
  const { isFetching, isDeleting } = useAppSelector((state) => state.loan);
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const fetchLoanData = React.useCallback(() => {
    session &&
      dispatch(
        fetchLoans({
          userId: session?.user.id,
          page: currentPage,
          pageSize: PAGE_SIZE,
        })
      );
  }, [session]);

  return (
    <ScreenContainer
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={fetchLoanData} />
      }
    >
      <Text.Title className="uppercase">{t("Loan")}</Text.Title>
    </ScreenContainer>
  );
};

export default Loan;
