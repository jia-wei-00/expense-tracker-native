import React from "react";
import { Text } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { BigBox } from "../screen-component";
import { ChevronDownIcon, SearchIcon } from "@/assets/Icons";
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollView } from "react-native";
import { supabase } from "@/supabase";

const Home = () => {
  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const { data, error } = await supabase.from("expense").select();

        if (error) {
          console.error("Error fetching expense:", error.message);
          return;
        }

        if (data && data.length > 0) {
          console.log(data);
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    getTodos();
  }, []);

  console.log(data);

  return (
    <VStack space="md" className="p-4 flex-1">
      <Text.Title>{date}</Text.Title>
      <HStack space="sm">
        <BigBox title="Expense" value="RM1000" />
        <BigBox title="Income" value="RM1000" />
      </HStack>
      <HStack className="justify-between items-end">
        <Text.Subtitle>Records</Text.Subtitle>
        <Input variant="underlined" size="sm" className="w-2/4 gap-2">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
      </HStack>
      <Divider />
      <ScrollView>
        <Accordion
          size="md"
          variant="filled"
          type="single"
          isCollapsible={true}
          isDisabled={false}
          className="bg-transparent gap-1"
        >
          {data?.map((data: any, index: number) => (
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
                        <AccordionTitleText>{data.name}</AccordionTitleText>
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
                  <Button variant="outline" size="sm">
                    <ButtonText>View</ButtonText>
                  </Button>
                  <Button variant="outline" size="sm">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                  <Button variant="outline" size="sm">
                    <ButtonText>Delete</ButtonText>
                  </Button>
                </HStack>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollView>
      <Divider />
      <Button>
        <ButtonText>Add</ButtonText>
      </Button>
    </VStack>
  );
};

export default Home;
