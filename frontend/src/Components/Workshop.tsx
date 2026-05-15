import {useState}from 'react'
import { motion, AnimatePresence } from 'motion/react';
import CardsSec from '../assets/Reusable/CardsSec.js';
import type {Machine} from '../assets/Loading/Types.js'
import { machines,WorkshopCards} from "../../public/data.json"

function Workshop() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [modal, setModal] = useState<boolean>(false)
  const [mover,setMover]=useState<number>(3)

  
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

    <CardsSec dynamicdat={WorkshopCards}/>
    
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