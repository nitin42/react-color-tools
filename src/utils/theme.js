import { DARK_COLOR, LIGHT_COLOR } from './constants'

export const getThemeVariants = theme => ({
  bg: theme === 'dark' ? DARK_COLOR : LIGHT_COLOR,
  iconColor: theme === 'dark' ? LIGHT_COLOR : DARK_COLOR
})
