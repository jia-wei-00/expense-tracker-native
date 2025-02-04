import React from "react";
import { Text } from "@/components";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import {
  AddRecordButton,
  Records,
  RecordTypeBlock,
} from "../../screen-component/home";
import { RecordType } from "../../screen-component/home/types";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons";
import { RefreshControl, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchCategory, subscribeToExpenseChanges } from "@/store/features";
import { ModalDefaultValues } from "@/app/screen-component/home/records";
import { Category as CategorySchema } from "@/store/features";

const Category = () => {
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
      const subscription = subscribeToExpenseChanges({
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={fetchCategoryData}
          />
        }
        stickyHeaderIndices={[0]}
        className="p-2"
      >
        <VStack space="md" className="py-2 bg-black">
          <HStack className="justify-between items-end">
            <Text.Subtitle>Categories</Text.Subtitle>
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
            recordType={categoryType}
            setRecordType={setCategoryType}
          />
        </VStack>
        <Records
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
          type="category"
        />
      </ScrollView>
      <AddRecordButton showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Category;
