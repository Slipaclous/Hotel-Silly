export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[200]">
            <div className="h-full bg-or animate-progress-loading shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        </div>
    );
}
