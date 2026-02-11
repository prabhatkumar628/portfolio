"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
import {
  experienceSchema,
  defaultExperienceValues,
  type ExperienceFormInputs,
} from "@/schemas/admin.experience.schema";
import {
  useGetAdminExperienceById,
  useUpdateAdminExperienceById,
} from "../../../../../hooks/useAdminExperience";

export default function CreateExperiencePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const currentId = Array.isArray(id) ? id[0] : id;
  const [achievementInput, setAchievementInput] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  const { data: currentData } = useGetAdminExperienceById(currentId);

  const form = useForm<ExperienceFormInputs>({
    resolver: zodResolver(experienceSchema) as Resolver<ExperienceFormInputs>,
    defaultValues: currentData ?? defaultExperienceValues,
  });

  useEffect(() => {
    form.reset(currentData);
  }, [currentData, form]);

  // Add achievement
  const handleAddAchievement = () => {
    const currentAchievements = form.getValues("achievements");
    if (!achievementInput.trim()) {
      toast.error("Achievement cannot be empty");
      return;
    }

    if (currentAchievements.length >= 10) {
      toast.error("Maximum 10 achievements allowed");
      return;
    }

    form.setValue("achievements", [
      ...currentAchievements,
      achievementInput.trim(),
    ]);
    setAchievementInput("");
  };

  // Remove achievement
  const handleRemoveAchievement = (index: number) => {
    const currentAchievements = form.getValues("achievements");
    form.setValue(
      "achievements",
      currentAchievements.filter((_, i) => i !== index),
    );
  };

  const {
    mutate: updateMutate,
    isPending: isSubmitting,
    error,
  } = useUpdateAdminExperienceById();

  // Submit form
  const onSubmit = async (values: ExperienceFormInputs) => {
    updateMutate(
      { id: currentId, payload: values },
      {
        onSuccess: () => {
          toast.success("Experience update successfully!");
          router.push("/admin/experience");
        },
        onError: () => {
          console.error("Update error:", error);
          toast.error("Failed to update experience");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Edit Work Experience
          </h1>
          <p className="text-white/60">
            Edit work experience to your portfolio
          </p>
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
          {/* Company & Position */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Company & Role
              </h2>
              <p className="text-sm text-white/60">Basic job information</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Company *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Google, Microsoft, etc."
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
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
                        placeholder="San Francisco, CA"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Position */}
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Position *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Software Engineer"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Employment Type */}
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Employment Type *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black/95 border-white/10">
                        <SelectItem value="full-time" className="text-white">
                          Full-time
                        </SelectItem>
                        <SelectItem value="part-time" className="text-white">
                          Part-time
                        </SelectItem>
                        <SelectItem value="contract" className="text-white">
                          Contract
                        </SelectItem>
                        <SelectItem value="freelance" className="text-white">
                          Freelance
                        </SelectItem>
                        <SelectItem value="internship" className="text-white">
                          Internship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Duration</h2>
              <p className="text-sm text-white/60">Employment period</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Start Date */}
              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      Start Date *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : undefined;
                          field.onChange(date);
                        }}
                        className="bg-white/5 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      End Date{" "}
                      {isCurrent && <span className="">(Optional)</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : undefined;
                          field.onChange(date);
                        }}
                        className="bg-white/5 border-white/10 text-white disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Is Current */}
            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="space-y-0.5">
                    <FormLabel className="text-white/80">
                      🟢 Current Position
                    </FormLabel>
                    <FormDescription className="text-white/40">
                      I currently work here
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          setIsCurrent(true);
                          form.setValue("endDate", undefined);
                        } else {
                          setIsCurrent(false);
                        }
                      }}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Job Description
              </h2>
              <p className="text-sm text-white/60">
                Describe your role and responsibilities
              </p>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your role, responsibilities, and what you worked on..."
                      rows={5}
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 resize-none"
                    />
                  </FormControl>
                  <FormDescription className="text-white/40">
                    {field.value.length}/1000 characters
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Achievements */}
          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Key Achievements
              </h2>
              <p className="text-sm text-white/60">
                Notable accomplishments in this role
              </p>
            </div>

            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Achievements * (Max 10)
                  </FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an achievement..."
                        value={achievementInput}
                        onChange={(e) => setAchievementInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddAchievement();
                          }
                        }}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50"
                      />
                      <Button
                        type="button"
                        onClick={handleAddAchievement}
                        disabled={field.value.length >= 10}
                        className="bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
                      >
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {field.value.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <span className="text-green-400">✓</span>
                          <span className="flex-1 text-white/80 text-sm">
                            {achievement}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAchievement(index)}
                            className="text-white/60 hover:text-red-400 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {field.value.length === 0 && (
                      <p className="text-sm text-white/40 text-center py-4">
                        No achievements added yet
                      </p>
                    )}
                  </div>
                  <FormDescription className="text-white/40">
                    {field.value.length}/10 achievements added
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
            disabled={isSubmitting}
            className="rounded-xl w-full"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-5 w-5" />
                Updating...
              </>
            ) : (
              "Update Experience"
            )}
          </GradientButton>
        </form>
      </Form>
    </div>
  );
}
