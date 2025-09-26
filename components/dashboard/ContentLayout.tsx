import React from "react";
import { SiteHeader } from "../site-header";
import { cn } from "@/lib/utils";

export default function ContentLayout({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      <SiteHeader title={title} />
      <div className={cn("py-8 px-6", className)}>{children}</div>
    </div>
  );
}
