import React from 'react'
import Countdown from 'react-countdown'
import { classNames } from '../../helper/helper'
// import { BsFillClockFill } from 'react-icons/bs';

interface Renderer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any): React.ReactNode
}

interface ICountDownProps {
    startTime?: number
    duration?: number
    isHidden?: boolean
    className?: string
    onComplete?: () => void
}

const CountDown: React.FC<ICountDownProps> = ({
    startTime = 0,
    duration = 1,
    isHidden = false,
    className,
    onComplete,
}) => {
    const formatCountdown = (hours: number, minutes: number, seconds: number): string => {
        const formatHours = hours >= 10 ? hours + '' : '0' + hours
        const formatMinutes = minutes >= 10 ? minutes + '' : '0' + minutes
        const formatSeconds = seconds >= 10 ? seconds + '' : '0' + seconds
        return formatHours + ':' + formatMinutes + ':' + formatSeconds
    }

    const rendererCountdown: Renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <p className={'font-semibold text-red-500 underline'}></p>
        } else {
            return (
                <span
                    className={classNames('flex items-center font-semibold', {
                        [className ? className : '']: className,
                    })}
                >
                    {formatCountdown(hours, minutes, seconds)}
                    {/* <BsFillClockFill className="ml-1" /> */}
                </span>
            )
        }
    }

    // Thêm time cho realtime challenge
    // Hiển thị countdown và xử lý khi hết tgian
    // Thống kê challenge cho realtime challenge thời gian làm, time resolve, test case resolve
    //  + Xem chi tiết -> modal

    return isHidden ? null : (
        <Countdown
            date={startTime + duration}
            renderer={rendererCountdown}
            key={startTime}
            onComplete={onComplete}
        />
    )
}

export default CountDown
