const ADMINS=['superadmin',"admin"]
const MANAGEMENT = [...ADMINS, "manager"];
const ACCOUNTS=[...MANAGEMENT,'accounts']
const SHOP_FLOOR = [...MANAGEMENT, "engineer", "worker", "helper"];
const FRONT_OFFICE = [...ACCOUNTS, "cashier"];
const EVERYONE = [...SHOP_FLOOR,'cashier','accounts', "sales-man", "backoffice", "security", "cleaner", "customer"]; 

const Permissions={
  "POST /users/add": ADMINS,
  "GET /users/list": MANAGEMENT,
  "GET /users/get/:id": MANAGEMENT,
  "PUT /users/edit/:id": ADMINS,
  "DELETE /users/delete/:id": ADMINS,

  // --- INVENTORY ROUTES (/inventory) ---
  "POST /inventory/add": MANAGEMENT,
  "GET /inventory/list": SHOP_FLOOR,
  "GET /inventory/get/:id": SHOP_FLOOR,
  "PUT /inventory/edit/:id": MANAGEMENT,
  "DELETE /inventory/delete/:id": MANAGEMENT,

  // --- INVOICE ROUTES (/invoice) ---
  "POST /invoice/add": FRONT_OFFICE,
  "GET /invoice/list": FRONT_OFFICE,
  "GET /invoice/get/:id": FRONT_OFFICE,
  "PUT /invoice/edit/:id": ACCOUNTS,
  "DELETE /invoice/delete/:id": ADMINS,

  // --- BLOG ROUTES (/blogs) ---
  "post /blogs/createblog": MANAGEMENT,
  "put /blogs/edit/:id": MANAGEMENT,
  "delete /blogs/:id": ADMINS,

  // --- DASHBOARD ROUTE ---
  "get /dashboard": MANAGEMENT,

}


export const rbac = (req, res, next) => {
  const userRole = req.user?.role?.toLowerCase();

  if (!userRole) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Missing authentication credentials or token role"
    });
  }

  const routeKey = `${req.method} ${req.baseUrl}${req.path}`.toLowerCase();
  const allowedRoles = Permissions[routeKey.toLowerCase()];

  if (!allowedRoles) {
    return res.status(403).json({
      success: false,
      message: `Forbidden: No RBAC rule configured for ${routeKey}`
    });
  }
  const hasAccess = userRole === 'superadmin' || allowedRoles.includes(userRole);

  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      message: `Forbidden: Role '${userRole}' lacks permission to access ${routeKey}`
    });
  }

  next();
};