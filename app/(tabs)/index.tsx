import React from "react";
import { Pagination, ScreenContainer, Text } from "@/components";
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
  fetchExpense,
  fetchExpenseStats,
  subscribeToExpenseChanges,
} from "@/store/features";
import { ModalDefaultValues } from "../screen-component/home/records";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import usePagination from "@/hooks/usePagination";
import { PAGE_SIZE } from "@/constants";

const Home = () => {
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [recordType, setRecordType] = React.useState<RecordType>("expense");
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const { expense, isFetching, totalCount, stats } = useAppSelector(
    (state) => state.expense
  );
  const { t } = useTranslation();

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const { items, page: currentPage } = usePagination({
    count: totalCount / PAGE_SIZE,
  });

  const fetchExpenseData = React.useCallback(() => {
    session &&
      dispatch(
        fetchExpense({
          userId: session?.user.id,
          page: currentPage,
          pageSize: PAGE_SIZE,
        })
      );
  }, [session, currentPage]);

  const fetchExpenseStatsData = React.useCallback(() => {
    session &&
      dispatch(
        fetchExpenseStats({
          userId: session?.user.id,
          year: dayjs().year(),
          month: dayjs().month() + 1,
        })
      );
  }, [session]);

  const fetchData = React.useCallback(() => {
    fetchExpenseData();
    fetchExpenseStatsData();
  }, [fetchExpenseData, fetchExpenseStatsData]);

  React.useEffect(() => {
    fetchData();
  }, [session, currentPage]);

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
  }, [session, currentPage]);

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
  }, [filteredRecordsByCategory, search, currentPage]);

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
          <RefreshControl refreshing={isFetching} onRefresh={fetchData} />
        }
        stickyContent={
          <>
            <Text.Title className="uppercase">
              {t(`month.${dayjs().format("MMMM")}`)}
            </Text.Title>
            <Text.Subtitle>
              {t("Balance")}:{" "}
              {stats.balance < 0
                ? `-RM${Math.abs(stats.balance)}`
                : `RM${stats.balance}`}
            </Text.Subtitle>
            <OverallBlock />
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
          </>
        }
      >
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
      {totalCount > PAGE_SIZE && <Pagination items={items} />}
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
