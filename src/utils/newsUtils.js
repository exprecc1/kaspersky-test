export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
export const formatReach = (reach) => {
    if (reach >= 1000000)
        return `${(reach / 1000000).toFixed(1)}M`;
    if (reach >= 1000)
        return `${(reach / 1000).toFixed(1)}K`;
    return reach.toString();
};
export const getTopTraffic = (traffic) => {
    if (!traffic?.length)
        return '';
    const sorted = [...traffic].sort((a, b) => b.count - a.count);
    return `Top Traffic: ${sorted
        .slice(0, 3)
        .map((item) => `${item.value} ${Math.round(item.count * 100)}%`)
        .join(', ')}`;
};
export const loadNewsData = async () => {
    const response = await fetch('/news-data.json');
    return await response.json();
};
