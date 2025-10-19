import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Single image uploads
  departmentImage: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Department image uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  brandLogo: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Brand logo uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  productImage: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Product image uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  bannerImage: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Banner image uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  categoryImage: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Category image uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  blogImage: f({
    image: { maxFileSize: "1MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Blog image uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  // Multiple image uploads
  productImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Product images uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  // File uploads (documents, archives, etc.)
  fileUploads: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .docx
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .xlsx
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 }, // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "1MB",
        maxFileCount: 4,
      }, // .pptx
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 }, // .txt
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Files uploaded:", file.url);
    return { uploadedBy: "system" };
  }),

  // Mail attachments
  mailAttachments: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "1MB",
        maxFileCount: 4,
      },
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Mail attachment uploaded:", file.url);
    return { uploadedBy: "system" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
