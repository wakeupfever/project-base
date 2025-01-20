// TODO:定义路由显示数据 此数据可走服务端，以便实现自定义菜单全选控制
const routeShowMenu = [
  {
    id: '/pollutant-management',
    meta: {},
    children: []
  },
  {
    id: '/environmental-quality',
    meta: {},
    children: []
  },
  {
    id: '/settings',
    meta: {},
    children: []
  },
  {
    id: '/disposal-center',
    meta: {},
    children: []
  }
]

console.log(routeShowMenu, 'routeShowMenu')

// TODO:index 确定层级的顺序 后续审查是否需要
// 路由菜单排序
const updateRouteMenuSort = (routeData, index) => {
  const d = routeData.sort((a, b) => {
    const aOrder = a.meta.index.split('-')
    const bOrder = b.meta.index.split('-')
    const aVal = aOrder[index] ?? aOrder[aOrder.length - 1]
    const bVal = bOrder[index] ?? bOrder[bOrder.length - 1]
    const d = aVal - bVal
    return d
  })
  return d
}

// 一级路由菜单转换tree路由菜单
export const createHierarchicalRoutes = routeData => {
  const hierarchicalRoutes = []
  const routeMap = {}

  routeData.forEach(route => {
    const { path, meta, name } = route
    const segments = path.split('/').filter(segment => segment)
    let currentLevel = hierarchicalRoutes

    segments.forEach((segment, index) => {
      const level = index
      const lastMeta = {
        ...meta,
        index: meta?.index ?? '0'
      }
      const menuName = meta?.name?.split?.('-')[index] ?? name
      if (!currentLevel.some(item => item?.meta?.segment === segment)) {
        const routePath = index === 0 ? `/${segment}` : path
        const newLevelItem = {
          path: routePath,
          meta: {
            ...lastMeta,
            level,
            segment
          },
          name: menuName,
          children: []
        }

        currentLevel.push(newLevelItem)
        currentLevel = updateRouteMenuSort(currentLevel, index)
        routeMap[`/${segments.slice(0, index + 1).join('/')}`] = newLevelItem
      }
      currentLevel = routeMap[`/${segments.slice(0, index + 1).join('/')}`].children
      currentLevel = updateRouteMenuSort(currentLevel, index)
    })
  })

  return hierarchicalRoutes
}
