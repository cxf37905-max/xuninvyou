'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Ready to Try It On?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Start with 3 free trials. No credit card required. See how clothes look on you today.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/try-on">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
