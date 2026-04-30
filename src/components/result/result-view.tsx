'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Download, RefreshCw, Shirt, ArrowRight, AlertCircle } from 'lucide-react';

interface SubscriptionData {
  status: 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED';
  plan: 'free' | 'monthly' | 'yearly';
  remainingTrials: number;
}

interface ResultViewProps {
  subscription: SubscriptionData;
}

export function ResultView({ subscription }: ResultViewProps) {
  const router = useRouter();
  const { state, clearResult } = useApp();
  const { tryOn } = state;

  const handleDownload = () => {
    if (!tryOn.resultImage) return;
    
    const link = document.createElement('a');
    link.href = tryOn.resultImage;
    link.download = `tryon-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTryAnother = () => {
    clearResult();
    router.push('/try-on');
  };

  const handleRegenerate = () => {
    router.push('/try-on');
  };

  const isSubscribed = subscription.status === 'SUBSCRIBED';

  if (!tryOn.resultImage) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showTrials remainingTrials={subscription.remainingTrials} isSubscribed={isSubscribed} />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Result Available</h2>
              <p className="text-muted-foreground mb-4">
                You haven&apos;t generated any try-on results yet.
              </p>
              <Button onClick={() => router.push('/try-on')}>
                Go to Try-On Page
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const categoryLabel = {
    top: 'Top',
    bottom: 'Bottom',
    dress: 'Dress',
  }[tryOn.detectedCategory || 'top'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header showTrials remainingTrials={subscription.remainingTrials} isSubscribed={isSubscribed} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Your Try-On Preview</h1>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s how the clothing looks on you
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden border bg-muted">
            <img
              src={tryOn.resultImage}
              alt="Try-on result"
              className="w-full h-auto"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownload} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
            <Button variant="outline" onClick={handleRegenerate} className="flex-1 sm:flex-none">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Another
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Button variant="link" onClick={handleTryAnother}>
              <Shirt className="mr-2 h-4 w-4" />
              Upload More Clothes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
