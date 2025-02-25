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
import { Category, deleteCategory, Expense } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { SkeletonText } from "@/components/ui/skeleton";
import { CategorySchema } from "../home/schemes";
import { DefaultValues } from "react-hook-form";
import ConfirmDeleteModal from "../home/confirm-delete-modal";
import { RecordType } from "../home/types";
import CategoryModal from "./category-modal";
import { useTranslation } from "react-i18next";

export interface ModalDefaultValues extends DefaultValues<CategorySchema> {
  id: string;
  created_at?: string;
}

interface RecordsProps {
  search: string;
  recordType: RecordType;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data: Array<Expense | Category>;
  disabled?: boolean;
  handleEdit: (data: Expense | Category, hasCreatedDate?: boolean) => void;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
}

const CategoryRecords = ({
  showModal,
  setShowModal,
  data,
  disabled = false,
  handleEdit,
  defaultValues,
  onClose,
}: RecordsProps) => {
  const categoryData = useAppSelector((state) => state.category);
  const { isFetching, isDeleting } = categoryData;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
        <SkeletonText isLoaded={!isFetching} className="h-10" _lines={5} />
        <FlatList
          data={data}
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
                          {"amount" in item && (
                            <AccordionTitleText>
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
      </Accordion>
      <CategoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        defaultValues={defaultValues}
        onClose={onClose}
        type="category"
      />
      <ConfirmDeleteModal
        showModal={showConfirmDeleteModal}
        setShowModal={setShowConfirmDeleteModal}
        onClose={() => {
          setDeleteData(undefined);
        }}
        name={deleteData?.name ?? ""}
        isDeleting={isDeleting}
        onConfirmDelete={() => {
          deleteData?.id && dispatch(deleteCategory(Number(deleteData.id)));
        }}
      />
    </>
  );
};

export default CategoryRecords;
