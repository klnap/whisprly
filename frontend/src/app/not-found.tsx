import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import { cn } from '@/lib/utils'
import NotFoundImage from '@/assets/images/not-found.webp'

export default async function NotFound() {



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8 bg-white rounded-2xl shadow-lg p-8">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src={NotFoundImage}
            alt="Page not found"
            fill
            priority
            className="object-contain"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Oops! Page not found</h1>
          <p className="text-lg text-gray-600">
            The page you are looking for doesn't seem to exist. It might have been removed or relocated.
          </p>

          <div className="pt-4">
            <Link href="/" passHref>
              <Button 
                variant="primary" 
                fullWidth
                className="mt-4"
              >
                Return to homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}