"use client";

import { useEffect } from "react";
import {
  defaultPersonalDetails,
  PersonalDetailsUpdateFormInputs,
  personalDetailsUpdateSchema,
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
import {
  Discord,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Loader,
  Twitter,
  YouTube,
} from "../../../(public)/(components)/Svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileFolderType,
  UploadFieldType,
  UploadType,
} from "../../../../types/UploadType";
import { toast } from "sonner";
import { useSettings } from "../../../../hooks/usePublic";
import { useSettingsUpdate } from "../../../../hooks/useAdminSettings";
import { validateFile } from "../../../../lib/upload/fileValidation";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";
import { api } from "../../../../lib/axios";

export default function PersonalDetailsForm() {
  const { data: settingsData } = useSettings();
  const { mutate: mutateSettings, isPending: settingsPending } =
    useSettingsUpdate();

  const form = useForm<PersonalDetailsUpdateFormInputs>({
    resolver: zodResolver(personalDetailsUpdateSchema),
    defaultValues: defaultPersonalDetails,
  });

  useEffect(() => {
    if (settingsData) {
      form.reset(settingsData); // Update form with DB data
    }
  }, [settingsData, form]);

  function onSubmit(values: PersonalDetailsUpdateFormInputs) {
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

  const { uploadToCloudinary, isUploading, progress, progressKey } =
    useCloudinaryUpload();

  const handleFileUpload = ({
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
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const validation = validateFile(file, type);
        if (!validation.valid) {
          toast.error(validation.message);
          return;
        }

        try {
          const result = await uploadToCloudinary({
            file,
            type,
            folderName,
          });

          const payload = {
            [folderName]: {
              url: result.url,
              public_id: result.public_id,
            },
          };
          await api.patch("/admin/settings", payload);

          field.onChange(result); // { url, public_id }
        } catch (error) {
          console.error("Upload error:", error);
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
                            {field.value.url.split("---").pop()}
                          </p>
                          <p className="text-xs text-white/50">PDF Document</p>
                        </div>
                      </div>
                    )}
                    <Button
                      type="button"
                      disabled={isUploading}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFileUpload({
                          field,
                          accept: ".pdf",
                          type: "document",
                          folderName: "resume",
                        })
                      }
                      className="relative overflow-hidden bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white shrink-0"
                    >
                      {isUploading && progressKey === "resume" && (
                        <span
                          className="absolute left-0 top-0 h-full bg-purple-500/40 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      <span className="relative z-10">
                        {isUploading && progressKey === "resume"
                          ? `Uploading ${progress}%`
                          : "Upload PDF"}
                      </span>
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
                      <GitHub className="w-5 h-5" /> GitHub
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
                      <LinkedIn className="w-4 h-4" /> LinkedIn
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
                      <Twitter className="w-4 h-4" /> Twitter/X
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
                      <Instagram className="w-4 h-4" /> Instagram
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
                      <YouTube className="w-4 h-4" /> YouTube
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
                      <Facebook className="w-4 h-4" /> Facebook
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
                      <Discord className="w-4 h-4" />
                      Discord
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
              disabled={settingsPending || isUploading}
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
