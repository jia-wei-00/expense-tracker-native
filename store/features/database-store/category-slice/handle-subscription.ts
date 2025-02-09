import { supabase } from "@/supabase";
import { AppDispatch } from "@/store";
import {
  addCategorySubscription,
  deleteCategorySubscription,
  updateCategorySubscription,
} from "./category-slice";
export const subscribeToCategoryChanges = ({
  userId,
  dispatch,
}: {
  userId: string;
  dispatch: AppDispatch;
}) => {
  const subscription = supabase.channel(userId + "_category").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "expense_category",
    },
    (payload) => {
      const { eventType, new: category, old } = payload;

      switch (eventType) {
        case "INSERT":
          dispatch(addCategorySubscription(category));
          break;
        case "UPDATE":
          dispatch(updateCategorySubscription(category));
          break;
        case "DELETE":
          dispatch(deleteCategorySubscription(old));
          break;
        default:
          console.log("Unknown event type");
      }
    }
  );

  return subscription;
};
