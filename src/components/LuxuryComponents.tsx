import React from 'react';

// Divider élégant avec ornement central
export const LuxuryDivider = ({ className = '' }: { className?: string }) => {
    return (
        <div className={`flex items-center justify-center my-12 ${className}`}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent max-w-xs"></div>
            <div className="mx-6 text-champagne-500 text-xl">◆</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent max-w-xs"></div>
        </div>
    );
};

// Badge premium avec effet shimmer
export const PremiumBadge = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-champagne-500/20 via-champagne-400/20 to-champagne-500/20 border border-champagne-500/30 backdrop-blur-sm relative overflow-hidden group ${className}`}>
            <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 text-sm font-medium tracking-luxury text-champagne-700 dark:text-champagne-300">
                {children}
            </span>
        </div>
    );
};

// Titre de section avec ornements
export const SectionTitle = ({
    title,
    subtitle,
    align = 'center',
    className = ''
}: {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}) => {
    const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
    const itemsClass = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';

    return (
        <div className={`flex flex-col ${itemsClass} gap-4 mb-16 ${className}`}>
            {subtitle && (
                <span className="text-champagne-600 font-heading text-sm uppercase tracking-ultra-wide font-semibold">
                    {subtitle}
                </span>
            )}
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-noir-900 dark:text-ivoire-100 ${alignClass}`}>
                {title}
            </h2>
            <LuxuryDivider className="w-full max-w-xs" />
        </div>
    );
};

// Carte avec effet glassmorphism
export const GlassCard = ({
    children,
    className = '',
    hover = true
}: {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}) => {
    return (
        <div className={`
      glass-luxury rounded-luxury-lg p-8
      ${hover ? 'hover:shadow-luxury-lg hover:scale-105 transition-all duration-500' : ''}
      ${className}
    `}>
            {children}
        </div>
    );
};

// Bouton premium avec effet de vague
export const LuxuryButton = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    href
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    href?: string;
}) => {
    const baseClasses = 'btn-luxury relative inline-flex items-center justify-center font-sans font-semibold tracking-wide rounded-full transition-all duration-500 overflow-hidden group';

    const variantClasses = {
        primary: 'bg-gradient-luxury text-white shadow-gold hover:shadow-gold-lg',
        secondary: 'bg-noir-900 text-ivoire-100 shadow-luxury hover:shadow-luxury-lg',
        outline: 'bg-transparent border-2 border-champagne-500 text-champagne-700 hover:bg-champagne-500 hover:text-white'
    };

    const sizeClasses = {
        sm: 'px-6 py-2 text-sm',
        md: 'px-8 py-4 text-base',
        lg: 'px-10 py-5 text-lg'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                <span className="relative z-10">{children}</span>
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// Pattern décoratif en arrière-plan
export const DecorativePattern = ({
    variant = 'default',
    className = ''
}: {
    variant?: 'default' | 'dots' | 'lines';
    className?: string;
}) => {
    if (variant === 'dots') {
        return (
            <div className={`absolute inset-0 opacity-5 ${className}`}>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #d4b886 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>
            </div>
        );
    }

    if (variant === 'lines') {
        return (
            <div className={`absolute inset-0 opacity-5 ${className}`}>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #d4b886 35px, #d4b886 36px)',
                }}></div>
            </div>
        );
    }

    return (
        <div className={`absolute inset-0 pattern-luxury ${className}`}></div>
    );
};

// Ornement décoratif
export const Ornament = ({
    position = 'top-left',
    size = 'md',
    className = ''
}: {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}) => {
    const positionClasses = {
        'top-left': 'top-0 left-0',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-right': 'bottom-0 right-0'
    };

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32'
    };

    return (
        <div className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <path
                    d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-champagne-500"
                />
                <circle cx="50" cy="50" r="5" fill="currentColor" className="text-champagne-500" />
            </svg>
        </div>
    );
};

// Effet de lueur animée
export const GlowEffect = ({
    color = 'champagne',
    className = ''
}: {
    color?: 'champagne' | 'noir' | 'bordeaux';
    className?: string;
}) => {
    const colorClasses = {
        champagne: 'from-champagne-500/20 via-champagne-400/10 to-transparent',
        noir: 'from-noir-900/20 via-noir-800/10 to-transparent',
        bordeaux: 'from-bordeaux-800/20 via-bordeaux-700/10 to-transparent'
    };

    return (
        <div className={`absolute inset-0 bg-gradient-radial ${colorClasses[color]} blur-3xl animate-pulse pointer-events-none ${className}`}></div>
    );
};

// Badge avec compteur (pour "Nouveau", "Populaire", etc.)
export const StatusBadge = ({
    children,
    variant = 'new',
    className = ''
}: {
    children: React.ReactNode;
    variant?: 'new' | 'popular' | 'exclusive';
    className?: string;
}) => {
    const variantClasses = {
        new: 'bg-emeraude-700 text-white',
        popular: 'bg-bordeaux-800 text-white',
        exclusive: 'bg-gradient-luxury text-white'
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};

const LuxuryComponents = {
    LuxuryDivider,
    PremiumBadge,
    SectionTitle,
    GlassCard,
    LuxuryButton,
    DecorativePattern,
    Ornament,
    GlowEffect,
    StatusBadge
};

export default LuxuryComponents;
