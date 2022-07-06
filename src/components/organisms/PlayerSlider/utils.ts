export const roundTo2d = (num: number) => {
    const m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
};

export const formatTime = (time: number) => {
    const asString = time.toString();

    const minutes = asString.split('.').at(0);
    const seconds = asString.split('.').at(1);

    return `${(minutes ?? '0').padEnd(minutes?.length ?? 1, '0')}:${(seconds ?? '0').padEnd(2, '0')}`;
};
