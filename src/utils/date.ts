export const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth()}` : date.getMonth()
    const day = date.getDate() <= 9 ? `0${date.getDate() + 1}` : date.getDate() + 1
    return `${year}.${month}.${day}`
}