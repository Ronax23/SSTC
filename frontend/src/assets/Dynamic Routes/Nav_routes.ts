import type { NavType } from '../Loading/Types'
export const Nav_Route:NavType[]=[
    {
        links: "/",
        Name: "Home"
    },
    {
        links: "about",
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
        links: "services",
        Name: "Services"
    },
    {
        links: "contact",
        Name: "Contact Us"
    }
]