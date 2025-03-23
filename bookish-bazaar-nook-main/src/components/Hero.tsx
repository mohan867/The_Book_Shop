
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full mb-6">
            DISCOVER LITERARY TREASURES
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Find Your Next <br /> Literary Adventure
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Curated collections of literary classics, contemporary bestsellers, and hidden gems waiting to be discovered.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="btn-hover-effect">
              Browse Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              New Releases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
