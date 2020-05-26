export default function getChildrenNavigationCache(navigation) {
  if (!navigation) {
    return {};
  }

  let childrenNavigationCache =
    navigation._childrenNavigation || (navigation._childrenNavigation = {});
  const { routes, preloadRoutes } = navigation.state;
  let childKeys = [...routes, ...(preloadRoutes || [])].map(route => route.key);
  Object.keys(childrenNavigationCache).forEach(cacheKey => {
    if (!childKeys.includes(cacheKey) && !navigation.state.isTransitioning) {
      delete childrenNavigationCache[cacheKey];
    }
  });

  return navigation._childrenNavigation;
}
