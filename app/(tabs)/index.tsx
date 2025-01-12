import React from "react";
import { Text } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
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
const Home = () => {
  const [search, setSearch] = React.useState<string>("");
  const [recordType, setRecordType] = React.useState<RecordType>("expense");

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  return (
    <VStack space="md" className="p-4 flex-1">
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
      <RecordTypeBlock recordType={recordType} setRecordType={setRecordType} />
      <Records search={search} recordType={recordType} />
      <Divider />
      <Button>
        <ButtonText>Add</ButtonText>
      </Button>
    </VStack>
  );
};

export default Home;
