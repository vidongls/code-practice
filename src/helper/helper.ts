import moment from 'moment'

export const classNames = (currentClass = '', restClass = {}) => {
    if (!restClass) return currentClass

    let newClass = ''

    Object.entries(restClass).map(([key, val]) => (newClass += val ? key : ''))

    return currentClass + ' ' + newClass
}

export const formatDate = (date: string) => {
    const newDate = new Date(date)

    const padL = (nr: any) => `${nr}`.padStart(2, '0')

    const dFormat = `${padL(newDate.getDate())}/${padL(newDate.getMonth() + 1)}/${newDate.getFullYear()} ${padL(
        newDate.getHours()
    )}:${padL(newDate.getMinutes())}:${padL(newDate.getSeconds())}`

    return dFormat
}

export const truncateString = (str: string, num: number) => {
    if (str.length > num) {
        return str.slice(0, num) + '...'
    } else {
        return str
    }
}

export const runCode = (code: string) => {
    const result = eval(`try { ${code}  } catch(err) { console.log(err); }`)

    return result + ''
}

type TDifferentDate = 'minutes' | 'hours' | 'days' | 'weeks' | 'seconds' | 'milliseconds'

export const differentDate = (dateEnd: string, dateStart: string, format: TDifferentDate) => {
    const end = moment(dateEnd) //now
    const start = moment(dateStart)

    return end.diff(start, format)
}

export const isManager = (role: string) => {
    const userEnum = ['ADMIN', 'SUPER_ADMIN']

    return userEnum.includes(role)
}

// Thêm profile
//
