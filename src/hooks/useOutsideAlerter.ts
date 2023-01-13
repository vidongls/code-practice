import React, { useRef, useEffect, useState } from 'react'

function useOutsideAlerter(ref: any) {
    const [isOutSide, setIsOutside] = useState(true)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOutside(true)
            } else {
                setIsOutside(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])

    return [isOutSide, setIsOutside]
}

export default useOutsideAlerter
