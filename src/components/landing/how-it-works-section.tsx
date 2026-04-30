import { Upload, Zap, ShoppingBag, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Upload Your Photo",
    description: "Take a photo of yourself or upload an existing one. Any casual photo works great.",
    icon: Upload
  },
  {
    number: "02",
    title: "Choose Clothing",
    description: "Select any clothing item you want to try on. Upload an image or paste a URL.",
    icon: Zap
  },
  {
    number: "03",
    title: "See the Result",
    description: "Our AI generates a realistic preview of how the clothes look on you in seconds.",
    icon: ShoppingBag
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-stone-100 dark:bg-stone-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-50">
            How It Works
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-4 max-w-md mx-auto">
            Three simple steps to see how clothes look on you
          </p>
          <div className="w-16 h-0.5 bg-stone-400 dark:bg-stone-600 mx-auto mt-6" />
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="relative p-8 lg:p-12 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <span className="absolute top-6 right-6 text-6xl font-medium text-stone-100 dark:text-stone-700 group-hover:text-stone-200 dark:group-hover:text-stone-600 transition-colors duration-500">
                  {step.number}
                </span>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 flex items-center justify-center bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900">
                    <step.icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-3 text-stone-900 dark:text-stone-50">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 z-20 -translate-y-1/2">
                  <div className="w-8 h-8 flex items-center justify-center bg-stone-200 dark:bg-stone-700">
                    <ArrowRight className="h-4 w-4 text-stone-500 dark:text-stone-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
