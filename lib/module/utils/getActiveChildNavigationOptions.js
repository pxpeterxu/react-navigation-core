var getActiveChildNavigationOptions=function getActiveChildNavigationOptions(navigation,screenProps){var theme=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'light';var state=navigation.state,router=navigation.router,getChildNavigation=navigation.getChildNavigation;var activeRoute=state.routes[state.index];var activeNavigation=getChildNavigation(activeRoute.key);var options=router.getScreenOptions(activeNavigation,screenProps,theme);return options;};export default getActiveChildNavigationOptions;
//# sourceMappingURL=getActiveChildNavigationOptions.js.map