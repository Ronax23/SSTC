const ADMINS=['superAdmin',"admin"]
const MANAGEMENT = [...ADMINS, "manager"];
const ACCOUNTS=[...MANAGEMENT,'accounts']
const SHOP_FLOOR = [...MANAGEMENT, "engineer", "worker", "helper"];
const FRONT_OFFICE = [...ACCOUNTS, "cashier"];
const EVERYONE = [...SHOP_FLOOR,'cashier','accounts', "sales-man", "backoffice", "security", "cleaner", "customer"]; 

 
 export const sidebar: {title: string,icon: string, links: {name: string, icon: string, role: string[], to: string}[]}[] =
  [ {title:"Home",
    icon:"🏠",
    links:[ 
      {name:"Home", icon:"🏠", role:MANAGEMENT, to:"/dashboard"}
    ]  
  } ,
    {title:"User Management",
    icon:"👥",
    links:[
      {name:"User List",icon:"👥",role:MANAGEMENT,to:"userList"}
    ]
  } ,
    {title:"Blogs",
    icon:"📝",
    links:[
      {name:"Add Blogs",icon:"📝",role:MANAGEMENT,to:"createBlog"} ,
      {name:"View Blogs",icon:"📖",role:MANAGEMENT,to:"viewBlogs"}
    ]
  } ,
    {title:"Invoicing",
    icon:"📊",
    links:[
      {name:"View Invoice",icon:"📊",role:EVERYONE,to:"viewInvoice"} ,
      {name:"Add Invoice",icon:"➕",role:FRONT_OFFICE,to:"AddInvoice"}
    ]
  } ,
    {title:"Profile",
    icon:"👤",
    links:[
      {name:"Profile",icon:"👤",role:EVERYONE,to:"Profile"} ,
      {name:"Logout",icon:"🚪",role:EVERYONE,to:"Logout"}
    ]
  } ,
    {title:"Inventory",
    icon:"📦",
    links:[
      {name:"Stocks",icon:"📦",role:MANAGEMENT,to:"Stocks"}
    ]
  } ,
    {title:"HR",
    icon:"👥",
    links:[
      {name:"Salary",icon:"💰",role:MANAGEMENT,to:"Salary"} ,
      {name:"Attendance",icon:"📅",role:SHOP_FLOOR,to:"Attendance"} ,
      {name:"Add Employee",icon:"➕",role:MANAGEMENT,to:"AddEmployee"} ,
      {name:"Employee List",icon:"👥",role:MANAGEMENT,to:"EmployeeList"} ,
      {name:"Tax",icon:"💸",role:MANAGEMENT,to:"Tax"} ,
      {name:"Investments",icon:"📈",role:ADMINS,to:"Investments"} ,
      {name:"Settings",icon:"⚙️",role:ADMINS,to:"Settings"}
    ]}
  ,{
    title:"Logout",
    icon:"🚪",
    links:[
      {name:"Logout",icon:"🚪",role:EVERYONE,to:"Logout"}
    ]
  }

  ]