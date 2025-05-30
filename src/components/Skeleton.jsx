export const renderSkeleton = () => {
    return (
        <div className="mt-5">
            <div className="h-5 w-1/3 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="flex gap-4 flex-wrap">
                {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="w-[200px] h-[150px] bg-gray-200 rounded animate-pulse" />
                ))}
            </div>
        </div>
    );
};