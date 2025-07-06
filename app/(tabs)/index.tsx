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
  Category,
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
  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const { items, page: currentPage } = usePagination({
    count: Math.ceil(totalCount / PAGE_SIZE),
  });

  React.useEffect(() => {
    if (session) {
      dispatch(
        fetchExpense({
          userId: session.user.id,
          page: currentPage,
          pageSize: PAGE_SIZE,
        })
      );

      if (currentPage === 1) {
        dispatch(
          fetchExpenseStats({
            userId: session.user.id,
            year: dayjs().year(),
            month: dayjs().month() + 1,
          })
        );
      }
    }
  }, [session, currentPage, dispatch]);

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

  const filteredRecords = React.useCallback(
    (dataType: "expense" | "income") => {
      const isExpenseType = dataType === "expense";

      if (!search.trim()) {
        return expense.filter((record) => record.is_expense === isExpenseType);
      }

      const searchLower = search.toLowerCase();

      return expense.filter((record) => {
        const matchesType = record.is_expense === isExpenseType;
        const matchesSearch =
          record.name?.toLowerCase().includes(searchLower) ||
          record.amount?.toString().includes(searchLower);

        return matchesType && matchesSearch;
      });
    },
    [expense, search]
  );

  const handleCloseModal = React.useCallback(() => {
    setDefaultValues(undefined);
    setShowModal(false);
  }, []);

  return (
    <>
      <ScreenContainer
        tabScreens={[
          {
            key: "expense",
            render: (
              <Records
                search={search}
                showModal={showModal}
                setShowModal={setShowModal}
                data={filteredRecords("expense")}
                handleEdit={(data, hasCreatedDate) =>
                  handleEdit(data as Expense, hasCreatedDate)
                }
                defaultValues={defaultValues}
                onClose={handleCloseModal}
              />
            ),
            title: "Expense",
          },
          {
            key: "income",
            render: (
              <Records
                search={search}
                showModal={showModal}
                setShowModal={setShowModal}
                data={filteredRecords("income")}
                handleEdit={(data, hasCreatedDate) =>
                  handleEdit(data as Expense, hasCreatedDate)
                }
                defaultValues={defaultValues}
                onClose={handleCloseModal}
              />
            ),
            title: "Income",
          },
        ]}
        onTabChange={({ tabName }) => {
          setRecordType(tabName === "expense" ? "expense" : "income");
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              if (session) {
                dispatch(
                  fetchExpense({
                    userId: session.user.id,
                    page: currentPage,
                    pageSize: PAGE_SIZE,
                  })
                );
                dispatch(
                  fetchExpenseStats({
                    userId: session.user.id,
                    year: dayjs().year(),
                    month: dayjs().month() + 1,
                  })
                );
              }
            }}
          />
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
          </>
        }
        tabBar={({ onTabPress }) => (
          <RecordTypeBlock
            recordType={recordType}
            setRecordType={setRecordType}
            onTabPress={onTabPress}
          />
        )}
      />
      {totalCount > PAGE_SIZE && <Pagination items={items} />}
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
