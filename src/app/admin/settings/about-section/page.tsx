"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AboutSectionUpdateFormInputs,
  aboutSectionUpdateScheam,
  defaultAboutSection,
} from "../../../../schemas/admin.settings.about.section";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useSettings } from "../../../../hooks/usePublic";
import { useSettingsUpdate } from "../../../../hooks/useAdminSettings";
import { Button } from "../../../../components/ui/button";
import { Cross, Loader } from "../../../(public)/(components)/Svg";
import GradientButton from "../../../(public)/(components)/Button";
import { toast } from "sonner";

export default function AboutSecton() {
  const [aboutMeInput, setAboutMeInput] = useState("");

  const { data: settingsData } = useSettings();
  const { mutate: mutateSettings, isPending: settingsPending } =
    useSettingsUpdate();

  const form = useForm<AboutSectionUpdateFormInputs>({
    resolver: zodResolver(
      aboutSectionUpdateScheam,
    ) as Resolver<AboutSectionUpdateFormInputs>,
    defaultValues: defaultAboutSection,
  });

  useEffect(() => {
    if (settingsData) {
      form.reset(settingsData);
    }
  }, [settingsData, form]);

  const handleAddAboutMe = () => {
    const currentAboutMeData = form.getValues("aboutMe");
    if (
      aboutMeInput.trim() &&
      !currentAboutMeData.includes(aboutMeInput.trim())
    ) {
      const newAboutMeData = [...currentAboutMeData, aboutMeInput.trim()];
      form.setValue("aboutMe", newAboutMeData);
      setAboutMeInput("");
    }
  };

  const handleRemoveAboutMe = (aboutMe: string) => {
    const currentAboutMeData = form.getValues("aboutMe");
    const newAboutMeData = currentAboutMeData.filter((me) => me !== aboutMe);
    form.setValue("aboutMe", newAboutMeData);
  };

  function onSubmit(values: AboutSectionUpdateFormInputs) {
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">About Section</h1>
        <p className="text-white/60">Configure your about page content</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                About Content
              </h2>
              <p className="text-sm text-white/60">
                Main headline and subtitle
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="aboutTitle"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-white/80">
                      About Title *
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

              <FormField
                control={form.control}
                name="aboutSubTitle"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-white/80">
                      About Subtitle *
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

            <FormField
              control={form.control}
              name="aboutDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    Site Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of your website..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 resize-none min-h-25"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">
                    About Me * (Max 10)
                  </FormLabel>
                  <div className="space-y-3">
                    <div className="flex gap-2 relative">
                      <Textarea
                        placeholder="Briefly describe yourself or your website…"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 resize-none min-h-25"
                        value={aboutMeInput}
                        onChange={(e) => setAboutMeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddAboutMe();
                          }
                        }}
                      />

                      <Button
                        type="button"
                        onClick={handleAddAboutMe}
                        disabled={field.value.length >= 10}
                        className="absolute bottom-2 right-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {field.value.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <span
                            className={`flex-1 font-semibold text-white/40`}
                          >
                            {item}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveAboutMe(item)}
                            className="text-white/60 hover:text-white"
                          >
                            <Cross className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Stats & Achievements
              </h2>
              {/* <p className="text-sm text-white/60">
                Main headline and subtitle
              </p> */}
            </div>

            {/* 
5

50+
 */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-white/80">
                      Projects Done
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
              <FormField
                control={form.control}
                name="year_exp"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-white/80">
                      Years Experience
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
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-white/80">
                      Happy Clients
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
            </div>

            {/* Submit Button */}
          </div>

          <div>
            <GradientButton
              className="rounded-xl w-full"
              variant="outline"
              type="submit"
              disabled={settingsPending}
            >
              {settingsPending ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Saving Changes...
                </>
              ) : (
                "Save About Section"
              )}
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
