import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const messageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: z.string().trim().regex(emailRegex, "Invalid email address"),
  phone: z
    .object({
      countryCode: z.string().optional(),
      number: z.string().optional(),
    })
    .refine(
      (data) => {
        // Agar number hai to countryCode bhi hona chahiye
        if (data.number && data.number.trim() !== "" && !data.countryCode) {
          return false;
        }
        // Agar countryCode hai to number bhi hona chahiye
        if (data.countryCode && (!data.number || data.number.trim() === "")) {
          return false;
        }
        return true;
      },
      {
        message: "country code and phone number are required",
        path: ["number"],
      }
    )
    .refine(
      (data) => {
        // Agar number diya hai to validate karo
        if (data.number && data.number.trim() !== "") {
          return /^\d{6,14}$/.test(data.number);
        }
        return true;
      },
      {
        message: "Invalid phone number (6-14 digits)",
        path: ["number"],
      }
    )
    .refine(
      (data) => {
        // Agar countryCode diya hai to validate karo
        if (data.countryCode && data.countryCode.trim() !== "") {
          return /^\+\d{1,4}$/.test(data.countryCode);
        }
        return true;
      },
      {
        message: "Invalid country code",
        path: ["countryCode"],
      }
    )
    .optional(),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message too long"),
});