'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Virtual Try-On
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Try Clothes Before You Buy
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Upload your photo and any clothing image. See how it looks on you in seconds. Make smarter shopping decisions.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/try-on">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                3 Free Trials
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                No Credit Card Required
              </div>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg">
                  <Sparkles className="h-16 w-16 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">Demo Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
