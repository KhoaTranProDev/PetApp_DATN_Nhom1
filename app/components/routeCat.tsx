import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export const GetRouteCat = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('PayScreen')) {
    return 'none';
  } else if (routeName?.includes('DetailProduct')) {
    return 'none';
  } else if (routeName?.includes('AddDress')) {
    return 'none';
  } else if (routeName?.includes('DetailAddress')) {
    return 'none';
  } else if (routeName?.includes('AddAddress')) {
    return 'none';
  }
  return 'flex';
};  
