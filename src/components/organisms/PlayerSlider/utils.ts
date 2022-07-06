export const formatTime = (time_ms: number) => {
    const formatted = new Date(time_ms).toISOString().slice(14, 19);
    return formatted.replace(/^0/, '');
};
