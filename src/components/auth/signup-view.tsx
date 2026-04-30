'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile'

export function SignupView() {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Registration succeeded but login failed. Please try logging in.');
        setIsLoading(false);
        return;
      }

      router.push('/try-on');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 px-4 py-12">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-stone-200/30 to-transparent rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md relative z-10 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center border border-stone-300 dark:border-stone-600">
            <Sparkles className="h-8 w-8 text-stone-700 dark:text-stone-300" />
          </div>
          <CardTitle className="text-3xl font-medium text-stone-900 dark:text-stone-50">Create an Account</CardTitle>
          <CardDescription className="text-stone-500 dark:text-stone-400 mt-2">
            Sign up to start your virtual try-on experience
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-stone-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-stone-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-stone-500"
              />
            </div>

            <div className="flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                }}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-stone-500 dark:text-stone-400">Already have an account? </span>
            <Link href="/login" className="text-stone-900 dark:text-stone-100 font-medium hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
