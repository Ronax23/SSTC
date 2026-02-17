import { useEffect, useState } from "react";
import type{comp_logo} from '../Loading/Types';


export default function () {

  const comp_logo:comp_logo[] = [
    {
      imgsrc: "./Logos/andritz-logo-icon.png",
      alt: "Andritz Logo"
    },
    {
      imgsrc: "./Logos/avl.png",
      alt: "AVL Logo"
    },
    {
      imgsrc: "./Logos/BlissAnand.png",
      alt: "Bliss Anand Logo"
    },
    {
      imgsrc: "./Logos/dantal.svg",
      alt: "Dantal Logo"
    },
    {
      imgsrc: "./Logos/Flovel.jpg",
      alt: "Flovel Logo"
    },
    {
      imgsrc: "./Logos/isgec.png",
      alt: "Isgec Logo"
    },
    {
      imgsrc: "./Logos/HPP.png",
      alt: "Hpp Logo"
    },
    {
      imgsrc: "./Logos/pentaflo.png",
      alt: "Pentaflo Logo"
    },
    {
      imgsrc: "./Logos/maruti.svg",
      alt: "Maruti Logo"
    },
    {
      imgsrc: "./Logos/Samco.png",
      alt: "Samco Logo"
    },
    {
      imgsrc: "./Logos/voith.svg",
      alt: "Voith Logo"
    },
    {
      imgsrc: "./Logos/Sietz.png",
      alt: "Sietz Logo"
    },
  ];

const [logos, setLogos] = useState<comp_logo[]>(comp_logo);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsMoving(true); // Start animation

      setTimeout(() => {
        setLogos((prev) => {
          const [head, ...tail] = prev;
          return [...tail, head];
        });
        setIsMoving(false); // Reset position instantly
      }, 400); // Must match CSS transition time
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="brand-section p-50">
      <div className="container">
        <h2 className="text-center mb-5">Our Clients</h2>
        <div className="slider-window" onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          {/* We add 'moving' class to trigger the CSS transform */}
          <div className={`slider-track ${isMoving ? "moving" : ""}`}>
            {logos.slice(0, 6).map((item) => (
              <div className="logo-card" key={item.alt}>
                <img src={item.imgsrc} alt={item.alt} className="img-fluid" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}