import type {FooterRoute} from '../Loading/Types';
export const Footer_route:FooterRoute[]=[

    {
        title:"contact us",
        links:[
            {
                Name:"Shiv Shakti Technocrates"
            },
            {
                Name:"Address: Saroorpur Industrial Area Faridabad"
            },
            {
                Name:"Email: shivshakti_fbd@yahoo.co.in"
            },
            {
                Name:"Phone: +91-9810592350"
            }
            
        ]
    },
    {
        title: "Quick Links",
        links: [
            {
                links: "/",
                Name: "Home"
            },
               {
        links: "contact",
        Name: "Contact Us"
    },
    {
        links: "privacy-policy",
        Name: "Privacy Policy"
    },
    {
        links: "terms-of-service",
        Name: "Terms of Service"
    },]
    }

    
   ,{
    title: "About Us",
    links: [
         {
                links: "team",
                Name: "Our Team"
            },
    {
        links: "*",
        Name: "Error 404"
    },
        {
        links: "services",
        Name: "Services"
    },
 
    {
                links: "workshop",
                Name: "Workshop"
            }
    ]
   },
   {
    title: "Follow Us",
    links: [
        {
            links: "https://www.facebook.com",
            Name: "Facebook"
            ,External:true
        },
        {
            links: "https://www.twitter.com",
            Name: "Twitter"
            ,External:true
        },
        {
            links: "https://www.linkedin.com",
            Name: "LinkedIn"
            ,External:true
        },
        {
            links: "https://www.instagram.com",
            Name: "Instagram"
            ,External:true
        }
    ]
   }
]