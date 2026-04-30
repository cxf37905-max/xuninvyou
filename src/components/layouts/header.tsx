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
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <span className="text-lg font-medium text-stone-900 dark:text-stone-50 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            VirtualTryOn
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {showTrials && isLoggedIn && (
            <div className="flex items-center gap-2 px-4 py-1.5 mr-4 border border-stone-200 dark:border-stone-700">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {isSubscribed 
                  ? 'Unlimited' 
                  : `${remainingTrials} Trials`}
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-sm bg-stone-200 dark:bg-stone-800" />
          ) : isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                asChild
              >
                <Link href="/history">
                  <History className="mr-2 h-4 w-4" />
                  History
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                asChild
              >
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  {session.user?.name || 'Profile'}
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                asChild
              >
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
