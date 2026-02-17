"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ProfileFormInputs,
  profileSchema,
  UpdatePasswordInputs,
  updatePasswordSchema,
} from "../../../schemas/admin.profile.schema";
import GradientButton from "../../(public)/(components)/Button";
import {
  useGetAdminProfile,
  useUpdateAdminPassword,
  useUpdateAdminProfile,
} from "../../../hooks/useAdminProfile";
import Loading from "../../(public)/loading";
import { signOut } from "next-auth/react";

// ─── Default Values ───────────────────────────────────────
const defaultProfileValues: ProfileFormInputs = {
  name: "",
  email: "",
  phone: "",
};

const defaultPasswordValues: UpdatePasswordInputs = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfilePage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: adminProfileData, isLoading } = useGetAdminProfile();

  // ─── Profile Form ─────────────────────────────────────
  const profileForm = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: adminProfileData ?? defaultProfileValues,
  });

  // ─── Password Form ────────────────────────────────────
  const passwordForm = useForm<UpdatePasswordInputs>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: defaultPasswordValues,
  });

  useEffect(() => {
    profileForm.reset(adminProfileData);
  }, [adminProfileData, profileForm]);

  // ─── Handlers ─────────────────────────────────────────
  const { mutate: updateProfile } = useUpdateAdminProfile();
  const onProfileSubmit = async (values: ProfileFormInputs) => {
    updateProfile(values, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });
  };

  const { mutate: updatePassword } = useUpdateAdminPassword();
  const onPasswordSubmit = async (values: UpdatePasswordInputs) => {
    updatePassword(values, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        setTimeout(async () => {
          await signOut({
            callbackUrl: "/login",
            redirect: true,
          });
        }, 1500);
      },
      onError: () => {
        toast.error("Failed to change password");
      },
    });
  };

  return (
    <div className="space-y-6">
      {isLoading && <Loading />}
      <div className="">
        <h1 className="text-3xl font-bold text-white mb-1">
          Account{" "}
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>
        <p className="text-white/50 text-sm">
          Manage your profile information and security
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        {/* ─── Profile Form ─────────────────────────────── */}
        <div className="col-span-12 md:col-span-7 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <User size={18} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Profile Information
              </h2>
              <p className="text-xs text-white/50">
                Update your personal details
              </p>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-5"
              >
                {/* Name */}
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        Phone Number{" "}
                        <span className="text-white/30 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="10-digit phone number"
                            maxLength={10}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <div>
                  <GradientButton
                    className="rounded-xl w-full flex gap-2 items-center"
                    variant="outline"
                    type="submit"
                    // disabled={settingsPending || isUploading}
                  >
                    {profileForm.formState.isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </GradientButton>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
              <ShieldCheck size={18} className="text-pink-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                Change Password
              </h2>
              <p className="text-xs text-white/50">Keep your account secure</p>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-5"
              >
                {/* Old Password */}
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword((p) => !p)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showOldPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Min 6 characters"
                            className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((p) => !p)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showNewPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70 text-sm">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                          />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repeat new password"
                            className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-11"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password strength hint */}
                <p className="text-xs text-white/30 flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  Use at least 6 characters with letters and numbers
                </p>

                {/* Submit Button */}

                <div>
                  <GradientButton
                    className="rounded-xl w-full flex gap-2 items-center"
                    variant="outline"
                    type="submit"
                    // disabled={settingsPending || isUploading}
                  >
                    {passwordForm.formState.isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Update Password</span>
                      </>
                    )}
                  </GradientButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
