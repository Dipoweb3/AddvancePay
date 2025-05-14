
import { Loader2 } from "lucide-react";

const AuthLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};

export default AuthLoading;
