'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { ImageUploadArea } from '@/components/tryon/image-upload-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Loader2, Sparkles, Info } from 'lucide-react';

interface SubscriptionData {
  status: 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED';
  plan: 'free' | 'monthly' | 'yearly';
  remainingTrials: number;
}

interface TryOnViewProps {
  subscription: SubscriptionData;
}

export function TryOnView({ subscription }: TryOnViewProps) {
  const router = useRouter();
  const { 
    state, 
    setPersonImage, 
    removePersonImage, 
    setClothingImage, 
    removeClothingImage,
    setStatus,
    setResult,
    setError
  } = useApp();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const { tryOn } = state;
  const canGenerate = subscription.status === 'SUBSCRIBED' || subscription.remainingTrials > 0;
  const isSubscribed = subscription.status === 'SUBSCRIBED';

  const handleGenerate = async () => {
    if (!canGenerate || !tryOn.personImage || !tryOn.clothingImage) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setStatus('GENERATING');

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 1500);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personImage: tryOn.personPreviewUrl,
          clothingImage: tryOn.clothingPreviewUrl,
        }),
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate try-on image');
      }

      const data = await response.json();
      
      setResult(data.resultImage, data.generationId, data.category);
      
      setTimeout(() => {
        router.push('/result');
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('ERROR');
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || !canGenerate;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      <Header 
        showTrials 
        remainingTrials={subscription.remainingTrials}
        isSubscribed={isSubscribed}
      />
      
      <main className="flex-1 container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-medium mb-3 text-stone-900 dark:text-stone-50">Virtual Try-On</h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-md mx-auto">
              Upload your photo and a clothing image to see how it looks on you
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <ImageUploadArea
              label="Your Photo"
              imagePreview={tryOn.personPreviewUrl}
              onImageChange={setPersonImage}
              onImageRemove={removePersonImage}
              disabled={isDisabled}
            />
            
            <ImageUploadArea
              label="Clothing Image"
              imagePreview={tryOn.clothingPreviewUrl}
              onImageChange={setClothingImage}
              onImageRemove={removeClothingImage}
              disabled={isDisabled}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="h-14 px-12 text-base bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 rounded-none transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Generating... {generationProgress}%
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5" />
                  Generate Preview
                </>
              )}
            </Button>
          </div>

          {!isSubscribed && subscription.remainingTrials <= 0 && (
            <Card className="mt-8 max-w-lg mx-auto border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-amber-800 dark:text-amber-200">No Trials Remaining</CardTitle>
                <CardDescription className="text-amber-700 dark:text-amber-300">
                  You have used all your free trials. Upgrade to continue trying on clothes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-amber-700 hover:bg-amber-800 text-white">
                  <a href="/pricing">Upgrade to Premium</a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="mt-8 max-w-2xl mx-auto border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-stone-500" />
                <CardTitle className="text-base text-stone-900 dark:text-stone-100">Tips for Best Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-stone-500 dark:text-stone-400 space-y-2">
              <ul className="list-disc pl-4 space-y-1">
                <li>Use a clear full-body photo for best results</li>
                <li>Any clothing image works - no special requirements</li>
                <li>Results are for preview only, not exact fit</li>
                <li>Standing photos work better than sitting or complex poses</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
