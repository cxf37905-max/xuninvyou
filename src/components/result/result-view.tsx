'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Download, RefreshCw, Shirt, ArrowRight, AlertCircle } from 'lucide-react';

export function ResultView() {
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

  if (!tryOn.resultImage) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showTrials />
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
      <Header showTrials />
      
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

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={handleDownload}>
              <Download className="mr-2 h-5 w-5" />
              Download
            </Button>
            
            <Button size="lg" variant="outline" onClick={handleRegenerate}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Regenerate
            </Button>
            
            <Button size="lg" variant="secondary" onClick={handleTryAnother}>
              <Shirt className="mr-2 h-5 w-5" />
              Try Another
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Category Detected:</span>
                  <span className="text-muted-foreground">{categoryLabel}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Preview Only - Not Exact Fit</p>
                  <p className="text-yellow-700">
                    This is a preview image for reference only. Not a guarantee of exact fit, 
                    size, or real-world appearance. Results may vary based on input image quality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
