'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Crown, Sparkles } from 'lucide-react';

interface SubscriptionData {
  status: 'FREE_TRIAL' | 'TRIALS_EXHAUSTED' | 'SUBSCRIBED';
  plan: 'free' | 'monthly' | 'yearly';
  remainingTrials: number;
}

interface PricingViewProps {
  subscription: SubscriptionData;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out the service',
    features: [
      { text: '3 free trials', included: true },
      { text: 'Standard processing speed', included: true },
      { text: 'Session-level history', included: true },
      { text: 'Watermarked downloads', included: true },
      { text: 'Priority support', included: false },
      { text: 'Unlimited try-ons', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    description: 'Best for regular shoppers',
    features: [
      { text: 'Unlimited try-ons', included: true },
      { text: 'Priority processing speed', included: true },
      { text: 'Permanent history', included: true },
      { text: 'No watermarks', included: true },
      { text: 'Priority support', included: true },
      { text: 'Cancel anytime', included: true },
    ],
    cta: 'Select Monthly',
    popular: true,
  },
  {
    name: 'Yearly',
    price: '$79.99',
    period: '/year',
    description: 'Save 33% compared to monthly',
    features: [
      { text: 'Unlimited try-ons', included: true },
      { text: 'Priority processing speed', included: true },
      { text: 'Permanent history', included: true },
      { text: 'No watermarks', included: true },
      { text: 'Priority support', included: true },
      { text: 'Cancel anytime', included: true },
    ],
    cta: 'Select Yearly',
    popular: false,
    savings: 'Save 33%',
  },
];

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! New users get 3 free trials to test out the service before committing to a subscription.',
  },
  {
    question: 'What happens to my free trials if I subscribe?',
    answer: 'Your free trials are yours to use. Subscribing gives you unlimited access on top of any unused trials.',
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
];

export function PricingView({ subscription }: PricingViewProps) {
  const router = useRouter();

  const handleSelectPlan = (planName: string) => {
    router.push('/try-on');
  };

  const isCurrentPlan = (planName: string) => {
    if (planName === 'Free' && subscription.plan === 'free') return true;
    if (planName === 'Monthly' && subscription.plan === 'monthly') return true;
    if (planName === 'Yearly' && subscription.plan === 'yearly') return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 lg:py-28 bg-white dark:bg-stone-950">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-50">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-stone-500 dark:text-stone-400">
                Choose the plan that works best for you
              </p>
              <div className="w-16 h-0.5 bg-stone-300 dark:bg-stone-700 mx-auto mt-8" />
            </div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name}
                  className={`relative flex flex-col border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 ${plan.popular ? 'shadow-xl ring-1 ring-stone-900 dark:ring-stone-100' : 'hover:shadow-lg transition-shadow duration-300'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center rounded-full bg-stone-900 dark:bg-stone-100 px-4 py-1 text-xs font-medium text-stone-50 dark:text-stone-900">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  {plan.savings && (
                    <div className="absolute -top-3 right-4 z-10">
                      <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center justify-between text-xl text-stone-900 dark:text-stone-50">
                      {plan.name}
                      {plan.name === 'Monthly' && <Crown className="h-5 w-5 text-amber-500" />}
                    </CardTitle>
                    <CardDescription className="text-stone-500 dark:text-stone-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <div className="mb-8">
                      <span className="text-4xl font-medium text-stone-900 dark:text-stone-50">{plan.price}</span>
                      <span className="text-stone-500 dark:text-stone-400">{plan.period}</span>
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          {feature.included ? (
                            <Check className="mr-3 h-5 w-5 text-stone-700 dark:text-stone-300" />
                          ) : (
                            <X className="mr-3 h-5 w-5 text-stone-300 dark:text-stone-600" />
                          )}
                          <span className={feature.included ? 'text-stone-700 dark:text-stone-300' : 'text-stone-400 dark:text-stone-500'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardContent className="pt-6">
                    <Button 
                      className={`w-full h-12 text-base ${plan.popular ? 'bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200' : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'} rounded-none transition-all duration-300`}
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan.name)}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-stone-100 dark:bg-stone-900">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-medium text-center mb-12 text-stone-900 dark:text-stone-50">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700"
                >
                  <h3 className="text-lg font-medium mb-2 text-stone-900 dark:text-stone-100">{faq.question}</h3>
                  <p className="text-stone-500 dark:text-stone-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
