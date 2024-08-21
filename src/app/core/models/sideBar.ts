export interface IMenuItem {
  label: string
  activeIcon: string
  inactiveIcon: string
  route: string
  isActive?: boolean
  role?: string[]
  disabled?: boolean
}
