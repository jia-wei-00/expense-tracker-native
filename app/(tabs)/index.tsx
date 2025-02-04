import React from "react";
import { Text } from "@/components";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
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
import { RefreshControl, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  Expense,
  fetchExpense,
  subscribeToExpenseChanges,
} from "@/store/features";
import { ModalDefaultValues } from "../screen-component/home/records";
import dayjs from "dayjs";

const Home = () => {
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [recordType, setRecordType] = React.useState<RecordType>("expense");
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const expenseData = useAppSelector((state) => state.expense);
  const { expense, isFetching } = expenseData;

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  const fetchExpenseData = React.useCallback(() => {
    session && dispatch(fetchExpense(session?.user.id));
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={fetchExpenseData}
          />
        }
        stickyHeaderIndices={[0]}
        className="p-2"
      >
        <VStack space="md" className="py-2 bg-black">
          <Text.Title className="uppercase">{date}</Text.Title>
          <Text.Subtitle>
            Balance: {balance < 0 ? `-RM${Math.abs(balance)}` : `RM${balance}`}
          </Text.Subtitle>
          <OverallBlock />
          <HStack className="justify-between items-end">
            <Text.Subtitle>Records</Text.Subtitle>
            <Input variant="underlined" size="sm" className="w-2/4 gap-2">
              <InputSlot className="pl-3">
                <InputIcon as={SearchIcon} />
              </InputSlot>
              <InputField
                placeholder="Search..."
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
        </VStack>
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
      </ScrollView>
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
