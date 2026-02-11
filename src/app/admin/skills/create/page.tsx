"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GradientButton from "../../../(public)/(components)/Button";
import { Loader } from "../../../(public)/(components)/Svg";
import { toast } from "sonner";
import {
  defaultSkillValues,
  skillCreateSchema,
  SkillFormInputs,
} from "@/schemas/admin.skill.schema";
import { validateFile } from "@/lib/upload/fileValidation";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useAdminCreateSkills } from "@/hooks/useAdminSkills";
import { api } from "../../../../lib/axios";

export default function CreateSkillPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const form = useForm<SkillFormInputs>({
    resolver: zodResolver(skillCreateSchema),
    defaultValues: defaultSkillValues,
  });

  const { uploadToCloudinary, isUploading, progress, progressKey } =
    useCloudinaryUpload();
  const {
    mutate: createSkill,
    isPending,
    isError: isCreateError,
    error: createError,
  } = useAdminCreateSkills();

  // Select image
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validate = validateFile(file, "image");
    if (!validate.valid) {
      toast.error(validate.message);
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  // Remove image
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // ✅ Cleanup
    }
    setImagePreview("");
    setImageFile(null);
    form.setValue("image", undefined); // ✅ Set to undefined
  };

  // Submit form
  const onSubmit = async (values: SkillFormInputs) => {
    let imageData: { public_id: string; url: string } | null = null;
    try {
      // ✅ Upload image if file selected
      if (imageFile) {
        imageData = await uploadToCloudinary({
          file: imageFile,
          folderName: "skills",
          type: "image",
        });

        // ✅ Update form value with Cloudinary data
        values.image = imageData;
      }

      // ✅ Create skill
      createSkill(values, {
        onSuccess: () => {
          toast.success("Skill created successfully!");
          if (imagePreview) URL.revokeObjectURL(imagePreview); // Cleanup
          router.push("/admin/skills");
        },
        onError: async () => {
          // ✅ Delete on error
          if (imageData?.public_id) {
            await api.post("/cloudinary/delete", {
              public_id: imageData.public_id,
              resource_type: "image",
            });
          }
          toast.error("Failed!");
        },
      });
    } catch (error) {
      // ✅ Delete on upload error
      if (imageData?.public_id) {
        await api.post("/cloudinary/delete", {
          public_id: imageData.public_id,
          resource_type: "image",
        });
      }
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    }
  };

  // ✅ Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Skill</h1>
          <p className="text-white/60">Create a new skill for your portfolio</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all"
        >
          ← Back
        </button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Basic Information
              </h2>
              <p className="text-sm text-white/60">Essential skill details</p>
              {isCreateError && createError && (
                <div className="my-2 flex justify-center items-center">
                  <p className="text-red-400">
                    {(createError as Error).message}
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Skill Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Skill Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="React, Node.js, TypeScript..."
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Category *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/95 border-white/10">
                        <SelectItem value="frontend" className="text-white">
                          Frontend
                        </SelectItem>
                        <SelectItem value="backend" className="text-white">
                          Backend
                        </SelectItem>
                        <SelectItem value="tools" className="text-white">
                          Tools
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Emoji */}
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Emoji *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                        <span className="text-2xl">{field.value}</span>
                      </div>
                      <Input
                        placeholder="🎯"
                        maxLength={2}
                        {...field}
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-white/40">
                    Used as fallback if no image is provided
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Top Skill Toggle */}
            <FormField
              control={form.control}
              name="isTop"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white/80">
                      ⭐ Top Skill
                    </FormLabel>
                    <FormDescription className="text-white/40">
                      Mark this as a featured/top skill
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Skill Image */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Skill Image</h2>
              <p className="text-sm text-white/60">
                Optional - Upload a logo/icon for this skill
              </p>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Image (Optional)
                  </FormLabel>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative w-32 h-32 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Skill preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-all z-10"
                      >
                        ✕
                      </button>

                      {/* Upload Progress */}
                      {isUploading && progressKey === "skills" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-sm">{progress}%</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Upload Button */}
                  {!imagePreview && (
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="skill-image"
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-all"
                      >
                        Choose Image
                      </label>
                      <input
                        id="skill-image"
                        type="file"
                        accept="image/*"
                        onChange={handleSelectImage}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </div>
                  )}

                  <FormDescription className="text-white/40">
                    If no image is provided, the emoji will be displayed
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <GradientButton
            variant="outline"
            type="submit"
            disabled={isPending || isUploading}
            className="rounded-xl w-full"
          >
            {isPending || isUploading ? (
              <>
                <Loader className="animate-spin mr-2 h-5 w-5" />
                {isUploading ? `Uploading ${progress}%` : "Creating..."}
              </>
            ) : (
              "Create Skill"
            )}
          </GradientButton>
        </form>
      </Form>
    </div>
  );
}
