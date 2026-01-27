import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Map, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  Lock,
  Zap,
  CheckCircle2
} from 'lucide-react';
import logo from '../assets/imove-logo-2.png';
import dashboardPreview from '../assets/dashboard-mockup.png';
import heroImage from '../assets/heroImage.png';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="iMove Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Admin Portal
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Blur */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <motion.div
              {...fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
            >
              <Zap size={16} />
              <span>Powering the future of mobility</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
            >
              iMove Admin <br /> Control Center
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl"
            >
              Monitor rides, manage users, track payments, and control operations 
              in real time. Built for operational clarity and scale at the heart of our mission.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95 group"
              >
                Sign in to Admin Portal
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all active:scale-95 border border-slate-700"
              >
                System Overview
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
            <img 
              src={heroImage} 
              alt="iMove Platform" 
              className="w-full h-auto rounded-[2rem] shadow-2xl border border-white/5 rotate-2 hover:rotate-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Visual System Preview */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative p-2 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 z-10" />
            <img 
              src={dashboardPreview} 
              alt="Admin Dashboard Preview" 
              className="w-full h-auto rounded-xl drop-shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <p className="text-white text-lg font-medium drop-shadow-md">Built for operational clarity and scale.</p>
              <div className="flex gap-4 mt-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs border border-white/20">Live Maps</span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs border border-white/20">Tables</span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs border border-white/20">Charts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-24 px-6 bg-slate-900/50 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Comprehensive tools designed to manage every aspect of the ride-hailing experience.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <Map className="text-blue-500" />, 
                title: "Live Ride Monitoring", 
                description: "Real-time tracking of riders and passengers on the map with sub-second latency." 
              },
              { 
                icon: <Users className="text-emerald-500" />, 
                title: "User Management", 
                description: "Control rider and passenger accounts, handle verification, and manage status instantly." 
              },
              { 
                icon: <CreditCard className="text-amber-500" />, 
                title: "Payment Oversight", 
                description: "Monitor MTN MoMo & Airtel Money transactions with integrated reconciliation tools." 
              },
              { 
                icon: <BarChart3 className="text-purple-500" />, 
                title: "Analytics & Reports", 
                description: "Deep-dive ride history, revenue insights, and automated report exports." 
              },
              { 
                icon: <Settings className="text-rose-500" />, 
                title: "System Configuration", 
                description: "Fine-tune fare rules, zones, and service availability at a moment's notice." 
              },
              { 
                icon: <Shield className="text-sky-500" />, 
                title: "Audit & Logs", 
                description: "Track system activities and significant events with complete transparency." 
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:bg-slate-800/60 group"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security & Trust */}
      <section id="security" className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Security & Integrity <br />by Design</h2>
              <div className="space-y-6">
                 {[
                   { title: "Role-Based Access Control", desc: "Granular permissions for different administrative levels." },
                   { title: "Encrypted Authentication", desc: "Industry-standard JWT encryption for all active sessions." },
                   { title: "Secure Data Pipelines", desc: "Encrypted communication between mobile app, web app, and DB." },
                   { title: "Comprehensive Audit Trail", desc: "Every action is logged and searchable for accountability." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
               <div className="relative bg-slate-800/50 p-12 rounded-3xl border border-white/5 backdrop-blur-xl flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6">
                    <Lock size={40} className="text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Zero-Trust Architecture</h3>
                  <p className="text-slate-400 mb-8">All operations are authenticated and authorized under our security-first protocol.</p>
                  <div className="w-full p-4 bg-slate-900 rounded-xl border border-white/5 font-mono text-xs text-blue-400">
                    &gt; ACCESS_TOKEN_HASHED: [REDACTED] <br />
                    &gt; STATUS: ENCRYPTED <br />
                    &gt; SESSION: SECURE
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto py-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-center px-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Access iMove Admin Portal</h2>
            <p className="text-blue-50 text-lg mb-10 max-w-xl mx-auto opacity-80">
              Enter our secure environment to manage operations and ensure the highest quality of service.
            </p>
            <Link 
              to="/login" 
              className="inline-block px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl active:scale-95"
            >
              Go to Login
            </Link>
            <p className="mt-6 text-sm text-blue-100/60 font-medium">Authorized personnel only</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-3">
              <img src={logo} alt="iMove Logo" className="h-8 w-auto opacity-60" />
              <span className="text-slate-500 font-medium font-mono text-sm">iMove © {new Date().getFullYear()}</span>
           </div>
           
           <div className="flex gap-8 text-xs text-slate-500 uppercase tracking-widest font-bold">
              <span className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 Production Environment
              </span>
              <span>v1.2.0-secure</span>
           </div>
           
           <div className="text-slate-500 text-sm">
             Support: <a href="mailto:support@imove.com" className="hover:text-white transition-colors">support@imove.com</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
