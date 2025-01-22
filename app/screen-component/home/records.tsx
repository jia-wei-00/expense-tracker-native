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
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { deleteExpense, fetchExpense } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RecordType } from "./types";
import { SkeletonText } from "@/components/ui/skeleton";

interface RecordsProps {
  search: string;
  recordType: RecordType;
}

const Records = ({ search, recordType }: RecordsProps) => {
  const expenseData = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const { expense, isFetching, isDeleting } = expenseData;

  const filteredExpenses = React.useMemo(() => {
    const isExpense = recordType === "expense";
    return expense.filter((data) => data.is_expense === isExpense);
  }, [expense, recordType]);

  return (
    <ScrollView>
      <Accordion
        size="md"
        variant="filled"
        type="single"
        isCollapsible={true}
        isDisabled={false}
        className="bg-transparent gap-1"
      >
        <SkeletonText isLoaded={!isFetching} className="h-10" _lines={5} />
        {filteredExpenses
          ?.filter(
            (data) =>
              data.name?.includes(search) ||
              data.amount?.toString().includes(search)
          )
          .map((data, index: number) => (
            <AccordionItem
              value={`item-${index}`}
              className="rounded-lg"
              key={index}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <VStack>
                          <AccordionTitleText>{data.name}</AccordionTitleText>
                          <AccordionTitleText>
                            RM{data.amount}
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
                  <Button variant="outline" size="sm" onPress={() => {}}>
                    <ButtonText>Edit</ButtonText>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => {
                      dispatch(deleteExpense(data.id));
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
          ))}
      </Accordion>
    </ScrollView>
  );
};

export default Records;
