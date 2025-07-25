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
import { Category, deleteExpense, Expense } from "@/store/features";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "react-i18next"; // Added for i18n translation
import { SkeletonText } from "@/components/ui/skeleton";
import RecordDetailsModal from "./add-record";
import { AddRecordSchema } from "./schemes";
import { DefaultValues } from "react-hook-form";
import ConfirmDeleteModal from "./confirm-delete-modal";
import { useAppDispatch } from "@/hooks/useRedux";
import { Text } from "@/components";

export interface ModalDefaultValues extends DefaultValues<AddRecordSchema> {
  id: string;
  created_at?: string;
}

interface RecordsProps {
  search: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data: Array<Expense | Category>;
  disabled?: boolean;
  handleEdit: (data: Expense | Category, hasCreatedDate?: boolean) => void;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
  type?: "expense" | "category";
}

const Records = ({
  showModal,
  setShowModal,
  data,
  disabled = false,
  handleEdit,
  defaultValues,
  onClose,
  type = "expense",
}: RecordsProps) => {
  const { t } = useTranslation();
  const { isFetching, isDeleting } = useAppSelector((state) => state.expense);

  const dispatch = useAppDispatch();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    React.useState(false);
  const [deleteData, setDeleteData] = React.useState<{
    id: number;
    name: string;
  }>();

  const handleDelete = (data: { id: number; name: string }) => {
    setDeleteData(data);
    setShowConfirmDeleteModal(true);
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
        {isFetching ? (
          <SkeletonText className="h-10" _lines={5} />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            nestedScrollEnabled={false}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="pt-2" />}
            renderItem={({ item }) => (
              <AccordionItem
                value={`item-${item.id}`}
                className="rounded-lg bg-background-50"
                key={item.id}
              >
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <VStack>
                            <AccordionTitleText className="text-secondary-0">
                              {item.name}
                            </AccordionTitleText>
                            {"amount" in item && (
                              <AccordionTitleText className="text-secondary-0">
                                RM{item.amount}
                              </AccordionTitleText>
                            )}
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
                      <ButtonText>{t("View")}</ButtonText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => handleEdit(item)}
                    >
                      <ButtonText>{t("Edit")}</ButtonText>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => {
                        if (item.id !== undefined) {
                          handleDelete({ id: item.id, name: item.name! });
                        }
                      }}
                      disabled={disabled}
                    >
                      <ButtonText>{t("Delete")}</ButtonText>
                    </Button>
                  </HStack>
                </AccordionContent>
              </AccordionItem>
            )}
            keyExtractor={(item) => item.id!.toString()}
          />
        ) : (
          <View className="items-center mt-4">
            <Text.Caption>{t("No data available")}</Text.Caption>
          </View>
        )}
      </Accordion>
      <RecordDetailsModal
        showModal={showModal}
        setShowModal={setShowModal}
        defaultValues={defaultValues}
        onClose={onClose}
        type={type}
      />
      <ConfirmDeleteModal
        showModal={showConfirmDeleteModal}
        setShowModal={setShowConfirmDeleteModal}
        onClose={() => {
          setDeleteData(undefined);
        }}
        name={deleteData?.name ?? ""}
        onConfirmDelete={() => {
          deleteData?.id && dispatch(deleteExpense(Number(deleteData.id)));
        }}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default Records;
