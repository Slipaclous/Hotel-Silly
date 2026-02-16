'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Lock, Mail, Loader2, ChevronRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Identifiants invalides');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('admin', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blanc flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-or/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-noir/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Card */}
        <div className="bg-white border border-noir/5 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-or/5 border border-or/10 mb-6 group transition-all duration-500 hover:scale-110">
                <Lock className="w-8 h-8 text-or group-hover:scale-90 transition-transform duration-500" />
              </div>
              <h1 className="text-4xl font-display text-noir mb-2 tracking-tight">
                Espace <span className="text-or">Admin</span>
              </h1>
              <p className="text-noir/30 font-body text-[10px] font-bold uppercase tracking-[0.2em]">
                Hôtel de Silly
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-body font-bold text-noir/40 uppercase tracking-wider ml-1">
                  Email Professionnel
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-noir/10 group-focus-within:text-or transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-noir/[0.02] border border-noir/10 text-noir pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-or/10 focus:border-or/40 outline-none transition-all duration-300 placeholder:text-noir/20"
                    placeholder="admin@hotel-silly.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-body font-bold text-noir/40 uppercase tracking-wider ml-1">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-noir/10 group-focus-within:text-or transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-noir/[0.02] border border-noir/10 text-noir pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-or/10 focus:border-or/40 outline-none transition-all duration-300 placeholder:text-noir/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden bg-or text-white font-body font-bold py-4 rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(198,173,122,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="relative flex items-center justify-center space-x-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Connexion au Dashboard</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-noir/20 text-[10px] font-body tracking-widest uppercase font-bold">
                &copy; 2025 Hôtel de Silly &bull; Administration Privée
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


