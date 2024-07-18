const generateRandomNumber: (last: number, max: number) => number = (
    last,
    max,
) => {
    const random = Math.floor(Math.random() * max);

    if (random === last) {
        return generateRandomNumber(last, max);
    }

    return random;
};

export { generateRandomNumber };
