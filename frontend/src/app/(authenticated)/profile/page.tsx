import HeadingWithBack from '@/components/shared/HeadingWithBack';
import { getProfile } from '@/modules/auth/actions';
import ResetPasswordButton from '@/modules/user/components/ResetPasswordButton';

export const metadata = {
  title: 'Profile',
  description: 'View your profile information',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-2">
      <div className="">
        <HeadingWithBack backUrl="/dashboard">Your profile</HeadingWithBack>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Left card - Avatar */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center h-full">
              <ProfileAvatar />
            </div>
          </div>
          
          {/* Right card - Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
              <ProfileInfo />
            </div>
          </div>
          
          {/* Bottom card - Security (spans full width) */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="max-w-md mx-auto">
                <p className="text-xl font-semibold text-gray-800 mb-4 text-center">Security</p>
                <ResetPasswordButton />
                <p className="mt-3 text-sm text-gray-500 text-center">
                  You will receive an email with a password reset link to your registered email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponent dla avatara
async function ProfileAvatar() {
  const { name } = await getProfile();
  return (
    <>
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4">
        <span className="text-5xl font-bold text-orange-500">{name?.charAt(0).toUpperCase() || 'U'}</span>
      </div>
      <h1 className="text-2xl font-bold text-white">{name}</h1>
      <p className="text-white text-opacity-80 mt-1">User</p>
    </>
  );
}

// Komponent dla informacji profilu
async function ProfileInfo() {
  const { email, created_at } = await getProfile();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <span className="text-base text-gray-500">Email</span>
        <span className="text-lg font-medium text-gray-800 mt-1">{email}</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-base text-gray-500">Member Since</span>
        <span className="text-lg font-medium text-gray-800 mt-1">
          {created_at ? new Date(created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'N/A'}
        </span>
      </div>
    </div>
  );
}

