'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { ImageUploadArea } from '@/components/tryon/image-upload-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Loader2, Sparkles, Info } from 'lucide-react';

export function TryOnView() {
  const router = useRouter();
  const { 
    state, 
    setPersonImage, 
    removePersonImage, 
    setClothingImage, 
    removeClothingImage,
    setStatus,
    setResult,
    setError,
    incrementTrialCount,
    canGenerate
  } = useApp();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const { tryOn, subscription } = state;
  const canGenerateNow = canGenerate();

  const handleGenerate = async () => {
    if (!canGenerateNow || !tryOn.personImage || !tryOn.clothingImage) return;

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
        throw new Error('Failed to generate try-on image');
      }

      const data = await response.json();
      
      incrementTrialCount();
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

  const isDisabled = isGenerating || (subscription.status !== 'SUBSCRIBED' && subscription.remainingTrials <= 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header showTrials />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Virtual Try-On</h1>
            <p className="mt-2 text-muted-foreground">
              Upload your photo and a clothing image to see how it looks on you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
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

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canGenerateNow || isGenerating}
              className="min-w-64"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating... {generationProgress}%
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Preview
                </>
              )}
            </Button>
          </div>

          {subscription.status !== 'SUBSCRIBED' && subscription.remainingTrials <= 0 && (
            <Card className="mt-6 border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-yellow-800">No Trials Remaining</CardTitle>
                <CardDescription className="text-yellow-700">
                  You have used all your free trials. Upgrade to continue trying on clothes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/pricing">Upgrade to Premium</a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Tips for Best Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc pl-4 space-y-1">
                <li>Use a clear full-body photo for best results</li>
                <li>Any clothing image works - no special requirements</li>
                <li>Results are for preview only, not exact fit</li>
                <li>Standing photos work better than sitting or complex poses</li>
              </ul>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            This is a preview image for reference only. Not a guarantee of exact fit or size.
          </p>
        </div>
      </main>
    </div>
  );
}
