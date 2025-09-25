import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userData: { email: string; name: string }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    isSignUp: false,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || (formData.isSignUp && !formData.name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Mock login/signup - in real app this would connect to backend
    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
    };

    toast({
      title: formData.isSignUp ? "Account Created" : "Login Successful",
      description: `Welcome ${userData.name}!`,
    });

    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {formData.isSignUp ? "Create Account" : "Login"}
          </CardTitle>
          <CardDescription>
            {formData.isSignUp 
              ? "Join our investment platform" 
              : "Access your investment dashboard"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {formData.isSignUp ? "Create Account" : "Login"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setFormData(prev => ({ ...prev, isSignUp: !prev.isSignUp }))}
            >
              {formData.isSignUp 
                ? "Already have an account? Login" 
                : "Don't have an account? Sign up"
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};