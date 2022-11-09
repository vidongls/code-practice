export type TChallengeLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'

interface IChallengeLevel {
    EASY: string
    MEDIUM: string
    HARD: string
    EXPERT: string
}

export const CHALLENGE_LEVEL: IChallengeLevel = {
    EASY: 'Dễ',
    MEDIUM: 'Thường',
    HARD: 'Khó',
    EXPERT: 'Chuyên gia',
}

export const CHALLENGE_LEVEL_COLOR: IChallengeLevel = {
    EASY: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-blue-100 text-blue-800',
    HARD: 'bg-red-100 text-red-800',
    EXPERT: 'bg-purple-100 text-purple-800',
}
