'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Crown, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

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

export function PricingView() {
  const router = useRouter();
  const { state, setSubscriptionStatus, setSubscriptionPlan } = useApp();
  const { subscription } = state;

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Free') {
      setSubscriptionStatus('FREE_USERS');
      setSubscriptionPlan('free');
    } else if (planName === 'Monthly') {
      setSubscriptionStatus('SUBSCRIBED');
      setSubscriptionPlan('monthly');
    } else if (planName === 'Yearly') {
      setSubscriptionStatus('SUBSCRIBED');
      setSubscriptionPlan('yearly');
    }
    
    router.push('/try-on');
  };

  const isCurrentPlan = (planName: string) => {
    if (planName === 'Free' && subscription.plan === 'free') return true;
    if (planName === 'Monthly' && subscription.plan === 'monthly') return true;
    if (planName === 'Yearly' && subscription.plan === 'yearly') return false;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Choose Your Plan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start with 3 free trials, then upgrade for unlimited access
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  {plan.savings && (
                    <div className="absolute -top-3 right-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      {plan.name === 'Monthly' || plan.name === 'Yearly' ? (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      ) : null}
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-muted-foreground'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan.name)}
                      disabled={isCurrentPlan(plan.name)}
                    >
                      {isCurrentPlan(plan.name) ? 'Current Plan' : plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
