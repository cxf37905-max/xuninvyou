'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, History, User, LogOut, Sparkles } from 'lucide-react';

interface HeaderProps {
  showTrials?: boolean;
  remainingTrials?: number;
  isSubscribed?: boolean;
}

export function Header({ showTrials = false, remainingTrials = 0, isSubscribed = false }: HeaderProps) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-bold">VirtualTryOn</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {showTrials && isLoggedIn && (
            <div className="flex items-center space-x-2 rounded-full bg-secondary px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">
                {isSubscribed 
                  ? 'Unlimited' 
                  : `${remainingTrials} Free Trials`}
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          ) : isLoggedIn ? (
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
                  {session.user?.name || 'Profile'}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
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
