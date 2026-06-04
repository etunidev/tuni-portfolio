export const TABS = ['About', 'Skills', 'Experience', 'Education', 'Projects', 'Courses'] as const
export type Tab = typeof TABS[number]
