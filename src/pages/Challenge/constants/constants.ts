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
    EASY: 'green',
    MEDIUM: 'blue',
    HARD: 'magenta',
    EXPERT: 'purple',
}
