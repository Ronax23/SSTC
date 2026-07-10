  export const sidebar: {title: string,icon: string, links: {name: string, icon: string, role: string[], to: string}[]}[] =
  [ {title:"Home",
    icon:"🏠",
    links:[ 
      {name:"Home", icon:"🏠", role:["admin","manager"], to:"/dashboard"}
    ]  
  } ,
    {title:"User Management",
    icon:"👥",
    links:[
      {name:"User List",icon:"👥",role:["admin","manager"],to:"userList"}
    ]
  } ,
    {title:"Blogs",
    icon:"📝",
    links:[
      {name:"Add Blogs",icon:"📝",role:["admin","manager"],to:"createBlog"} ,
      {name:"View Blogs",icon:"📖",role:["admin","manager"],to:"viewBlogs"}
    ]
  } ,
    {title:"Invoicing",
    icon:"📊",
    links:[
      {name:"View Invoice",icon:"📊",role:["admin","manager","cashier","customer"],to:"viewInvoice"} ,
      {name:"Add Invoice",icon:"➕",role:["admin","manager","cashier"],to:"AddInvoice"}
    ]
  } ,
    {title:"Profile",
    icon:"👤",
    links:[
      {name:"Profile",icon:"👤",role:["admin","manager","cashier","customer"],to:"Profile"} ,
      {name:"Logout",icon:"🚪",role:["admin","manager","cashier","customer"],to:"Logout"}
    ]
  } ,
    {title:"Inventory",
    icon:"📦",
    links:[
      {name:"Stocks",icon:"📦",role:["admin","manager"],to:"Stocks"}
    ]
  } ,
    {title:"HR",
    icon:"👥",
    links:[
      {name:"Salary",icon:"💰",role:["admin","manager"],to:"Salary"} ,
      {name:"Attendance",icon:"📅",role:["admin","manager"],to:"Attendance"} ,
      {name:"Add Employee",icon:"➕",role:["admin"],to:"AddEmployee"} ,
      {name:"Employee List",icon:"👥",role:["admin","manager"],to:"EmployeeList"} ,
      {name:"Tax",icon:"💸",role:["admin","manager"],to:"Tax"} ,
      {name:"Investments",icon:"📈",role:["admin"],to:"Investments"} ,
      {name:"Settings",icon:"⚙️",role:["admin"],to:"Settings"}
    ]}
  ,{
    title:"Logout",
    icon:"🚪",
    links:[
      {name:"Logout",icon:"🚪",role:["admin","manager","cashier","customer"],to:"Logout"}
    ]
  }

  ]