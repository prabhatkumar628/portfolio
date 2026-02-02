"use client";
import "./style.css";
import { clsx } from "clsx";
import { ArrowLeft } from "../(components)/Svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../../../schemas/message.schema";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { contactMethods, countryCodes } from "./Data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import GradientButton from "../(components)/Button";

export default function ContactPage() {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: { countryCode: "", number: "" },
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {};

  return (
    <main className="mx-auto max-w-7xl p-4 py-12">
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl mb-4">
          Let{`'`}s{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Connect 🤝
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? I{`'`}d love to hear from
          you. Drop me a message and I{`'`}ll get back to you as soon as
          possible!
        </p>
      </div>

      {/* ================= CENTERED FORM ================= */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-6 shadow-2xl">
          <div className="relative space-y-5">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-white/60">
                Fill out the form below and I{`'`}ll get back to you shortly
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm text-white/70">
                        Name
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1 p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-linear-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                          <Input
                            placeholder="Full Name"
                            className="rounded-full bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm text-white/70">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1 p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-linear-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                          <Input
                            placeholder="you@example.com"
                            className="rounded-full bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <div className="space-y-2">
                  <div className="text-sm text-white/70">Phone Number</div>
                  <div className="flex gap-2">
                    {/* Country Code Select */}
                    <FormField
                      control={form.control}
                      name="phone.countryCode"
                      render={({ field }) => (
                        <FormItem className="group w-fit">
                          <FormControl>
                            <div className="p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-linear-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={clsx(
                                      "w-full justify-between rounded-full bg-black/70 border-none text-white hover:bg-black/80 hover:text-white focus:ring-0 focus:ring-offset-0",
                                      !field.value && "text-white/40",
                                    )}
                                  >
                                    {field.value
                                      ? countryCodes.find(
                                          (code) => code.value === field.value,
                                        )?.value
                                      : "Code"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-62.5 p-0 bg-black/95 border-white/10">
                                  <Command className="bg-transparent">
                                    <CommandInput
                                      placeholder="Search country..."
                                      className="h-9 text-white border-none focus:ring-0"
                                    />
                                    <CommandList className="max-h-75 overflow-y-auto">
                                      <CommandEmpty className="text-white/70 py-6 text-center text-sm">
                                        No country found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {countryCodes.map((code) => (
                                          <CommandItem
                                            key={code.value}
                                            value={code.label}
                                            onSelect={() => {
                                              field.onChange(code.value);
                                            }}
                                            className="text-white hover:bg-white/10 cursor-pointer"
                                          >
                                            <Check
                                              className={clsx(
                                                "mr-2 h-4 w-4",
                                                field.value === code.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {code.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number Input */}
                    <FormField
                      control={form.control}
                      name="phone.number"
                      render={({ field }) => (
                        <FormItem className="group flex-1">
                          <FormControl>
                            <div className="p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-linear-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                              <Input
                                placeholder="Phone Number"
                                type="tel"
                                className="rounded-full bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400">
                            {form.formState.errors.phone?.countryCode
                              ?.message ||
                              form.formState.errors.phone?.number?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="group">
                      <FormLabel className="text-sm text-white/70">
                        Message
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1 p-0.5 rounded-2xl bg-white/10 transition-all duration-300 group-focus-within:bg-linear-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                          <Textarea
                            placeholder="Your message..."
                            className="rounded-2xl min-h-30 bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <GradientButton
                  type="submit"
                  gradient="purple"
                  size="sm"
                  className="w-full"
                >
                  Send Message
                </GradientButton>
              </form>
            </Form>

            {/* Privacy Note */}
            <p className="text-xs text-white/40 text-center mt-4">
              Your information is safe and will never be shared with third
              parties.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTACT DETAILS SECTION ================= */}
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Other Ways to Reach Me
          </h2>
          <p className="text-white/60">
            Choose your preferred method of communication
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="group relative">
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block h-full"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    {/* linear Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${method.color} text-white mb-4`}
                    >
                      {method.icon}
                    </div>

                    {/* Label */}
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {method.label}
                    </h3>

                    {/* Value */}
                    <p
                      className={`text-sm text-white/70 transition-colors ${method.hoverColor} wrap-break-word`}
                    >
                      {method.value}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                      <span className="text-xs font-medium">Contact</span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ) : (
                <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  {/* linear Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${method.color} text-white mb-4`}
                  >
                    {method.icon}
                  </div>

                  {/* Label */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {method.label}
                  </h3>

                  {/* Value */}
                  <p className="text-sm text-white/70 wrap-break-word">
                    {method.value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-white font-semibold">
                  Quick Response Time
                </h3>
                <p className="text-sm text-white/60">Usually within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-white font-semibold">Available Globally</h3>
                <p className="text-sm text-white/60">
                  Remote collaborations welcome
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="text-white font-semibold">Open for Projects</h3>
                <p className="text-sm text-white/60">
                  Let{`'`}s build something amazing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
