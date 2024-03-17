

// API
// ----------------------------------------------------------------------
const development = process.env.NODE_ENV =='development'
export const ADMIN = false;
export const HOST_API_KEY = process.env.REACT_APP_HOST_API_KEY || 'https://tebo.domainenroll.com/api/v1';
export const IMAGE_PATH = process.env.REACT_APP_HOST_API_KEY || 'https://tebo.domainenroll.com';
export const NODE_BASE_BASEURL = development?'http://localhost:5000':'https://jestinxavier.click'
export const MAP_API = process.env.REACT_APP_MAPBOX_API;


// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
