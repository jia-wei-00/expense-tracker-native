import React from "react";
import { ScreenContainer, Text } from "@/components";
import {
  AddRecordButton,
  Records,
  RecordTypeBlock,
} from "../screen-component/home";
import { RecordType } from "../screen-component/home/types";
import { RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  Category,
  Expense,
  fetchCategory,
  fetchExpense,
  fetchExpenseStats,
  subscribeToExpenseChanges,
} from "@/store/features";
import { ModalDefaultValues } from "../screen-component/home/records";
import dayjs from "dayjs";
import { StickyHeader } from "../screen-component";
import { useDebounce } from "@/hooks";

const History = () => {
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [recordType, setRecordType] = React.useState<RecordType>("expense");
  const { session } = useAppSelector((state) => state.auth);
  const { expense, isFetching } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const debouncedSearch = useDebounce(search, 300);

  const fetchExpenseData = React.useCallback(() => {
    if (session) {
      dispatch(fetchExpense({ userId: session?.user.id }));
      dispatch(fetchCategory(session?.user.id));
    }
  }, [session, dispatch]);

  const fetchExpenseStatsData = React.useCallback(() => {
    if (session) {
      dispatch(
        fetchExpenseStats({
          userId: session?.user.id,
          year: dayjs().year(),
          month: dayjs().month() + 1,
        })
      );
    }
  }, [session, dispatch]);

  const fetchData = React.useCallback(() => {
    fetchExpenseData();
    fetchExpenseStatsData();
  }, [session, dispatch]);

  React.useEffect(() => {
    !expense.length && fetchData();
  }, [session, expense.length, fetchData]);

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
  }, [session, dispatch]);

  const filteredRecordsByCategory = React.useMemo(() => {
    const isExpense = recordType === "expense";
    return expense.filter((record) => record.is_expense === isExpense);
  }, [expense, recordType]);

  const filteredRecordsBySearch = React.useMemo(() => {
    if (!debouncedSearch.trim()) return filteredRecordsByCategory;

    const searchLower = debouncedSearch.toLowerCase();
    return filteredRecordsByCategory?.filter(
      (record) =>
        record.name?.toLowerCase().includes(searchLower) ||
        record.amount?.toString().toLowerCase().includes(searchLower)
    );
  }, [filteredRecordsByCategory, debouncedSearch]);

  const handleEdit = React.useCallback(
    (data: Expense | Category, hasCreatedDate = false) => {
      const expenseData = data as Expense;
      setDefaultValues({
        id: expenseData.id!.toString(),
        name: expenseData.name ?? "",
        amount: expenseData.amount ?? 0,
        is_expense: expenseData.is_expense ? "true" : "false",
        category: expenseData.category?.toString() ?? "",
        spend_date: expenseData.spend_date
          ? dayjs(expenseData.spend_date).valueOf()
          : dayjs().valueOf(),
        ...(hasCreatedDate ? { created_at: expenseData.created_at } : {}),
      });
      setShowModal(true);
    },
    []
  );

  const handleCloseModal = React.useCallback(() => {
    setDefaultValues(undefined);
    setShowModal(false);
  }, []);

  const handleSearchChange = React.useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleRecordTypeChange = React.useCallback((type: RecordType) => {
    setRecordType(type);
  }, []);

  return (
    <>
      <ScreenContainer
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={fetchData} />
        }
        stickyContent={
          <>
            <StickyHeader search={search} onSearchChange={handleSearchChange} />
            <RecordTypeBlock
              recordType={recordType}
              setRecordType={handleRecordTypeChange}
            />
          </>
        }
      >
        <Records
          search={debouncedSearch}
          recordType={recordType}
          showModal={showModal}
          setShowModal={setShowModal}
          data={filteredRecordsBySearch}
          handleEdit={handleEdit}
          defaultValues={defaultValues}
          onClose={handleCloseModal}
        />
      </ScreenContainer>
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default History;
