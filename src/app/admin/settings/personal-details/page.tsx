"use client";

import { useEffect } from "react";
import {
  personalDetailsSchema,
  type PersonalDetailsFormValues,
  defaultPersonalDetails,
} from "@/schemas/admin.settings.personal.details";

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
import { Button } from "@/components/ui/button";
import GradientButton from "../../../(public)/(components)/Button";
import { Loader } from "../../../(public)/(components)/Svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldType,
  FileFolderType,
  UploadType,
} from "../../../../types/UploadType";
import { useUpload } from "../../../../hooks/useUpload";
import { toast } from "sonner";
import { useSettings } from "../../../../hooks/usePublic";
import { useSettingsUpdate } from "../../../../hooks/useAdminSettings";

export default function PersonalDetailsForm() {
  const { mutate: mutateFile, isPending: uploadPending } = useUpload();
  const { data: settingsData } = useSettings();
  const { mutate: mutateSettings, isPending: settingsPending } =
    useSettingsUpdate();

  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: defaultPersonalDetails,
  });

  useEffect(() => {
    if (settingsData) {
      form.reset(settingsData); // Update form with DB data
    }
  }, [settingsData, form]);

  function onSubmit(values: PersonalDetailsFormValues) {
    mutateSettings(values, {
      onSuccess: (res) => {
        toast.success(res.message);
        form.reset(values); // reset form with current values
      },
      onError: (err) => {
        toast.error(err.message || "Failed to save settings");
      },
    });
  }

  const handleFileUpload = ({
    field,
    accept,
    type,
    folderName,
    oldFile,
  }: {
    field: FieldType;
    accept: string;
    type: UploadType;
    folderName: FileFolderType;
    oldFile?: string | null;
  }) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.onchange = async (e: Event) => {
      // ✅ Event instead of any
      const target = e.target as HTMLInputElement; // ✅ Type assertion
      const file = target.files?.[0]; // ✅ Optional chaining

      if (file) {
        // Here you would upload to your storage (Cloudinary, S3, etc.)
        // For now, just showing the file name
        try {
          mutateFile(
            { file: file, type: type, folderName, oldFile },
            {
              onSuccess: (res) => {
                field.onChange(res.url);
                toast.success("File uploaded successfully!");
              },
              onError: (err) => {
                toast.error("Upload failed: " + err.message);
              },
            },
          );
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Failed to upload file");
        }
      }
    };

    input.click();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Personal Details</h1>
        <p className="text-white/60">
          Manage your personal information and social links
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Basic Information Section */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Basic Information
              </h2>
              <p className="text-sm text-white/60">
                Your personal contact details
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Prabhat Kumar"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="kprabhat628@gmail.com"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="8294925485"
                        maxLength={10}
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormDescription className="text-white/40">
                      10 digit mobile number
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Location *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Noida Sec-71"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Resume Upload */}
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Resume/CV *</FormLabel>
                  <div className="flex items-center gap-4">
                    {field.value && (
                      <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                          <span className="text-xl">📄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {field.value.split("/").pop()}
                          </p>
                          <p className="text-xs text-white/50">PDF Document</p>
                        </div>
                      </div>
                    )}
                    <Button
                      type="button"
                      disabled={uploadPending}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFileUpload({
                          field,
                          accept: ".pdf",
                          type: "document",
                          folderName: "resume",
                          oldFile: field.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white shrink-0"
                    >
                      {uploadPending ? "Uploading..." : "Upload PDF"}
                    </Button>
                  </div>
                  <FormDescription className="text-white/40">
                    Upload your latest resume in PDF format
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Availability Toggle */}
            <FormField
              control={form.control}
              name="isAvailableForHire"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white/80">
                      Available for Hire
                    </FormLabel>
                    <FormDescription className="text-white/40">
                      Show availability status to potential clients
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Social Media Links Section */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Social Media Links
              </h2>
              <p className="text-sm text-white/60">
                Connect your social media profiles
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* GitHub */}
              <FormField
                control={form.control}
                name="socialLinks.github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">🐙</span> GitHub
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* LinkedIn */}
              <FormField
                control={form.control}
                name="socialLinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">💼</span> LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/in/username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Twitter/X */}
              <FormField
                control={form.control}
                name="socialLinks.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">🐦</span> Twitter/X
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://x.com/username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Instagram */}
              <FormField
                control={form.control}
                name="socialLinks.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">📸</span> Instagram
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://instagram.com/username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* YouTube */}
              <FormField
                control={form.control}
                name="socialLinks.youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">📹</span> YouTube
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtube.com/@username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Facebook */}
              <FormField
                control={form.control}
                name="socialLinks.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">👥</span> Facebook
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/username"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Discord */}
              <FormField
                control={form.control}
                name="socialLinks.discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center gap-2">
                      <span className="text-lg">💬</span> Discord
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://discord.gg/invite-code"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <GradientButton
              className="rounded-xl w-full"
              variant="outline"
              type="submit"
              disabled={settingsPending || uploadPending}
            >
              {settingsPending ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Saving Changes...
                </>
              ) : (
                "Save Personal Details"
              )}
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
