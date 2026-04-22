'use client';

import { Upload, Zap, ShoppingBag } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 text-muted-foreground">Three simple steps to see how clothes look on you</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">1. Upload Your Photo</h3>
            <p className="text-muted-foreground">
              Upload any photo of yourself. Works best with full-body shots.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">2. Pick a Clothing</h3>
            <p className="text-muted-foreground">
              Choose any clothing image you want to try on. Any angle works.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">3. Get Preview</h3>
            <p className="text-muted-foreground">
              In 10-20 seconds, get a realistic try-on preview for reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
