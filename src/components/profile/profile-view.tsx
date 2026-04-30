'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Crown, CreditCard, Sparkles, LogOut } from 'lucide-react';

interface SubscriptionData {
  status: 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED';
  plan: 'free' | 'monthly' | 'yearly';
  remainingTrials: number;
}

interface ProfileViewProps {
  subscription: SubscriptionData;
}

export function ProfileView({ subscription }: ProfileViewProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const isSubscribed = subscription.status === 'SUBSCRIBED';
  const planName = {
    free: 'Free',
    monthly: 'Monthly',
    yearly: 'Yearly',
  }[subscription.plan];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your account information
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="flex gap-2">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    disabled
                  />
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Subscription
              </CardTitle>
              <CardDescription>
                Your current plan and usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isSubscribed ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    {isSubscribed ? (
                      <Crown className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{planName} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {isSubscribed ? 'Unlimited try-ons' : `${subscription.remainingTrials} trials remaining`}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <a href="/pricing">Change Plan</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
