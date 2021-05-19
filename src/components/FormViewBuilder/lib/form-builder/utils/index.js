export const time = (val = new Date(), format = 'yy-mm-dd h:m:s') => {
  let date = val
  if (!date) { date = new Date() }
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const H = date.getHours()
  const M = date.getMinutes()
  const S = date.getSeconds()
  return format.replace('yy', y)
    .replace('mm', m >= 10 ? m : `0${m}`)
    .replace('dd', d >= 10 ? d : `0${d}`)
    .replace('h', H >= 10 ? H : `0${H}`)
    .replace('m', M >= 10 ? M : `0${M}`)
    .replace('s', S >= 10 ? S : `0${S}`)
}