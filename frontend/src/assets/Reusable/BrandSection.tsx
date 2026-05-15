import { useEffect, useState } from "react";
import {comp_logo} from "../../../public/data.json"

export default function () {
const [logos, setLogos] = useState(comp_logo);
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