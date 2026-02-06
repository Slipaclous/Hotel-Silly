export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
            <div className="flex flex-col items-center">
                {/* Simple elegant loader */}
                <div className="w-16 h-16 border-4 border-[var(--color-neutre-clair)] border-t-[var(--color-or)] rounded-full animate-spin mb-4"></div>
                <div className="text-[var(--color-noir)] font-display text-xl tracking-wider animate-pulse">
                    VILLA DOLCE
                </div>
            </div>
        </div>
    );
}
