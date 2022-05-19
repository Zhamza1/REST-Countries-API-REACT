export const breakpoints = {
    mobil:432,
    mobile:531,
    table:689,
    tablet:750,

}

export const MediaQueries = (key) => {
    return (style) => `@media (max-width: ${breakpoints[key]}px) {${style}}`
}