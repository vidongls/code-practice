import { notification, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IDetail } from '../..'
import ChallengeApi from '../../../../Api/Challenge/ChallengeApi'

interface IDescriptionProps {
    loading: boolean
    detail: IDetail
}

const Description: React.FC<IDescriptionProps> = ({ loading, detail }) => {
    return (
        <Spin spinning={loading}>
            <h2 className="mb-5 text-2xl font-medium">{detail.title}</h2>

            {/* <span className="my-2 inline-block text-lg font-semibold">Đề bài</span> */}
            <div dangerouslySetInnerHTML={{ __html: detail.describe }}></div>

            {/* <div>
                Loạt bài này tập trung vào việc học và thực hành JavaScript. Mỗi thử thách đi kèm với một bài viết hướng
                dẫn và bạn có thể xem các bài viết này bằng cách nhấp vào tab Chủ đề ở trên cùng hoặc biểu tượng bài
                viết trong menu bên phải. Khách quan Trong thử thách này, chúng tôi xem xét một số khái niệm cơ bản sẽ
                giúp bạn bắt đầu với loạt bài này. Hãy xem hướng dẫn để tìm hiểu thêm về cấu trúc từ vựng của
                JavaScript. Nhiệm vụ Một chức năng chào được cung cấp cho bạn trong trình chỉnh sửa bên dưới. Nó có một
                tham số,. Thực hiện các nhiệm vụ sau để hoàn thành thử thách này: Sử dụng console.log()để in Hello,
                World!trên một dòng mới trong bảng điều khiển, còn được gọi là stdout hoặc đầu ra tiêu chuẩn . Mã cho
                phần này của nhiệm vụ đã được cung cấp trong trình chỉnh sửa. Sử dụng console.log()để in nội dung
                của(tức là, đối số được truyền cho main ). Bạn đã có cái này! Loạt bài này tập trung vào việc học và
                thực hành JavaScript. Mỗi thử thách đi kèm với một bài viết hướng dẫn và bạn có thể xem các bài viết này
                bằng cách nhấp vào tab Chủ đề ở trên cùng hoặc biểu tượng bài viết trong menu bên phải. Khách quan Trong
                thử thách này, chúng tôi xem xét một số khái niệm cơ bản sẽ giúp bạn bắt đầu với loạt bài này. Hãy xem
                hướng dẫn để tìm hiểu thêm về cấu trúc từ vựng của JavaScript. Nhiệm vụ Một chức năng chào được cung cấp
                cho bạn trong trình chỉnh sửa bên dưới. Nó có một tham số,. Thực hiện các nhiệm vụ sau để hoàn thành thử
                thách này: Sử dụng console.log()để in Hello, World!trên một dòng mới trong bảng điều khiển, còn được gọi
                là stdout hoặc đầu ra tiêu chuẩn . Mã cho phần này của nhiệm vụ đã được cung cấp trong trình chỉnh sửa.
                Sử dụng console.log()để in nội dung của(tức là, đối số được truyền cho main ). Bạn đã có cái này!
            </div>

            <span className="my-2 inline-block text-lg font-semibold">Định dạng đầu vào</span>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dicta vitae dolores ipsam voluptas
                perferendis voluptates nesciunt eaque delectus! Error, praesentium. Excepturi necessitatibus velit sint
                possimus asperiores saepe, voluptate impedit!
            </div>

            <span className="my-2 inline-block text-lg font-semibold">Định dạng đầu ra</span>
            <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui dicta vitae dolores ipsam voluptas
                perferendis voluptates nesciunt eaque delectus! Error, praesentium. Excepturi necessitatibus velit sint
                possimus asperiores saepe, voluptate impedit!
            </div>
            <span className="my-2 block text-lg font-semibold">Ví dụ đầu vào </span>
            <div>cacacacacac</div>
            <span className="my-2 block text-lg font-semibold">Ví dụ đầu ra</span>
            <div>cacacacacac</div>
            <span className="my-2 block text-lg font-semibold">Giải thích</span>
            <div className="whitespace-normal">
                concacconcacconcacconcacconcacconcacconcacconcacconcacconcacconcacc
                oncacconcacconcacconcacconcacconcacconcacconcacconcacconcac
            </div> */}
        </Spin>
    )
}

export default Description
