'use client'
import { getGoogleOauthConsentUrl } from '@/app/actions/auth/actions';
import React from 'react';
import toast from 'react-hot-toast';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialLogins = () => {
  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await getGoogleOauthConsentUrl();
      
      if (response.success && response.url) {
        window.location.href = response.url; // Redirect to the OAuth provider's consent screen
      } else if (response.error) {
        toast.error(response.error);
      } else {
        toast.error('An unknown error occurred.');
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`An error occurred during ${provider} login. Please try again.`);
    }
  };
  

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialLogin("google")}
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
          <span>Google</span>
        </button>
        <button
          onClick={() => handleSocialLogin("github")}
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaGithub className="w-5 h-5 text-gray-800 mr-2" />
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogins;