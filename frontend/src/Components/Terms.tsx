import HeaderReusable from '../assets/Reusable/HeaderReusable'
import type { TermsProps } from '../assets/Loading/Types';
import data from '../../public/data.json'


function Terms({ term }:TermsProps) {
const {privacyPolicy,termsAndConditions}=data;
const terms=term?termsAndConditions:privacyPolicy;
const term_img=`/Headers/${term?"t&c.jpg":"privacy.jpg"}`;
  return (
    <>
    <HeaderReusable title={term?"Terms and Conditions":"Privacy Policy"} image={term_img}/>
      <div id="termsofterm">
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <h2 className='mb-5 h1 text-center'>{term?"Terms and Conditions":"Privacy Policy"} <i className="bi bi-bluesky"></i></h2>
              {terms.map((term) => (
                <div key={term.id} className="mb-4">
                  <h2 className='term-col'>{term.title} <i className="bi bi-bluesky"></i></h2>
                  <p>{term.description}</p>
                  {term?.bullets && (
                    <ul>
                      {term.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Terms