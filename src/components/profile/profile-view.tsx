'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { User, Crown, CreditCard, Sparkles, LogOut } from 'lucide-react';

export function ProfileView() {
  const router = useRouter();
  const { state, setUser, logout } = useApp();
  const { user, subscription } = state;
  
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const handleSave = () => {
    setUser({ name, email });
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isSubscribed = subscription.status === 'SUBSCRIBED';
  const planName = {
    free: 'Free',
    monthly: 'Monthly',
    yearly: 'Yearly',
  }[subscription.plan || 'free'];

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
                Manage your subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isSubscribed ? 'bg-yellow-100' : 'bg-muted'}`}>
                    <Crown className={`h-5 w-5 ${isSubscribed ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-medium">Current Plan: {planName}</p>
                    <p className="text-sm text-muted-foreground">
                      {isSubscribed ? 'Unlimited try-ons' : `${subscription.remainingTrials} trials remaining`}
                    </p>
                  </div>
                </div>
              </div>

              {!isSubscribed && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Upgrade to Premium</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Get unlimited try-ons, priority processing, and priority support.
                  </p>
                  <Button size="sm" asChild>
                    <a href="/pricing">View Plans</a>
                  </Button>
                </div>
              )}

              {isSubscribed && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Premium Member</strong> - You have unlimited access to all features!
                  </p>
                </div>
              )}

              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
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
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
