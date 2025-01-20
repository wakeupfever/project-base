import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const customCollectionsAlias = ['dt', 'menu', 'screen']

export const customCollectionsBase = {
  dt: FileSystemIconLoader('./src/assets/icon-svg'),
  menu: FileSystemIconLoader('./src/assets/icon-svg/menu', svg =>
    svg.replace(/^<svg /, '<svg fill="currentColor" ')
  ),
  screen: FileSystemIconLoader('./src/assets/icon-svg/screen', svg =>
    svg.replace(/^<svg /, '<svg fill="currentColor" ')
  )
}
