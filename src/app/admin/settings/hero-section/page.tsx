"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  defaultHeroSection,
  HeroSectionUpdateFormInputs,
  heroSectionUpdateSchema,
} from "@/schemas/admin.settings.hero.section";

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GradientButton from "../../../(public)/(components)/Button";
import { Cross, Loader } from "../../../(public)/(components)/Svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { validateFile } from "../../../../lib/upload/fileValidation";
import {
  FileFolderType,
  UploadFieldType,
  UploadType,
} from "../../../../types/UploadType";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";
import { useSettings } from "../../../../hooks/usePublic";
import { useSettingsUpdate } from "../../../../hooks/useAdminSettings";

export default function HeroSectionForm() {
  const [skillInput, setSkillInput] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionHighlight, setDescriptionHighlight] = useState<string>("");

  const { data: settingsData } = useSettings();
  const { mutate: mutateSettings, isPending: settingsPending } =
    useSettingsUpdate();

  const form = useForm<HeroSectionUpdateFormInputs>({
    resolver: zodResolver(heroSectionUpdateSchema),
    defaultValues: defaultHeroSection,
  });

  // Load data from API (if you have a hook)
  useEffect(() => {
    if (settingsData) {
      form.reset(settingsData);
    }
  }, [settingsData, form]);

  function onSubmit(values: HeroSectionUpdateFormInputs) {
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

          field.onChange(result); // { url, public_id }
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };

    input.click();
  };

  // Add skill to array
  const handleAddSkill = () => {
    const currentSkills = form.getValues("heroSkills");
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      const newSkills = [...currentSkills, skillInput.trim()];
      form.setValue("heroSkills", newSkills);
      setSkillInput("");
    }
  };

  // Remove skill from array
  const handleRemoveSkill = (skill: string) => {
    const currentSkills = form.getValues("heroSkills");
    const newSkills = currentSkills.filter((s) => s !== skill);
    form.setValue("heroSkills", newSkills);
  };

  // Add description item
  const handleAddDescriptionItem = () => {
    if (descriptionText.trim()) {
      const currentDesc = form.getValues("heroDescription");
      const newItem = {
        text: descriptionText.trim(),
        highlight: descriptionHighlight || "",
      };
      form.setValue("heroDescription", [...currentDesc, newItem]);
      setDescriptionText("");
      setDescriptionHighlight("");
    }
  };

  // Remove description item
  const handleRemoveDescriptionItem = (index: number) => {
    const currentDesc = form.getValues("heroDescription");
    const newDesc = currentDesc.filter((_, i) => i !== index);
    form.setValue("heroDescription", newDesc);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hero Section</h1>
        <p className="text-white/60">Configure your homepage hero section</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Basic Hero Content Section */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Hero Content
              </h2>
              <p className="text-sm text-white/60">
                Main headline and subtitle
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Hero Title */}
              <FormField
                control={form.control}
                name="heroTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Hero Title *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Hero Subtitle */}
              <FormField
                control={form.control}
                name="heroSubtitle"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-white/80">
                      Hero Subtitle *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Building modern web experiences..."
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Hero Description with Highlights */}
            <FormField
              control={form.control}
              name="heroDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Hero Description (with highlights) *
                  </FormLabel>
                  <div className="space-y-3">
                    {/* Add description item */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add text..."
                        value={descriptionText}
                        onChange={(e) => setDescriptionText(e.target.value)}
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                      <Select
                        value={descriptionHighlight}
                        onValueChange={setDescriptionHighlight}
                      >
                        <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectItem value="">None</SelectItem> */}
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="pink">Pink</SelectItem>
                          <SelectItem value="indigo">Indigo</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        onClick={handleAddDescriptionItem}
                        className="bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
                      >
                        Add
                      </Button>
                    </div>

                    {/* Display description items */}
                    <div className="space-y-2">
                      {field.value.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <span
                            className={`flex-1 ${
                              item.highlight
                                ? `text-${item.highlight}-400 font-semibold`
                                : "text-white/80"
                            }`}
                          >
                            {item.text}
                          </span>
                          {item.highlight && (
                            <Badge variant="secondary" className="text-xs">
                              {item.highlight}
                            </Badge>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveDescriptionItem(index)}
                            className="text-white/60 hover:text-white"
                          >
                            <Cross className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormDescription className="text-white/40">
                    Add text segments with optional color highlights
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Hero Image (Cloudinary) */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Hero Image</h2>
              <p className="text-sm text-white/60">
                Upload your hero image to Cloudinary
              </p>
            </div>

            <FormField
              control={form.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Hero Image *
                  </FormLabel>
                  <div className="space-y-3">
                    {/* Image Preview */}
                    {field.value.url && (
                      <div className="relative w-full max-w-xs aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        <Image
                          src={field.value.url}
                          alt="Hero Image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Image Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/50 mb-1">URL</p>
                        <Input
                          value={field.value.url.split("---").pop()}
                          readOnly
                          className="bg-white/5 border-white/10 text-white/60 text-xs"
                        />
                      </div>
                    </div>

                    {/* Upload Button */}
                    <Button
                      type="button"
                      disabled={isUploading}
                      variant="outline"
                      onClick={() =>
                        handleFileUpload({
                          field,
                          accept: "image/*",
                          type: "image",
                          folderName: "heroImage",
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
                          : "Upload Image"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Hero Skills */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
              <p className="text-sm text-white/60">
                Add your key skills (max 10)
              </p>
            </div>

            <FormField
              control={form.control}
              name="heroSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Skills * (Max 10)
                  </FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                      <Button
                        type="button"
                        onClick={handleAddSkill}
                        disabled={field.value.length >= 10}
                        className="bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-white/10 text-white/80 hover:bg-white/20 px-3 py-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-white/60 hover:text-white"
                          >
                            <Cross className="h-4 w-4" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormDescription className="text-white/40">
                    {field.value.length}/10 skills added
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* CTA Buttons */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">CTA Buttons</h2>
              <p className="text-sm text-white/60">
                Configure call-to-action buttons
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary CTA */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80">
                  Primary Button
                </h3>
                <FormField
                  control={form.control}
                  name="heroCTA.primary.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">
                        Button Text *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Work"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroCTA.primary.link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Link *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="/projects"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Secondary CTA */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80">
                  Secondary Button
                </h3>
                <FormField
                  control={form.control}
                  name="heroCTA.secondary.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">
                        Button Text *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Let's Talk"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroCTA.secondary.link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Link *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="/contact-us"
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
                "Save Hero Section"
              )}
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
