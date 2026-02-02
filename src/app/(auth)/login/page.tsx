"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../schemas/auth.schemas";
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
import GradientButton from "../../(public)/(components)/Button";
import Link from "next/link";
import MainBgLoop from "../../(public)/(components)/MainBgLoop";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const searchPaarams = useSearchParams()
  const callbackUrl = searchPaarams.get("callbackUrl") || "/admin/dashboard"
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl, 
    });

    if (res?.error) {
      alert(res.error);
      return;
    }

    router.replace(callbackUrl);
  };

  return (
    <MainBgLoop>
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-2xl">
            <div className="relative space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                  <span className="text-sm text-purple-400 font-medium">
                    👋 Welcome Back
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
                <p className="text-sm text-white/60">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
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
                          <div className="mt-1 p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-gradient-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                            <Input
                              placeholder="you@example.com"
                              type="email"
                              className="rounded-full bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="group">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm text-white/70">
                            Password
                          </FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="mt-1 p-0.5 rounded-full bg-white/10 transition-all duration-300 group-focus-within:bg-gradient-to-r group-focus-within:from-purple-500 group-focus-within:via-pink-500 group-focus-within:to-indigo-500">
                            <Input
                              placeholder="Enter your password"
                              type="password"
                              className="rounded-full bg-black/70 border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    className="w-full rounded-full mt-6"
                  >
                    Sign In 🚀
                  </GradientButton>
                </form>
              </Form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-black/40 text-white/50">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm">Google</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-sm text-center text-white/60 mt-6">
                Don{`'`}t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>

              {/* Privacy Note */}
              <p className="text-xs text-white/40 text-center mt-4">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </MainBgLoop>
  );
}
