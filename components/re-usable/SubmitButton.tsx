import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

export default function SubmitButton({
  isLoading,
  loadingTitle,
  title,
}: {
  isLoading: boolean;
  loadingTitle: string;
  title: string;
}) {
  return (
    <Button disabled={isLoading} type="submit" className="">
      {isLoading && <RefreshCcw className="size-4 animate-spin" />}
      {isLoading ? loadingTitle : title}
    </Button>
  );
}
