import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#fafaf9] dark:bg-[#0c0a09]">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-stone-200/30 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col items-start max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-stone-200 dark:border-stone-800 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">AI-Powered Virtual Try-On</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-medium leading-[1.1] mb-6 tracking-tight text-stone-900 dark:text-stone-50">
              Try Before <br />
              <span className="text-stone-400 dark:text-stone-500">You Buy</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-stone-500 dark:text-stone-400 mb-10 max-w-md leading-relaxed">
              Upload your photo and any clothing item. See how it looks on you in seconds. Make confident shopping decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900 rounded-none transition-all duration-300"
                asChild
              >
                <Link href="/try-on">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-none transition-all duration-300"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-600" />
                <span>3 Free Trials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-600" />
                <span>No Credit Card</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 dark:from-stone-800 dark:to-stone-900 rounded-sm" />
              <div className="absolute inset-8 border border-stone-200/50 dark:border-stone-700/50 rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-stone-200/50 dark:bg-stone-700/50 flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-stone-400" />
                  </div>
                  <p className="text-stone-400 dark:text-stone-500 font-medium">Virtual Try-On Preview</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-50 dark:bg-amber-900/20 rounded-sm -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-stone-100 dark:bg-stone-800 rounded-sm -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
