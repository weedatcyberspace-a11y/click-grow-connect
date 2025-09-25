import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || (formData.isSignUp && !formData.name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (formData.isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: formData.name
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account Created",
          description: "Please check your email to verify your account",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : (formData.isSignUp ? "Create Account" : "Login")}
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