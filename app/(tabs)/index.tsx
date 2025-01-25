import React from "react";
import { Text } from "@/components";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {
  OverallBlock,
  Records,
  RecordTypeBlock,
} from "../screen-component/home";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons";
import { RecordType } from "../screen-component/home/types";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchExpense, subscribeToExpenseChanges } from "@/store/features";
import { Button, ButtonText } from "@/components/ui/button";

const Home = () => {
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [recordType, setRecordType] = React.useState<RecordType>("expense");
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const expenseData = useAppSelector((state) => state.expense);
  const scrollEnabled = useAppSelector((state) => state.scroll.scrollEnabled);
  const { expense, isFetching } = expenseData;

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

  return (
    <ScrollView
    // refreshControl={
    //   <RefreshControl
    //     refreshing={scrollEnabled && isFetching}
    //     onRefresh={scrollEnabled ? fetchExpenseData : undefined}
    //   />
    // }
    // scrollEnabled={false}
    >
      <VStack space="md" className="p-2">
        <Text.Title className="uppercase">{date}</Text.Title>
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
        <Records
          search={search}
          recordType={recordType}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Divider />
        <Button onPress={() => setShowModal(true)}>
          <ButtonText>Add</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Home;
