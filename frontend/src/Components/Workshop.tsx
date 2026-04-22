import {useState}from 'react'
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/Context.js'
import LoaderError from '../assets/Reusable/LoaderError.js'
import CardsSec from '../assets/Reusable/CardsSec.js';
import type {Machine} from '../assets/Loading/Types.js'
function Workshop() {


  const CardDats=  
  {
    head:"Our Workshop Principles",
    cards:[
    {
        icon:"bi bi-arrow-repeat",
        title:"Reliability",
        desc:"Consistent performance and structural integrity in every component"
    },
    {
        icon:"bi bi-bullseye",
        title:"Repeatability",
        desc:"VMC precision ensuring identical tolerances from the 1st to 1000th part"
    },
    {
        icon:"bi bi-recycle",
        title:"Resourcefulness",
        desc:"Optimizing material usage for cost-effective, high-quality engineering"
    },
    {
        icon:"bi bi-input-cursor-text", 
        title:"Planned Precision",
        desc:"Following the 5P rule: Proper Planning Prevents Poor Performance"
    }
  ]
  }
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [modal, setModal] = useState<boolean>(false)
  const [mover,setMover]=useState<number>(3)
  const {data,loading}=useData();
 const { machines} = data||[];
  // const machines=[
  //   {
  //     name:"Kafo VMC",
  //     Model:"Kafo VMC B3122",
  //     Description:"Kafo VMC B3122 is a vertical machining center that is used for machining various parts."
  //     ,Image:"/Machines/vmc.jpg"
  //   },
  //   {
  //     name:"NeWay CNC",
  //     Model:"NeWay CNC Lathe",
  //     Description:"NeWay CNC Lathe is a lathe that is used for machining various parts.",
  //     Image:"/Machines/cnc.jpg"
  //   },
  //   {
  //     name:"TOS Boring Machine",
  //     Model:"TOS WH-100",
  //     Description:"TOS Boring Machine is a boring machine that is used for boring various parts.",
  //     Image:"/Machines/b100.jpg"
  //   },
  //   {
  //     name:"TOS Boring Machine",
  //     Model:"TOS WH-80",
  //     Description:"TOS Milling Machine is a milling machine that is used for milling various parts.",
  //     Image:"/Machines/b80.jpg"
  //   },
  //   {
  //     name:"Lathe Machine",
  //     Model:"Lathe 18 Foot",
  //     Make:"Batala Punjab 2006",
  //     Description:"Lathe Machine is a lathe machine that is used for lathe various parts.",
  //     Image:"/Machines/l18.jpg"
  //   },
  //   {
  //     name:"Lathe Machine",
  //     Model:"Lathe 12 Foot",
  //     Make:"Batala Punjab 2006",
  //     Description:"Lathe Machine is a lathe machine that is used for lathe various parts.",
  //     Image:"/Machines/l12.jpg"
  //   },
  //   {
  //     name:"Lathe Machine",
  //     Model:"Lathe 9 Foot",
  //     Make:"Rajkot Gujarat 2016",
  //     Description:"Lathe Machine is a lathe machine that is used for lathe various parts.",
  //     Image:"/Machines/l9.jpg"
  //   },
  //   {
  //     name:"Lathe Machine",
  //     Model:"Lathe 10 Foot",
  //     Make:"Rajkot Gujarat 2017",
  //     Description:"Lathe Machine is a lathe machine that is used for lathe various parts.",
  //     Image:"/Machines/l10.jpg"
  //   },
  //   {
  //     name:"Lathe Machine",
  //     Model:"Lathe 6 Foot",
  //     Make:"Keloskar 1998",
  //     Description:"Lathe Machine is a lathe machine that is used for lathe various parts.",
  //     Image:"/Machines/l6.jpg"
  //   },
  //   {
  //     name:"M1TR",
  //     Model:"M1TR",
  //     Make:"M1TR",
  //     Description:"M1TR is a M1TR machine that is used for M1TR various parts.",
  //     Image:"/Machines/m1tr.jpg"

  //   },
  //   {
  //     name:"Surface Grinder",
  //     Model:"Guru Surface Grinder",
  //     Make:"Faridabad 2015",
  //     Description:"M1TR is a M1TR machine that is used for M1TR various parts.",
  //     Image:"/Machines/l6.jpg"

  //   }
  // ]
  const selectedMachineHandler = (index:Machine) => {
    setSelectedMachine(index)
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
    setSelectedMachine(null)
  }

  const Movehandle = (step: number) => {
    setMover((prev) => {
      if ((prev + step) < 3) return 3;
      if ((prev + step) > machines.length) return machines.length;
      return (prev + step);
    });
  }
if (loading || !data) {
    return <LoaderError/>
  }

  return (
    <>
      <header className="hero-container">
      {/* 1. The Video Background */}
      <video 
        src="/Headers/VMC.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="back-video"
      />

      {/* 2. The Dark Overlay (Makes text easier to read) */}
      <div className="overlay"></div>

      {/* 3. The Content on top */}
      <div className="content">
        <h1 className="display-1 fw-bold text-white">Precision Engineering</h1>
        <p className="lead text-white">Quality services for your workshop needs.</p>
        <button className="btn btn-primary btn-lg">Explore Services</button>
      </div>
    </header>

    <CardsSec dynamicdat={CardDats}/>
    
      <section id="sec6">
        <div className="container">
          <motion.div 
      layout 
      className="row" 
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
            <h2 className='text-center my-3'>Our Machines</h2>
            <AnimatePresence>
            {machines && machines.slice(0,mover).map((machine:Machine, index:number) => (
              <motion.div initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }} className="col-lg-4 col-md-6 my-5" key={index} onClick={()=>selectedMachineHandler(machine)}>
                <div className="card card-wrapper">
                  <div className="card-img">
                    <img src={machine.Image} alt={machine.name} />
                  </div>
                  <div className="card-body">
                    <h3>{machine.Model}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
            <div className="d-flex text-center justify-content-center gap-3 my-4 w-100">
              <button className='btn' disabled={mover <= 3} onClick={()=>Movehandle(-3)}><i className="bi bi-arrow-up-circle-fill"></i></button>
            <button className='btn' disabled={mover >= machines.length} onClick={()=>Movehandle(3)}><i className="bi bi-arrow-down-circle-fill"></i></button>
            </div>
          </motion.div>
        </div>
      </section>
    <AnimatePresence>
    {modal && selectedMachine && (
      <motion.div className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
         onClick={closeModal}>
      <motion.div className="modal-dialog"
      initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
      
      onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Machine Details</h5>
            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-7">
                <img src={selectedMachine.Image} alt={selectedMachine.name} />
              </div>
              <div className="col-lg-5">
                <h5>{selectedMachine?.name}</h5>
                <p>{selectedMachine?.Model? selectedMachine?.Model:selectedMachine?.Make }</p>
                <p>{selectedMachine?.Make}</p>
                <p>{selectedMachine?.Description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>)}
    </AnimatePresence>
    </>
  )
}

export default Workshop