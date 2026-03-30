
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { XIcon } from "@/components/icons/XIcon";
import { GoogleAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getStudentProgress } from "@/services/student-data";

export function SocialLogins() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async (provider: GoogleAuthProvider | TwitterAuthProvider, providerName: string) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Ensure a student progress document is created on first social login
      await getStudentProgress(user.uid, user.displayName || 'New User', user.email || undefined);
      
      toast({
        title: "Login Successful",
        description: "Welcome!",
        variant: "success",
      });
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = `Could not sign in with ${providerName}.`;
      switch (error.code) {
        case 'auth/operation-not-allowed':
          errorMessage = `Sign-in with ${providerName} is not enabled. Please enable it in your Firebase console under Authentication > Sign-in method.`;
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = `Sign-in with ${providerName} was cancelled.`;
          return; // Don't show a toast for this
        case 'auth/cancelled-popup-request':
            return; // Don't show a toast for this
        default:
          errorMessage = `Could not sign in with ${providerName}. ${error.message}`;
          break;
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex justify-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={() => handleSignIn(new GoogleAuthProvider(), 'Google')}>
              <GoogleIcon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in with Google</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={() => handleSignIn(new TwitterAuthProvider(), 'X')}>
              <XIcon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in with X (Twitter)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
