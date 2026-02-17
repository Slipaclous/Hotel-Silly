'use client';

import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export default function BookingWidget() {
    const t = useTranslations('booking');
    const locale = useLocale();

    // Dates par défaut : aujourd'hui et demain
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDateString = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const [arrival, setArrival] = useState(formatDateString(today));
    const [departure, setDeparture] = useState(formatDateString(tomorrow));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Formattage des dates pour Cubilis (format YYYY-M-D sans les 0 initiaux d'après leur code legacy)
        const formatForCubilis = (dateStr: string) => {
            const d = new Date(dateStr);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        };

        const url = `https://bookingengine.mylighthouse.com/10857/Rooms/Select?lang=${locale}&Arrival=${formatForCubilis(arrival)}&Departure=${formatForCubilis(departure)}`;
        window.open(url, '_blank');
    };

    return (
        <div id="booking-widget" className="w-full max-w-4xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-30 -mt-12 sm:-mt-16"
            >
                <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-2 sm:p-4 border border-white/50 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 overflow-hidden">

                    {/* Arrivée */}
                    <div className="flex-1 flex items-center space-x-3 px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 last:border-0 group transition-colors">
                        <Calendar className="w-5 h-5 text-[var(--color-or)] group-hover:scale-110 transition-transform" />
                        <div className="flex-1">
                            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-gris)] font-bold mb-0.5">{t('arrival')}</label>
                            <input
                                type="date"
                                value={arrival}
                                min={formatDateString(today)}
                                onChange={(e) => {
                                    setArrival(e.target.value);
                                    if (e.target.value >= departure) {
                                        const nextDay = new Date(e.target.value);
                                        nextDay.setDate(nextDay.getDate() + 1);
                                        setDeparture(formatDateString(nextDay));
                                    }
                                }}
                                className="block w-full bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Départ */}
                    <div className="flex-1 flex items-center space-x-3 px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 last:border-0 group transition-colors">
                        <Calendar className="w-5 h-5 text-[var(--color-or)] group-hover:scale-110 transition-transform" />
                        <div className="flex-1">
                            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-gris)] font-bold mb-0.5">{t('departure')}</label>
                            <input
                                type="date"
                                value={departure}
                                min={arrival}
                                onChange={(e) => setDeparture(e.target.value)}
                                className="block w-full bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Bouton de recherche */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSearch}
                        className="flex items-center justify-center space-x-3 bg-[#2c3840] text-white px-10 py-5 font-body text-xs uppercase tracking-widest font-bold group shadow-lg hover:shadow-xl hover:bg-[#C6ad7a] border border-[#2c3840] hover:border-[#C6ad7a] transition-all duration-500 rounded-xl"
                    >
                        <span>{t('check')}</span>
                        <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
