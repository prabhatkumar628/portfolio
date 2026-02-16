"use client";

import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
import { validateFile } from "@/lib/upload/fileValidation";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { api } from "@/lib/axios";
import { X } from "lucide-react";
import {
  commonTechnologies,
  defaultProjectValues,
  getTechSuggestions,
  ProjectFormInputs,
  projectSchema,
  techHighlightColors,
} from "../../../../../schemas/admin.project.schema";
import {
  useGETAdminProjectById,
  useUpdateAdminProjectById,
} from "../../../../../hooks/useAdminProjects";
import {
  FileFolderType,
  UploadFieldType,
  UploadType,
} from "../../../../../types/UploadType";
import Loading from "../../../../(public)/loading";

export default function CreateProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const currentId = Array.isArray(id) ? id[0] : id;

  const { data: currentData, isLoading } = useGETAdminProjectById(currentId!);

  const form = useForm<ProjectFormInputs>({
    resolver: zodResolver(projectSchema),
    defaultValues: currentData ?? defaultProjectValues,
  });

  useEffect(() => {
    form.reset(currentData);
  }, [currentData, form]);

  const { uploadToCloudinary, isUploading, progress, progressKey } =
    useCloudinaryUpload();

  const handleUploadImage = ({
    field,
    type,
    accept,
    folderName,
  }: {
    field: UploadFieldType;
    type: UploadType;
    accept: string;
    folderName: FileFolderType;
  }) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const validate = validateFile(file, type);
        if (!validate.valid) {
          toast.error(validate.message);
          return;
        }
        try {
          const result = await uploadToCloudinary({ file, folderName, type });
          const oldPublidId = form.getValues("thumbnail.public_id");
          await api.post("/cloudinary/delete", {
            public_id: oldPublidId,
            resource_type: "image",
          });
          field.onChange(result);
          const updateValues = form.getValues();
          api.patch(`/admin/projects/${currentId}`, updateValues);
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };
    input.click();
  };

  // ─── Submit Form ─────────────────────────────────────────
  const { mutate: udpateProject, isPending } = useUpdateAdminProjectById();
  const onSubmit = async (values: ProjectFormInputs) => {
    udpateProject(
      { id: currentId!, payload: values },
      {
        onSuccess: () => {
          toast.success("Updated successfully");
          router.push("/admin/projects");
        },
        onError: (error) => {
          toast.error("Update failed");
          console.error(error);
        },
      },
    );
  };

  // ─── State ────────────────────────────────────────────────
  const [techInput, setTechInput] = useState({
    name: "",
    highlight: "",
  });
  const [suggestions, setSuggestions] = useState<
    {
      name: string;
      highlight: string;
    }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ─── Add Technology ───────────────────────────────────────
  const handleAddTechnology = () => {
    const currentTechs = form.getValues("technologies");

    // Validate name
    if (!techInput.name.trim()) {
      toast.error("Technology name is required");
      return;
    }

    // Check max limit
    if (currentTechs.length >= 15) {
      toast.error("Maximum 15 technologies allowed");
      return;
    }

    // Check duplicate
    const isDuplicate = currentTechs.some(
      (tech) => tech.name.toLowerCase() === techInput.name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      toast.error("Technology already added");
      return;
    }

    // Add technology
    form.setValue("technologies", [
      ...currentTechs,
      {
        name: techInput.name.trim(),
        highlight: techInput.highlight || "",
      },
    ]);

    // Reset input
    setTechInput({ name: "", highlight: "" });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // ─── Remove Technology ────────────────────────────────────
  const handleRemoveTechnology = (index: number) => {
    const currentTechs = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTechs.filter((_, i) => i !== index),
    );
  };

  // ─── Handle Name Input Change ─────────────────────────────
  const handleNameChange = (value: string) => {
    setTechInput({ ...techInput, name: value });

    // Show suggestions
    if (value.length >= 2) {
      const filteredSuggestions = getTechSuggestions(value);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // ─── Select Suggestion ────────────────────────────────────
  const handleSelectSuggestion = (tech: {
    name: string;
    highlight: string;
  }) => {
    setTechInput({
      name: tech.name,
      highlight: tech.highlight,
    });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="space-y-6">
      {isLoading && <Loading />}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
          <p className="text-white/60">Edit project for your portfolio</p>
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
              <p className="text-sm text-white/60">Essential project details</p>
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Project Title *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-Commerce Platform, Portfolio Website..."
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project in detail..."
                      rows={5}
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 resize-none"
                    />
                  </FormControl>
                  <FormDescription className="text-white/40">
                    {field.value?.length || 0}/2000 characters
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Category & Status */}
            <div className="grid md:grid-cols-2 gap-6">
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
                        <SelectItem value="web" className="text-white">
                          Web
                        </SelectItem>
                        <SelectItem value="mobile" className="text-white">
                          Mobile
                        </SelectItem>
                        <SelectItem value="desktop" className="text-white">
                          Desktop
                        </SelectItem>
                        <SelectItem value="fullstack" className="text-white">
                          Full Stack
                        </SelectItem>
                        <SelectItem value="frontend" className="text-white">
                          Frontend
                        </SelectItem>
                        <SelectItem value="backend" className="text-white">
                          Backend
                        </SelectItem>
                        <SelectItem value="other" className="text-white">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/95 border-white/10">
                        <SelectItem value="completed" className="text-white">
                          Completed
                        </SelectItem>
                        <SelectItem value="in-progress" className="text-white">
                          In Progress
                        </SelectItem>
                        <SelectItem value="archived" className="text-white">
                          Archived
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Featured & Published */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="space-y-0.5">
                      <FormLabel className="text-white/80">
                        ⭐ Featured
                      </FormLabel>
                      <FormDescription className="text-white/40 text-xs">
                        Show in featured section
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

              {/* Published */}
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="space-y-0.5">
                      <FormLabel className="text-white/80">
                        🌐 Published
                      </FormLabel>
                      <FormDescription className="text-white/40 text-xs">
                        Make publicly visible
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
          </div>

          {/* Thumbnail */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Project Thumbnail
              </h2>
              <p className="text-sm text-white/60">
                Upload project preview image
              </p>
            </div>
            {/* /////////////////////////////////////////////////////////////// */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => {
                const imageUrl = field.value?.url;

                return (
                  <FormItem>
                    <FormLabel className="text-white/80">Thumbnail *</FormLabel>
                    <div className="space-y-4">
                      {/* Preview Section */}
                      <div className="relative w-full max-w-md aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt="Project Image"
                            fill
                            className="object-cover"
                          />
                        )}

                        {/* Upload Progress */}
                        {isUploading && progressKey === "projects" && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white text-lg font-semibold">
                              {progress}%
                            </div>
                          </div>
                        )}
                      </div>

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
                            folderName: "projects",
                          })
                        }
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-all inline-block"
                      >
                        Choose Thumbnail
                      </Button>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Technologies */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Technologies Used
              </h2>
              <p className="text-sm text-white/60">Add tech stack (Max 20)</p>
            </div>

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Technologies * (Max 15)
                  </FormLabel>

                  {/* Add Technology Input */}
                  <div className="space-y-3">
                    {/* Name Input with Autocomplete */}
                    <div className="relative">
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type technology name (e.g., React)..."
                            value={techInput.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTechnology();
                              }
                              if (e.key === "Escape") {
                                setShowSuggestions(false);
                              }
                            }}
                            onFocus={() => {
                              if (suggestions.length > 0) {
                                setShowSuggestions(true);
                              }
                            }}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                          />

                          {/* Autocomplete Suggestions */}
                          {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 border border-white/20 rounded-xl backdrop-blur-xl z-50 max-h-48 overflow-y-auto">
                              {suggestions.map((tech, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleSelectSuggestion(tech)}
                                  className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                  <span
                                    className={`text-sm font-medium ${tech.highlight || "text-white"}`}
                                  >
                                    {tech.name}
                                  </span>
                                  {tech.highlight && (
                                    <span className="text-xs text-white/40">
                                      (with color)
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Color Select */}
                        <Select
                          value={techInput.highlight}
                          onValueChange={(value) =>
                            setTechInput({ ...techInput, highlight: value })
                          }
                        >
                          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Color" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/95 border-white/10">
                            {techHighlightColors.map((color) => (
                              <SelectItem
                                key={color.value}
                                value={color.value}
                                className="text-white"
                              >
                                <span className={color.value || "text-white"}>
                                  {color.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Add Button */}
                        <Button
                          type="button"
                          onClick={handleAddTechnology}
                          disabled={field.value.length >= 15}
                          className="bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50"
                        >
                          Add
                        </Button>
                      </div>

                      {/* Quick Add Popular */}
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-white/40">Popular:</span>
                        {commonTechnologies.slice(0, 8).map((tech, index) => {
                          const isAdded = field.value.some(
                            (t) =>
                              t.name.toLowerCase() === tech.name.toLowerCase(),
                          );

                          if (isAdded) return null;

                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSelectSuggestion(tech)}
                              className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                            >
                              {tech.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Technology List (Pills) */}
                  <div className="mt-4">
                    {field.value.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tech, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                          >
                            <span
                              className={`text-sm font-medium ${tech.highlight || "text-white"}`}
                            >
                              {tech.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTechnology(index)}
                              className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                              <X
                                size={14}
                                className={tech.highlight || "text-white"}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                        <p className="text-sm text-white/40">
                          No technologies added yet
                        </p>
                        <p className="text-xs text-white/30 mt-1">
                          Start typing or select from popular options
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Counter */}
                  <FormDescription className="text-white/40 flex items-center justify-between">
                    <span>{field.value.length}/15 technologies added</span>
                    {field.value.length >= 15 && (
                      <span className="text-yellow-400 text-xs">
                        Maximum reached
                      </span>
                    )}
                  </FormDescription>

                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Links */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Project Links
              </h2>
              <p className="text-sm text-white/60">
                Add live demo and GitHub links (all optional)
              </p>
            </div>

            <div className="space-y-4">
              {/* Live Link */}
              <FormField
                control={form.control}
                name="liveDemoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      🌐 Live Demo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* GitHub Frontend */}
              <FormField
                control={form.control}
                name="githubFrontendLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      📱 GitHub Frontend
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/frontend"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* GitHub Backend */}
              <FormField
                control={form.control}
                name="githubBackendLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      🔧 GitHub Backend
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/backend"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* GitHub Mobile */}
              <FormField
                control={form.control}
                name="githubMobileLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      📲 GitHub Mobile
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/user/mobile"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
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
              "Update Project"
            )}
          </GradientButton>
        </form>
      </Form>
    </div>
  );
}
