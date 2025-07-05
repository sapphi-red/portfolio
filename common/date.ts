const pad0 = (n: number, len: number) => n.toString().padStart(len, '0')

const dateToTimeString = (date: Date): string =>
  `${pad0(date.getHours(), 2)}:${pad0(date.getMinutes(), 2)}`

export const dateToDateString = (date: Date, separator = '/'): string =>
  `${pad0(date.getFullYear(), 4)}${separator}${pad0(date.getMonth() + 1, 2)}${separator}${pad0(
    date.getDate(),
    2,
  )}`

export const dateToDateTimeString = (date: Date, separator = '/'): string =>
  `${dateToDateString(date, separator)} ${dateToTimeString(date)}`
