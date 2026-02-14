import { UploadType } from "@/types/UploadType";

export const FILE_VALIDATION_RULES: Record<
  UploadType,
  {
    maxSize: number;
    allowedTypes: readonly string[];
    allowedExtensions?: readonly string[];
  }
> = {
  image: {
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    allowedExtensions: ["jpg", "jpeg", "png", "webp","gif"],
  },
  video: {
    maxSize: 20 * 1024 * 1024,
    allowedTypes: ["video/mp4", "video/webm"],
  },
  document: {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["application/pdf"],
  },
};

export const validateFile = (
  file: File,
  type: UploadType,
) => {
  const rules = FILE_VALIDATION_RULES[type];

  if (!rules) {
    return { valid: false, message: "Invalid upload type" };
  }

  // size check
  if (file.size > rules.maxSize) {
    return {
      valid: false,
      message: `Max ${(rules.maxSize / 1024 / 1024).toFixed(0)}MB allowed`,
    };
  }

  // mime type check
  if (!rules.allowedTypes.includes(file.type)) {
    return { valid: false, message: "Invalid file format" };
  }

  // extension check (extra safety)
  if (rules.allowedExtensions) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !rules.allowedExtensions.includes(ext)) {
      return { valid: false, message: "Invalid file extension" };
    }
  }

  return { valid: true };
};
