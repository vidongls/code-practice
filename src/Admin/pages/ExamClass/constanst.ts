export type TDOING = 'NEW' | 'PROCESSING' | 'SUCCESS'
export type TBADGE_DOING = 'default' | 'processing' | 'success'

export const DOING_TYPE = {
    NEW: {
        status: 'default' as TBADGE_DOING,
        label: 'Chưa bắt đầu',
    },
    PROCESSING: {
        status: 'processing' as TBADGE_DOING,
        label: 'Đang làm bài',
    },
    SUCCESS: {
        status: 'success' as TBADGE_DOING,
        label: 'Hoàn thành',
    },
}
