import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen bg-teal-900 flex flex-col items-center justify-center">
      <Image
        src="/404-error-with-man-thinking.png"
        alt="Not Found"
        width={2000}
        height={2000}
        className="w-160 h-160 mb-4"
      />
      <h1 className="text-white">
        Ooops! The page you are looking for does not exist.
      </h1>
      <Link href="./">
        <button className="mt-4 px-4 py-2 bg-white text-teal-900 rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
}
