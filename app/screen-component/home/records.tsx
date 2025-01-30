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
import { FlatList, View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Expense } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RecordType } from "./types";
import { SkeletonText } from "@/components/ui/skeleton";
import RecordDetailsModal from "./add-record";
import { AddRecordSchema } from "./schemes";
import { DefaultValues } from "react-hook-form";
import dayjs from "dayjs";
import ConfirmDeleteModal from "./confirm-delete-modal";

export interface ModalDefaultValues extends DefaultValues<AddRecordSchema> {
  id: string;
  created_at?: string;
}

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
  const { expense, isFetching, isDeleting } = expenseData;
  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    React.useState(false);
  const [deleteData, setDeleteData] = React.useState<{
    id: string;
    name: string;
    amount: number;
  }>();

  const filteredExpenses = React.useMemo(() => {
    const isExpense = recordType === "expense";
    return expense.filter((data) => data.is_expense === isExpense);
  }, [expense, recordType]);

  const handleEdit = (data: Expense, hasCreatedDate = false) => {
    handleSetDefaultValue(data, hasCreatedDate);
    setShowModal(true);
  };

  const handleDelete = (data: { id: string; name: string; amount: number }) => {
    setDeleteData(data);
    setShowConfirmDeleteModal(true);
  };

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
      <Accordion
        size="md"
        variant="filled"
        type="single"
        isCollapsible={true}
        isDisabled={false}
        className="bg-transparent"
      >
        <SkeletonText isLoaded={!isFetching} className="h-10" _lines={5} />
        <FlatList
          data={filteredExpenses?.filter(
            (data) =>
              data.name?.toLowerCase().includes(search.toLowerCase()) ||
              data.amount
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())
          )}
          nestedScrollEnabled={false}
          scrollEnabled={false}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => handleEdit(item, true)}
                  >
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
                    onPress={() =>
                      handleDelete({
                        id: item.id!.toString(),
                        name: item.name ?? "",
                        amount: item.amount ?? 0,
                      })
                    }
                    disabled={isDeleting}
                  >
                    <ButtonText>Delete</ButtonText>
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
      <ConfirmDeleteModal
        showModal={showConfirmDeleteModal}
        setShowModal={setShowConfirmDeleteModal}
        onClose={() => {
          setDeleteData(undefined);
        }}
        data={deleteData}
      />
    </>
  );
};

export default Records;
