import type { CardSecProps } from '../Loading/Types';

function CardsSec(props: CardSecProps) {
    const sec4=props.dynamicdat;
  return (
     <section id="cardsSec" className='py-5'>
        <div className="container">
            <div className="row text-center">
                <h1 className='mb-4'>{sec4.head}</h1>
                {sec4.cards.map((item:CardSecProps['dynamicdat']['cards'][0], index:number) => (
                    <div className="col-lg-3 col-md-6 col-12 mb-4 " key={index}>
                        <div className="card d-flex p-3 h-100 hover-bound">
                            <i className={`${item.icon} iconprop`}></i>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

  )
}

export default CardsSec