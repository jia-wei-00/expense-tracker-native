import React from "react";
import { ChevronDownIcon } from "@/assets/Icons";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import {
  deleteExpense,
  Expense,
  fetchExpense,
  setScrollEnabled,
} from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RecordType } from "./types";
import { SkeletonText } from "@/components/ui/skeleton";
import RecordDetailsModal from "./add-record";
import { AddRecordSchema } from "./schemes";
import { DefaultValues } from "react-hook-form";
import dayjs from "dayjs";

interface RecordsProps {
  search: string;
  recordType: RecordType;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const Records = ({
  search,
  recordType,
  showModal,
  setShowModal,
}: RecordsProps) => {
  const expenseData = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const { expense, isFetching, isDeleting } = expenseData;
  const [defaultValues, setDefaultValues] =
    React.useState<DefaultValues<AddRecordSchema>>();

  const filteredExpenses = React.useMemo(() => {
    const isExpense = recordType === "expense";
    return expense.filter((data) => data.is_expense === isExpense);
  }, [expense, recordType]);

  const { session } = useAppSelector((state) => state.auth);
  const scrollEnabled = useAppSelector((state) => state.scroll.scrollEnabled);

  const handleEdit = (data: Expense) => {
    setDefaultValues({
      name: data.name ?? "",
      amount: data.amount ?? 0,
      is_expense: data.is_expense ? "true" : "false",
      category: data.category?.toString() ?? "",
      spend_date: data.spend_date
        ? dayjs(data.spend_date).valueOf()
        : dayjs().valueOf(),
    });

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    defaultValues && setDefaultValues(undefined);
  };

  const fetchExpenseData = React.useCallback(() => {
    session && dispatch(fetchExpense(session?.user.id));
  }, [session]);

  return (
    <>
      <Accordion
        size="md"
        variant="filled"
        type="single"
        isCollapsible={true}
        isDisabled={false}
        className="bg-transparent gap-1 flex-grow"
      >
        <SkeletonText isLoaded={!isFetching} className="h-10" _lines={5} />
        <FlatList
          data={filteredExpenses?.filter(
            (data) =>
              data.name?.includes(search) ||
              data.amount?.toString().includes(search)
          )}
          nestedScrollEnabled={true}
          ItemSeparatorComponent={() => <View className="pt-2" />}
          renderItem={({ item }) => (
            <AccordionItem
              value={`item-${item.id}`}
              className="rounded-lg"
              key={item.id}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <VStack>
                          <AccordionTitleText>{item.name}</AccordionTitleText>
                          <AccordionTitleText>
                            RM{item.amount}
                          </AccordionTitleText>
                        </VStack>
                        <AccordionIcon
                          as={ChevronDownIcon}
                          className={isExpanded ? "rotate-180" : "rotate-0"}
                        />
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <HStack space="sm">
                  <Button variant="outline" size="sm" onPress={() => {}}>
                    <ButtonText>View</ButtonText>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => handleEdit(item)}
                  >
                    <ButtonText>Edit</ButtonText>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => {
                      item.id && dispatch(deleteExpense(item.id));
                    }}
                    disabled={isDeleting}
                  >
                    <ButtonText>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </ButtonText>
                  </Button>
                </HStack>
              </AccordionContent>
            </AccordionItem>
          )}
          keyExtractor={(item) => item.id!.toString()}
        />
      </Accordion>
      <RecordDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        defaultValues={defaultValues}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Records;
