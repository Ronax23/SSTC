import type { NavType } from '../Loading/Types'
export const Nav_Route:NavType[]=[
    {
        links: "/",
        Name: "Home"
    },
    {
        links: "services",
        Name: "Services"
    },  
    {
        links: "blogs",
        Name: "Blogs"
    },
    {
        links: "",
        Name: "About Us",
        Dropdown:[
            {
                links: "team",
                Name: "Our Team"
            },
            {
                links: "workshop",
                Name: "Workshop"
            }
        ]
    },
     {
        links: "",
        Name: "More",
        Dropdown:[
            {
                links: "Login",
                Name: "Login"
            },
            {
                links: "SignUp",
                Name: "SignUp"
            }
        ]
    },
    {
        links: "contact",
        Name: "Contact Us"
    }
]