"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import GradientButton from "../../../../(public)/(components)/Button";
import { Loader } from "../../../../(public)/(components)/Svg";
import { toast } from "sonner";
import {
  defaultSkillValues,
  skillCreateSchema,
  SkillFormInputs,
} from "@/schemas/admin.skill.schema";
import { validateFile } from "@/lib/upload/fileValidation";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  useGetAdminSkillById,
  useUpdateAdminSkill,
} from "@/hooks/useAdminSkills";
import { api } from "../../../../../lib/axios";
import { Button } from "../../../../../components/ui/button";
import {
  FileFolderType,
  UploadFieldType,
  UploadType,
} from "../../../../../types/UploadType";

export default function EditeSkillPage() {
  const { id } = useParams();
  const skillId = Array.isArray(id) ? id[0] : id;
  const { data: skillData } = useGetAdminSkillById(skillId!);

  const router = useRouter();

  const form = useForm<SkillFormInputs>({
    resolver: zodResolver(skillCreateSchema),
    defaultValues: skillData ?? defaultSkillValues,
  });

  useEffect(() => {
    form.reset(skillData);
  }, [skillData, form]);

  const { uploadToCloudinary, isUploading, progress, progressKey } =
    useCloudinaryUpload();
  const handleUploadImage = ({
    field,
    accept,
    type,
    folderName,
  }: {
    field: UploadFieldType;
    accept: string;
    type: UploadType;
    folderName: FileFolderType;
  }) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.onchange = async (e: Event) => {
      const targer = e.target as HTMLInputElement;
      const file = targer.files?.[0];
      if (file) {
        const validate = validateFile(file, type);
        if (!validate.valid) {
          toast.error(validate.message);
          return;
        }

        try {
          const result = await uploadToCloudinary({ file, type, folderName });
          const oldPublidId = form.getValues("image.public_id");
          if (oldPublidId) {
            await api.post("/cloudinary/delete", {
              public_id: oldPublidId,
              resource_type: "image",
            });
          }
          field.onChange(result);
          const updateValues = form.getValues();
          await api.patch(`/admin/skills/${skillId}`, updateValues);
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };

    input.click();
  };

  const {
    mutate: updateMutate,
    isError: isUpdateError,
    error: updateError,
    isPending,
  } = useUpdateAdminSkill();

  const onSubmit = async (values: SkillFormInputs) => {
    updateMutate(
      { id: skillId!, payload: values },
      {
        onSuccess: () => {
          toast.success("Updated successfully");
          router.push("/admin/skills");
        },
        onError: (error) => {
          toast.error("Update failed");
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Skill</h1>
          <p className="text-white/60">Edit skill for your portfolio</p>
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
              {isUpdateError && updateError && (
                <div className="my-2 flex justify-center items-center">
                  <p className="text-red-400">
                    {(updateError as Error).message}
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
              render={({ field }) => {
                const imageUrl = field.value?.url;

                return (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Hero Image *
                    </FormLabel>

                    <div className="space-y-4">
                      {/* Preview Section */}
                      <div className="relative w-20 h-20 aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt="Hero Image"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          // Dummy Emoji Preview
                          <span className="text-6xl opacity-70">🖼️</span>
                        )}
                      </div>

                      {/* Image Info (Only when image exists) */}
                      {imageUrl && (
                        <div>
                          <p className="text-xs text-white/50 mb-1">File</p>
                          <Input
                            value={imageUrl.split("---").pop()}
                            readOnly
                            className="bg-white/5 border-white/10 text-white/60 text-xs"
                          />
                        </div>
                      )}

                      {/* Upload Button */}
                      <Button
                        type="button"
                        disabled={isUploading}
                        variant="outline"
                        onClick={() =>
                          handleUploadImage({
                            field,
                            accept: "image/*",
                            type: "image",
                            folderName: "skills",
                          })
                        }
                        className="relative overflow-hidden bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        {isUploading && progressKey === "heroImage" && (
                          <span
                            className="absolute left-0 top-0 h-full bg-purple-500/40 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        )}

                        <span className="relative z-10">
                          {isUploading && progressKey === "heroImage"
                            ? `Uploading ${progress}%`
                            : imageUrl
                              ? "Change Image"
                              : "Select Image"}
                        </span>
                      </Button>
                    </div>

                    <FormMessage className="text-red-400" />
                  </FormItem>
                );
              }}
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
                {isUploading ? `Uploading ${progress}%` : "Updating..."}
              </>
            ) : (
              "Update Skill"
            )}
          </GradientButton>
        </form>
      </Form>
    </div>
  );
}
