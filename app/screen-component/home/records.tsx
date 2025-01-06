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
import { supabase } from "@/supabase";
import { Database } from "@/database.types";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";

const Records = () => {
  const [data, setData] = React.useState<
    Database["public"]["Tables"]["expense"]["Row"][]
  >([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let { data, error } = await supabase.from("expense").select("*");

        if (error) {
          console.error("Error fetching expense:", error.message);
          return;
        }

        if (data && data.length > 0) {
          console.log(data);
          setData(data);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getData();
  }, []);

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
  );
};

export default Records;
