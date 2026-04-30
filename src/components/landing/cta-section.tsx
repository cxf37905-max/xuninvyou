import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-stone-900 dark:bg-stone-950 text-stone-50">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-medium mb-6 text-stone-50">
          Ready to Try It On?
        </h2>
        <p className="text-stone-400 mb-10 max-w-xl mx-auto text-lg">
          Start with 3 free trials. No credit card required. See how clothes look on you today.
        </p>
        <Button 
          size="lg" 
          className="h-14 px-10 text-base bg-stone-50 text-stone-900 hover:bg-stone-200 rounded-none transition-all duration-300"
          asChild
        >
          <Link href="/try-on">
            Get Started Free
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
