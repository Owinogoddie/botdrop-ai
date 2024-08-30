"use client";

import Footer from "@/app/(landing)/_components/footer";
import Header from "@/app/(landing)/_components/header";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogins from "../_components/socials";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum RegistrationStep {
  INITIAL,
  OTP,
  VERIFY,
}

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage(): JSX.Element {
  const [form, setForm] = useState<RegistrationForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState<RegistrationStep>(RegistrationStep.INITIAL);
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [redirecting, setRedirecting] = useState<boolean>(false); // Redirecting state for final step
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    setLoading(false);
    if (response.ok) {
      setStep(RegistrationStep.OTP);
    } else {
      const data = await response.json();
      toast.error(data.error);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 
    const response = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: otp }),
    });
    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setStep(RegistrationStep.VERIFY);
    } else if (data.expired) {
      toast.error("Verification code has expired. Please sign up again.");
      setStep(RegistrationStep.INITIAL);
      setForm({ email: "", password: "", confirmPassword: "" });
      setOtp("");
    } else {
      toast.error(data.error);
    }
  };

  const handleVerify = () => {
    setRedirecting(true);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  const renderStep = () => {
    if (redirecting) {
      return (
        <div className="text-center">
          <p className="text-gray-600">Redirecting to your dashboard...</p>
          <div className="loader mt-4"></div>
        </div>
      );
    }

    switch (step) {
      case RegistrationStep.INITIAL:
        return (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        );
      case RegistrationStep.OTP:
        return (
          <form className="space-y-6" onSubmit={handleOtpSubmit}>
            <div>
              <p className="text-center text-secondary/90 py-4">An email has been sent to you please confirm by entering the otp sent , if not available, check spam</p>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        );
      case RegistrationStep.VERIFY:
        handleVerify(); // Trigger the redirect logic
        return (
          <div className="text-center">
            <p className="text-gray-600">Redirecting to your login please wait...</p>
            <div className="loader mt-4"></div>
          </div>
        );
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {renderStep()}

            {step === RegistrationStep.INITIAL && <SocialLogins />}
            <div className="mtmt-6 text-center">
              <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
