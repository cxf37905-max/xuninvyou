'use client';

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose VirtualTryOn</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Low Input Barrier</h3>
            <p className="text-muted-foreground">
              No need for professional photos. Any casual photo works. No standard pose required.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Quick Results</h3>
            <p className="text-muted-foreground">
              Get your try-on preview in 10-20 seconds. Fast and convenient for busy shoppers.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Save Money</h3>
            <p className="text-muted-foreground">
              Avoid expensive returns. Try before you buy and make confident purchasing decisions.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Multiple Categories</h3>
            <p className="text-muted-foreground">
              Supports tops, bottoms, and dresses. Mix and match to find your perfect style.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Reusable Sessions</h3>
            <p className="text-muted-foreground">
              Upload your photo once, try multiple clothes in one session. Efficient and time-saving.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">For Shopping Reference</h3>
            <p className="text-muted-foreground">
              Designed for purchase decisions. Not exact fit guarantee, but valuable preview.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
