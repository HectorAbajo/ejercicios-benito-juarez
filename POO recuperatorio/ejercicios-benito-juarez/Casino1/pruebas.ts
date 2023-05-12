function getRandomIntInclusive(min:number, max:number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(getRandomIntInclusive(0,13))