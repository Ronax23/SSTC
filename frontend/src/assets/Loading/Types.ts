type HeaderReusableDynamic = {
  image: string;
  title: string;
}
 interface comp_logo {
  imgsrc: string;
  alt: string;
}
interface footerLink {
    Name: string,
    links?: string,
    External?: Boolean
}
interface FooterRoute {
    title:string,
    links:footerLink[]
}
interface NavType {
    links:string,
    Name:string,
    Dropdown?:NavType[];
}
interface CardSecProps {
  dynamicdat: {
    head: string;
    cards: Array<{
      icon: string;
      title: string;
      desc: string;
    }>;
  };
}
interface slides {
     imgsrc: string;
      title: string;
      caption: string;
}

interface ServiceDetail {
  img: string;
  p: string;
}
type ServiceType = "Hydro_Engineering" | "Component_Jobwork" | "Precision_Die_Moulding" | "Industrial_Press_Components";

type counterMap=
        {
            count:number,
            title:string
        }


interface PolicySection {
  id: number;
  title: string;
  description: string;
  bullets?: string[]; // Optional because your 'Contact Us' doesn't have bullets
}

interface TermsProps {
  term: boolean; // true for Terms, false for Privacy
}

interface Machine {
  name: string;
  Model: string;
  Description: string;
  Image: string;
  Make?: string; // Optional field
}
interface dynamics
{
  content:string,
  p:string,
  imgsrc:string
}
export type {
    HeaderReusableDynamic,
    comp_logo,
    FooterRoute,
    NavType,
    CardSecProps
    ,slides,
    ServiceType,
    ServiceDetail,
    PolicySection,
    TermsProps,
    Machine,
    counterMap,
    dynamics
}