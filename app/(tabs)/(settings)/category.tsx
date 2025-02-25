import React from "react";
import { ScreenContainer, Text } from "@/components";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { AddRecordButton, RecordTypeBlock } from "../../screen-component/home";
import { RecordType } from "../../screen-component/home/types";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons";
import { RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchCategory, subscribeToCategoryChanges } from "@/store/features";
import { ModalDefaultValues } from "@/app/screen-component/home/records";
import { Category as CategorySchema } from "@/store/features";
import { CategoryRecords } from "@/app/screen-component";
import { useTranslation } from "react-i18next"; // Added for i18n translation

const Category = () => {
  const { t } = useTranslation(); // Using the translation hook
  const [search, setSearch] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [categoryType, setCategoryType] = React.useState<RecordType>("expense");
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const categoryData = useAppSelector((state) => state.category);
  const { category, isFetching } = categoryData;

  const fetchCategoryData = React.useCallback(() => {
    session && dispatch(fetchCategory(session?.user.id));
  }, [session]);

  React.useEffect(() => {
    !category.length && fetchCategoryData();
  }, [session]);

  React.useEffect(() => {
    if (session) {
      const subscription = subscribeToCategoryChanges({
        userId: session.user.id,
        dispatch,
      }).subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [session]);

  const filteredRecordsByCategory = React.useMemo(() => {
    const isExpense = categoryType === "expense";
    return category.filter((record) => record.is_expense === isExpense);
  }, [category, categoryType]);

  const filteredRecordsBySearch = React.useMemo(() => {
    return filteredRecordsByCategory?.filter((record) =>
      record.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [filteredRecordsByCategory, search]);

  const [defaultValues, setDefaultValues] =
    React.useState<ModalDefaultValues>();

  const handleSetDefaultValue = (
    data: CategorySchema,
    hasCreatedDate = false
  ) => {
    setDefaultValues({
      id: data.id!.toString(),
      name: data.name ?? "",
      is_expense: data.is_expense ? "true" : "false",
      ...(hasCreatedDate ? { created_at: data.created_at } : {}),
    });
  };

  const handleEdit = (data: CategorySchema, hasCreatedDate = false) => {
    handleSetDefaultValue(data, hasCreatedDate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    defaultValues && setDefaultValues(undefined);
    setShowModal(false);
  };

  return (
    <>
      <ScreenContainer
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={fetchCategoryData}
          />
        }
      >
        <HStack className="justify-between items-end">
          <Text.Subtitle>{t("Categories")}</Text.Subtitle>
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
          recordType={categoryType}
          setRecordType={setCategoryType}
        />
        <CategoryRecords
          search={search}
          recordType={categoryType}
          showModal={showModal}
          setShowModal={setShowModal}
          data={filteredRecordsBySearch}
          handleEdit={(data, hasCreatedDate) =>
            handleEdit(data as CategorySchema, hasCreatedDate)
          }
          defaultValues={defaultValues}
          onClose={handleCloseModal}
        />
      </ScreenContainer>
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Category;
