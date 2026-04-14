import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Globe, MessageSquare, CheckCircle2, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SEO 
        title="AI Utsav | The Ultimate Multi-AI Chat Aggregator"
        description="Access ChatGPT-5, Claude 3.5, and Gemini 2.5 in one unified, free interface. Built for the Indian AI community with Hindi support."
      />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-4 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-pulse">
              <Star className="w-3 h-3 fill-primary" />
              <span>India's Largest AI Festival is Live</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-6 tracking-tight leading-[1.1]">
              The Best Multi-AI <br />
              <span className="text-gradient saffron-gradient bg-clip-text">Chatbot Aggregator.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Access the world's most powerful AI models—ChatGPT-5, Claude 3.5, and Gemini 2.5—in a single, high-performance interface. The ultimate free AI chat platform built for the Indian community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/chat">
                <Button size="lg" className="text-lg px-10 h-16 rounded-2xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">
                  Start Chatting Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/40/40`} 
                      className="w-8 h-8 rounded-full border-2 border-background" 
                      alt="User"
                    />
                  ))}
                </div>
                <span>Joined by 10k+ Indian Creators</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </header>

      {/* Trust Section */}
      <section className="py-12 border-y border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Powered by the World's Leading AI Engines
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-bold text-foreground">OpenAI</span>
            <span className="text-2xl font-bold text-foreground">Anthropic</span>
            <span className="text-2xl font-bold text-foreground">Google Cloud</span>
            <span className="text-2xl font-bold text-foreground">DeepSeek</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need in one Mela.</h2>
            <p className="text-muted-foreground text-lg">Stop switching tabs. Start comparing intelligence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="w-10 h-10 text-primary" />}
              title="Side-by-Side Comparison"
              description="Ask one prompt and see responses from multiple models simultaneously. Find the best answer instantly."
            />
            <FeatureCard 
              icon={<Zap className="w-10 h-10 text-primary" />}
              title="Super Mela Mode"
              description="Our proprietary engine auto-selects the most capable model for your specific task, ensuring peak accuracy."
            />
            <FeatureCard 
              icon={<Globe className="w-10 h-10 text-primary" />}
              title="Hindi First Optimization"
              description="Native support for Hindi and Hinglish. Perfectly tuned for the nuances of Indian languages."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-primary" />}
              title="Privacy Focused"
              description="Your data is yours. We don't train our models on your personal conversations. Secure and encrypted."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-10 h-10 text-primary" />}
              title="Unified Context"
              description="Switch between models without losing the thread. Your chat history is preserved across all AI engines."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-10 h-10 text-primary" />}
              title="100% Free Forever"
              description="No credit cards. No hidden fees. Access premium AI intelligence without the premium price tag."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to join the festival?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of students, developers, and creators who are already using AI Utsav to supercharge their productivity.
            </p>
            <Link to="/chat">
              <Button size="lg" className="text-lg px-12 h-16 rounded-2xl font-bold">
                Get Your Free Access
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-20 px-4 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-2xl font-display font-bold tracking-tight">AI Utsav</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The ultimate multi-AI aggregator for the Indian community. Access the world's best intelligence in one unified interface.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/chat" className="hover:text-primary transition-colors">Chat Interface</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Usage Dashboard</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Pricing (Free)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Utsav. Made with ❤️ in India.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="p-10 glass-card group"
    >
      <div className="mb-6 p-3 rounded-2xl bg-primary/5 w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
