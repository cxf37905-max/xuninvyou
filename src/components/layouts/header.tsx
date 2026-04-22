'use client';

import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, History, User, LogOut, Sparkles } from 'lucide-react';

interface HeaderProps {
  showTrials?: boolean;
}

export function Header({ showTrials = false }: HeaderProps) {
  const { state, logout } = useApp();
  const { subscription, session } = state;
  const isLoggedIn = session.userType === 'LOGGED_IN';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-bold">VirtualTryOn</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {showTrials && (
            <div className="flex items-center space-x-2 rounded-full bg-secondary px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">
                {subscription.status === 'SUBSCRIBED' 
                  ? 'Unlimited' 
                  : `${subscription.remainingTrials} Free Trials`}
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">
                  <History className="mr-2 h-4 w-4" />
                  History
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
