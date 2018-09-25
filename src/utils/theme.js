import { DARK_COLOR, LIGHT_COLOR } from './constants'

const getThemeVariants = theme => ({
  bg: theme === 'dark' ? DARK_COLOR : LIGHT_COLOR,
  iconColor: theme === 'dark' ? LIGHT_COLOR : DARK_COLOR
})

export default getThemeVariants
