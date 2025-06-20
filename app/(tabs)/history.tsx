import React from "react";
import { ScreenContainer, Text } from "@/components";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import {
  AddRecordButton,
  OverallBlock,
  Records,
  RecordTypeBlock,
} from "../screen-component/home";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons";
import { RecordType } from "../screen-component/home/types";
import { RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  Expense,
  fetchCategory,
  fetchExpense,
  subscribeToExpenseChanges,
} from "@/store/features";
import { ModalDefaultValues } from "../screen-component/home/records";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Chart } from "../screen-component";

const History = () => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [recordType, setRecordType] = React.useState<RecordType>("expense");
  const { session } = useAppSelector((state) => state.auth);
  const expenseData = useAppSelector((state) => state.expense);
  const { category } = useAppSelector((state) => state.category);
  const { expense, isFetching } = expenseData;
  const dispatch = useAppDispatch();

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  const fetchExpenseData = React.useCallback(() => {
    if (session) {
      dispatch(fetchExpense({ userId: session?.user.id }));
      dispatch(fetchCategory(session?.user.id));
    }
  }, [session]);

  React.useEffect(() => {
    !expense.length && fetchExpenseData();
  }, [session]);

  React.useEffect(() => {
    if (session) {
      const subscription = subscribeToExpenseChanges({
        userId: session.user.id,
        dispatch,
      }).subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [session]);

  const balance = React.useMemo(() => {
    return expense.reduce((acc, { amount, is_expense }) => {
      return acc + (is_expense ? -(amount ?? 0) : amount ?? 0);
    }, 0);
  }, [expense]);

  const handleEdit = (data: Expense, hasCreatedDate = false) => {
    handleSetDefaultValue(data, hasCreatedDate);
    setShowModal(true);
  };

  const filteredRecordsByCategory = React.useMemo(() => {
    const isExpense = recordType === "expense";
    return expense.filter((record) => record.is_expense === isExpense);
  }, [expense, recordType]);

  const filteredRecordsBySearch = React.useMemo(() => {
    return filteredRecordsByCategory?.filter(
      (record) =>
        record.name?.toLowerCase().includes(search.toLowerCase()) ||
        record.amount?.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [filteredRecordsByCategory, search]);

  const handleSetDefaultValue = (data: Expense, hasCreatedDate = false) => {
    setDefaultValues({
      id: data.id!.toString(),
      name: data.name ?? "",
      amount: data.amount ?? 0,
      is_expense: data.is_expense ? "true" : "false",
      category: data.category?.toString() ?? "",
      spend_date: data.spend_date
        ? dayjs(data.spend_date).valueOf()
        : dayjs().valueOf(),
      ...(hasCreatedDate ? { created_at: data.created_at } : {}),
    });
  };

  const handleCloseModal = () => {
    defaultValues && setDefaultValues(undefined);
    setShowModal(false);
  };

  return (
    <>
      <ScreenContainer
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={fetchExpenseData}
          />
        }
      >
        <Text.Title className="uppercase">
          {t("History")} - ({t(`month.${date}`)})
        </Text.Title>
        <Text.Subtitle>
          {t("Balance")}:{" "}
          {balance < 0 ? `-RM${Math.abs(balance)}` : `RM${balance}`}
        </Text.Subtitle>
        <OverallBlock />
        <Chart data={expense} categories={category} />
        <HStack className="justify-between items-end">
          <Text.Subtitle>{t("Records")}</Text.Subtitle>
          <Input variant="underlined" size="sm" className="w-2/4 gap-2">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              placeholder={t("Search...")}
              value={search}
              onChangeText={setSearch}
            />
          </Input>
        </HStack>
        <Divider />
        <RecordTypeBlock
          recordType={recordType}
          setRecordType={setRecordType}
        />
        <Records
          search={search}
          recordType={recordType}
          showModal={showModal}
          setShowModal={setShowModal}
          data={filteredRecordsBySearch}
          handleEdit={(data, hasCreatedDate) =>
            handleEdit(data as Expense, hasCreatedDate)
          }
          defaultValues={defaultValues}
          onClose={handleCloseModal}
        />
      </ScreenContainer>
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default History;
