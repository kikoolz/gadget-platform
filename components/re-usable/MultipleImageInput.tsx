"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

type MultipleImageInputProps = {
  title: string;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  endpoint: keyof typeof import("@/app/api/uploadthing/core").ourFileRouter;
};

export default function MultipleImageInput({
  title,
  imageUrls,
  setImageUrls,
  endpoint,
}: MultipleImageInputProps) {
  const hasImages =
    imageUrls.length > 0 && imageUrls[0] !== "/default-image.png";

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {hasImages && (
            <>
              {/* Main featured image */}
              {/* <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  alt={`${title} - Main`}
                  className="object-cover"
                  src={imageUrls[0]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div> */}

              {/* Thumbnail grid */}
              {imageUrls.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {imageUrls.map((imageUrl: string, i: number) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-md"
                    >
                      <Image
                        width={512}
                        height={512}
                        alt={`${title} - ${i + 2}`}
                        className="object-contain w-24 h-24"
                        src={imageUrl}
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
                      />
                      {/* <button onClick={handleDelete)
                      
                        <Trash/>
                      </button> */}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <UploadButton
            className="col-span-full ut-button:bg-primary ut-button:text-primary-foreground hover:ut-button:bg-primary/90"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              console.log("Multiple images uploaded:", res);
              if (res && res.length > 0) {
                const newUrls = res.map((item) => item.ufsUrl);
                setImageUrls([...imageUrls, ...newUrls]);
              }
            }}
            onUploadError={(error: Error) => {
              console.error("Upload error:", error);
              alert(`Upload failed: ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
