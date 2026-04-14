import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, LayoutDashboard, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">AI Utsav</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/chat" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat
          </Link>
          <Link to="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/auth" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="rounded-xl font-bold">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link to="/chat">
            <Button size="sm" className="rounded-xl px-6 font-bold shadow-lg shadow-primary/10">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
