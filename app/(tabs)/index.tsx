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
import { RefreshControl, useWindowDimensions, View } from "react-native";
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
import { TabView, SceneMap } from "react-native-tab-view";

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
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const { items, page: currentPage } = usePagination({
    count: totalCount / PAGE_SIZE,
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

  const handleCloseModal = React.useCallback(() => {
    setDefaultValues(undefined);
    setShowModal(false);
  }, []);

  const renderScene = SceneMap({
    first: () => (
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
    ),
    second: () => (
      <View>
        <Text.Bold>Second</Text.Bold>
      </View>
    ),
  });

  const routes = [
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ];

  return (
    <>
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{ width: layout.width }}
      /> */}

      <ScreenContainer
        index={index}
        sceneMapping={[
          {
            key: "first",
            render: (
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
            ),
            title: "First",
          },
          {
            key: "second",
            render: (
              <View>
                <Text.Bold>Second</Text.Bold>
              </View>
            ),
            title: "Second",
          },
        ]}
        setIndex={setIndex}
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
      >
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
      {totalCount > PAGE_SIZE && <Pagination items={items} />}
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
