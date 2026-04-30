import { Zap, CreditCard, RefreshCw, Layers, Clock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Low Input Barrier",
    description: "No need for professional photos. Any casual photo works. No standard pose required."
  },
  {
    icon: Clock,
    title: "Quick Results",
    description: "Get your try-on preview in 10-20 seconds. Fast and convenient for busy shoppers."
  },
  {
    icon: CreditCard,
    title: "Save Money",
    description: "Avoid expensive returns. Try before you buy and make confident purchasing decisions."
  },
  {
    icon: Layers,
    title: "Multiple Categories",
    description: "Supports tops, bottoms, and dresses. Mix and match to find your perfect style."
  },
  {
    icon: RefreshCw,
    title: "Reusable Sessions",
    description: "Upload your photo once, try multiple clothes in one session. Efficient and time-saving."
  },
  {
    icon: Sparkles,
    title: "For Shopping Reference",
    description: "Designed for purchase decisions. Not exact fit guarantee, but valuable preview."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-[#0c0a09]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-50">
            Why Choose VirtualTryOn
          </h2>
          <div className="w-16 h-0.5 bg-stone-300 dark:bg-stone-700 mx-auto" />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-800/50 transition-all duration-500 hover:border-stone-300 dark:hover:border-stone-600"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-stone-900 dark:bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="w-12 h-12 mb-6 flex items-center justify-center border border-stone-300 dark:border-stone-600">
                <feature.icon className="h-6 w-6 text-stone-700 dark:text-stone-300" />
              </div>
              
              <h3 className="text-xl font-medium mb-3 text-stone-900 dark:text-stone-50">
                {feature.title}
              </h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
