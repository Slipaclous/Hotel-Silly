'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Edit2, Trash2, Save, X, User, Mail, Lock, Sparkles, ShieldCheck } from 'lucide-react';
import AdminWrapper from './AdminWrapper';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export default function UsersEditor() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

        try {
            const response = await fetch(`/api/admin/users?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Utilisateur supprimé avec succès');
                fetchUsers();
            } else {
                setMessage(`❌ ${data.error || 'Erreur lors de la suppression'}`);
            }
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Erreur:', error);
            setMessage('❌ Erreur serveur');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-100 animate-pulse" />
                    <div className="absolute inset-0 w-10 h-10 rounded-full border-t-2 border-or animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <AdminWrapper
            title="Gestion des Utilisateurs"
            description="Gérez les accès à l'administration de l'Hôtel de Silly."
            message={message}
        >
            <div className="space-y-12">
                {/* Header Actions */}
                <div className="flex justify-between items-center pb-8 border-b border-slate-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">Utilisateurs Admin</h3>
                            <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">{users.length} Comptes actifs</p>
                        </div>
                    </div>
                    {!isAdding && !editingUser && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center space-x-3 bg-or hover:bg-slate-900 text-white px-8 py-3.5 rounded-2xl transition-all duration-500 shadow-xl shadow-or/20 font-bold text-[11px] uppercase tracking-[0.2em] active:scale-95"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Nouvel Utilisateur</span>
                        </button>
                    )}
                </div>

                {/* Form Container */}
                {(isAdding || editingUser) && (
                    <div className="animate-fade-in translate-y-[-12px]">
                        <UserForm
                            user={editingUser || undefined}
                            onCancel={() => {
                                setIsAdding(false);
                                setEditingUser(null);
                            }}
                            onSuccess={() => {
                                setIsAdding(false);
                                setEditingUser(null);
                                fetchUsers();
                                setMessage(editingUser ? '✅ Utilisateur mis à jour' : '✅ Nouvel utilisateur ajouté');
                                setTimeout(() => setMessage(''), 3000);
                            }}
                        />
                    </div>
                )}

                {/* Users List */}
                {!isAdding && !editingUser && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="group relative bg-white rounded-[40px] p-8 border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900 group-hover:scale-110 group-hover:rotate-6 ring-4 ring-slate-50">
                                        <User className="w-7 h-7 text-or" />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="w-10 h-10 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-red-500 rounded-xl transition-all duration-300 flex items-center justify-center active:scale-90"
                                            disabled={users.length <= 1}
                                            title={users.length <= 1 ? "Impossible de supprimer le dernier administrateur" : ""}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 font-display mb-1 group-hover:text-or transition-colors uppercase tracking-tight">{user.name}</h3>
                                <p className="text-sm text-slate-500 font-medium mb-8">
                                    {user.email}
                                </p>

                                <div className="pt-6 border-t border-slate-50 flex justify-between items-center mt-auto">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl">
                                        Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
}

function UserForm({ user, onCancel, onSuccess }: {
    user?: AdminUser;
    onCancel: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const url = '/api/admin/users';
            const method = user ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user ? { ...formData, id: user.id } : formData),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess();
            } else {
                setError(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur serveur');
        } finally {
            setSaving(false);
        }
    };

    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-or focus:ring-4 focus:ring-or/5 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 font-medium";
    const labelClasses = "flex items-center space-x-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-2 ml-1";

    return (
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden mb-12">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 font-display">
                            {user ? 'Modifier le profil' : 'Nouvel accès administration'}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">Identifiants sécurisés</p>
                    </div>
                </div>
                <button onClick={onCancel} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-12 space-y-8">
                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white p-1 rounded-2xl">
                            <label className={labelClasses}><User className="w-3.5 h-3.5" /><span>Nom Complet</span></label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="ex: Jean Dupont"
                                className={inputClasses}
                            />
                        </div>

                        <div className="bg-white p-1 rounded-2xl">
                            <label className={labelClasses}><Mail className="w-3.5 h-3.5" /><span>Adresse Email</span></label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="ex: jean@hotel-silly.be"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-1 rounded-2xl">
                            <label className={labelClasses}><Lock className="w-3.5 h-3.5" /><span>{user ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}</span></label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!user}
                                placeholder={user ? "Laissez vide pour conserver l'actuel" : "••••••••"}
                                className={inputClasses}
                            />
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Sécurité</p>
                            <p className="text-[11px] text-slate-500 leading-relaxed italic">
                                {user
                                    ? "La modification du mot de passe est immédiate. Assurez-vous d'utiliser un mot de passe complexe."
                                    : "L'utilisateur pourra se connecter dès l'enregistrement de ce formulaire."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-10 py-5 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[11px] transition-all"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-or transition-all duration-500 disabled:opacity-50 flex items-center space-x-3 shadow-xl hover:shadow-or/40 active:scale-95"
                    >
                        {saving ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                        <span className="uppercase tracking-[0.2em] text-[11px] font-bold">{saving ? 'Enregistrement...' : user ? 'Mettre à jour le profil' : 'Créer l\'accès'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
