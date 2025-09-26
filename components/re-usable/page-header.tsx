import  Link  from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function PageHeader({
  title,
  subtitle,
  linkTitle,
  link,
}: {
  title: string;
  subtitle: string;
  linkTitle: string;
  link: string;
}) {
  return (
    <header className="flex items-center justify-between py-5">
      <div>
        <h1 className="text-xl ">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <Button asChild>
        <Link href={link}>{linkTitle}</Link>
      </Button>
    </header>
  );
}
