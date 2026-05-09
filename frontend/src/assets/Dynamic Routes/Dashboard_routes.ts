  export const sidebar: {name: string, icon: string, role: string[],to:string}[] =
  [ {name:"Home",icon:"🏠",role:["admin","manager"],to:"dashboardhome"} ,
    {name:"User List",icon:"👥",role:["admin","manager"],to:"userList"} ,
    {name:"Add Blogs",icon:"📝",role:["admin","manager"],to:"createBlog"} ,
    {name:"View Blogs",icon:"📖",role:["admin","manager"],to:"viewBlogs"} ,
    {name:"View Invoice",icon:"📊",role:["all"],to:"viewInvoice"} ,
    {name:"Add Invoice",icon:"➕",role:["admin","manager","cashier"],to:"AddInvoice"} ,
    {name:"Profile",icon:"👤",role:["all"],to:"Profile"} ,
    {name:"Logout",icon:"🚪",role:["all"],to:"Logout"} ,
    {name:"Stocks",icon:"📦",role:["admin","manager"],to:"Stocks"} ,
    {name:"Salary",icon:"💰",role:["admin","manager"],to:"Salary"} ,
    {name:"Attendance",icon:"📅",role:["admin","manager"],to:"Attendance"} ,
    {name:"Add Employee",icon:"➕",role:["admin"],to:"AddEmployee"} ,
    {name:"Employee List",icon:"👥",role:["admin","manager"],to:"EmployeeList"} ,
    {name:"Tax",icon:"💸",role:["admin","manager"],to:"Tax"} ,
    {name:"Investments",icon:"📈",role:["admin"],to:"Investments"} ,
    {name:"Settings",icon:"⚙️",role:["admin"],to:"Settings"}
  ]