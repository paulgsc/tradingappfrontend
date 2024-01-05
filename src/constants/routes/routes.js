export const historyPaths = [
  "/history",
  "/history/transactions",
  "/history/orders",
  "/history/transfers",
  "/history/dividends",
  "/history/payments",
  "/history/events",
  "/history/holds",
  "/history/updates",
];

export const adminPaths = [
  "/admin",
  "/admin/site/models",
  "admin/listings/:redirect?",
  "/admin/site/models/properties",
  "/admin/site/models/propertyimages",
  "/admin/site/models/propertyimages/uploads",
  "/admin/site/models/propertyimages/published",
  "/admin/site/models/trade/settings/listings-mode",
  "/admin/site/models/trade",
  "admin/timeline",
  "admin/timeline/task/:id",
  "admin/timeline/task/:id/taskline/:lineId",
  "/admin/site/models/properties/:id/record/form-view",
  "/admin/site/models/propertyimages/:id/record/form-view",
  "/admin/site/models/trade/:id/record/form-view",
];

export const homePaths = ["/", "/faq", "/contact"];

export const settingsPaths = [
  "/personal/settings",
  "personal/settings/notifications",
];

export const setupPaths = [
  "/setup/guide/:redirect?",
  "/admin/setup/guide/:redirect?",
];

export const modelsPaths = [
  "/models/:model?",
  "/models/:model/list-view/:params?",
  "/models/:model/uploads/:params?",
  "/models/:model/uploads/scheduled-actions/:params?",
  "/models/:model/uploads/gsheets/cron/:cronId?",
  "/models/:model/uploads/gsheets/:params?",
  "/models/:model/form-view/:params?",
  "/models/:model/user/form-view/:params?",
];
export const adminDashboardPaths = ["/admin/dashboard/:params?"];

export const userDashboardPaths = [
  "/personal/dashboard/:params?",
  "/coinbase/callback",
];

export const userHistoryPaths = ["/personal/myhistory/:model/:params?"];

export const adminPropertyImagesPaths = [
  "/models/:model/images/uploads/:recordId?/:propertyId?",
  "/models/:model/images/uploads/published/:recordId?/:propertyId?",
  "/models/:model/images/uploads/stage/:recordId?/:propertyId?",
];

export const myProfilePaths = [
  "/personal/myprofile",
  "/personal/myprofile/general/:?params",
];

export const siteSettingsPaths = [
  "/admin/site-settings/overview",
  "/admin/site-settings/login",
  "/admin/site-settings/security/authentication",
  "/admin/site-settings/security/notifications",
  "/admin/site-settings/overview/info",
];
