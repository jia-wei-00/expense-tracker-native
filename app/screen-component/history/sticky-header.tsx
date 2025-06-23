import * as React from "react";
import { Text } from "@/components";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { OverallBlock } from "../home";
import Chart from "./chart";
import { Divider } from "@/components/ui/divider";
import { SearchIcon } from "@/assets/Icons";
import dayjs from "dayjs";
import { useAppSelector } from "@/hooks";
import { useTranslation } from "react-i18next";

const StickyHeader = React.memo(
  ({
    search,
    onSearchChange,
  }: {
    search: string;
    onSearchChange: (value: string) => void;
  }) => {
    const { stats, expense } = useAppSelector((state) => state.expense);
    const { category } = useAppSelector((state) => state.category);
    const { t } = useTranslation();

    return (
      <>
        <Text.Title className="uppercase">
          {t("History")} - ({t(dayjs().format("MMMM"))})
        </Text.Title>
        <Text.Subtitle>
          {t("Balance")}:{" "}
          {stats.balance < 0
            ? `-RM${Math.abs(stats.balance)}`
            : `RM${stats.balance}`}
        </Text.Subtitle>
        <OverallBlock />
        <Chart data={expense} categories={category} />
        <HStack className="justify-between items-end">
          <Text.Subtitle>{t("Records")}</Text.Subtitle>
          <Input variant="underlined" size="sm" className="w-2/4 gap-2">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              placeholder={t("Search...")}
              value={search}
              onChangeText={onSearchChange}
            />
          </Input>
        </HStack>
        <Divider />
      </>
    );
  }
);

export default StickyHeader;
