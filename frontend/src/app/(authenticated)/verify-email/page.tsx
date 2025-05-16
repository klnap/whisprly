import { verifySession } from "@/modules/auth/actions";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";
import Button from "@/components/shared/Button";

export default async function VerifyEmailPage() {
  const user = await verifySession();
  
  return (
    <div className="flex flex-1 min-h-screen flex-col items-center justify-center space-y-12"> 
      <h1 className="flex text-4xl sm:text-6xl flex-col items-center justify-center space-y-4">
        <div className="space-x-2">
          <span>Hello</span>  
          <span className="text-orange-600">{user?.name}</span>
        </div>
        <span>verify your email</span>
      </h1>
      <p className="text-gray-700 text-xl">
        We've sent a verification link to <span className="font-medium">{user?.email}</span>.
      </p>


      <p className="text-gray-700 text-xl">
        If you don't see the verification email in your main inbox, check your spam folder.
      </p>


<div className="flex flex-col items-center justify-center space-y-4 mt-12">
<p className="text-gray-700 text-xl">
        Haven't registered in our app or want to create a new account?
      </p>
      <Button variant="secondary" >
        <LogoutButton />
      </Button>

</div>
    
    </div>
  );
} 