const addPad = (orig) => {
    return orig.toString().padStart(2, 0)
}

const humanize = (date) => {
    const dt = new Date(date)
    return `${addPad(dt.getDate())}.${addPad(dt.getMonth()+1)}.${dt.getFullYear()} ${addPad(dt.getHours())}:${addPad(dt.getMinutes())}`
}

export default { humanize }