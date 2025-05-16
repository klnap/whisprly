import Button from '@/components/shared/Button';
import Image from 'next/image';
import { verifySession } from '@/modules/auth/actions';

export default async function DashboardPage() {

  // console.log('DASHBOARD PAGE');
  const user = await verifySession(); 

  return (
    <div className="flex flex-1 w-full items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-8">
      <div className="container w-full flex flex-col md:flex-row overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Lewa strona - zdjęcie */}
        <div className="w-full md:w-1/2 relative min-h-[300px]">
          <Image 
            src="/images/dashboard.webp" 
            alt="Friends chatting in cafe" 
            fill
            className="brightness-100 contrast-105 object-cover"
            priority
          />
        </div>
        
        {/* Prawa strona - treść */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-12">
          <div className='space-y-6'>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                Welcome, {user?.name || 'User'}!
              </h1>
           
            <p className="text-lg text-gray-600">
              Our platform connects people with similar interests. Start chatting now and discover a world of engaging conversations.         
            </p>
            

          </div>
          
          <div className="pt-4">
            <Button fullWidth className="text-2xl font-semibold">
              Start Chatting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 