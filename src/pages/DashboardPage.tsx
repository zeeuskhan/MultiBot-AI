import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { DAILY_TOKEN_LIMIT } from '../constants/models';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';
import { Zap, Shield, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { tokensUsedToday } = useChatStore();
  const percentage = Math.min((tokensUsedToday / DAILY_TOKEN_LIMIT) * 100, 100);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-display font-bold mb-2">Usage Dashboard</h1>
        <p className="text-muted-foreground">Monitor your free AI usage and limits.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Token Usage Card */}
        <Card className="md:col-span-2 glass-card overflow-hidden border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-display">Daily Token Usage</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Free Plan
              </Badge>
            </div>
            <CardDescription>Your daily limit resets every 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-4 text-sm">
              <span className="font-medium">{tokensUsedToday.toLocaleString()} tokens used</span>
              <span className="text-muted-foreground">{DAILY_TOKEN_LIMIT.toLocaleString()} total limit</span>
            </div>
            <Progress value={percentage} className="h-3 bg-secondary" />
            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Resets at 12:00 AM IST
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="flex flex-col gap-4">
          <StatCard 
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            label="Rate Limit"
            value="10 req/min"
          />
          <StatCard 
            icon={<Shield className="w-5 h-5 text-green-500" />}
            label="Account Status"
            value="Verified Free"
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            label="Total Saved"
            value="₹4,500+"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Why is it free?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI Utsav is built for the Indian community to explore the latest AI models without financial barriers. 
              We manage API costs through fair usage limits and optimized backend routing. 
              Our mission is to make high-end AI accessible to every Indian student, developer, and creator.
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Fair Usage Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>100,000 tokens per day per user.</li>
              <li>10 requests per minute to prevent abuse.</li>
              <li>Personal use only (no commercial API reselling).</li>
              <li>Multiple accounts per person are discouraged.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <Card className="glass-card p-4 flex items-center gap-4">
      <div className="p-2 bg-secondary rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </Card>
  );
}
