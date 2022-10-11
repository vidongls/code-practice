import React from 'react'

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = props => {
    return (
        <div className="lg:px-96 text-center">
            <p>ều khiển, các bài tập vòng lặp, bài tập mảng (mảng 1 chiều, mảng 2 chiều, bài tập chuỗi), ...</p>
        </div>
    )
}

export default Footer
