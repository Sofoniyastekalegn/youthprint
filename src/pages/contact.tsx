import Link from 'next/link'
import React from 'react'
import { apiClient } from '../util/axios';


export interface contact{
  data : contactattributes;
}



export interface contactattributes{
  locationlink : string;
  locationdetails : string;
  telnum : string;
  email: string;
  fax: string;
  
}

export default function Contact({data} :contact) {
  return (
    <div className='body-container'>

      <div className='row'>
        <div className="col-lg-3 order-2 order-sm-2 order-md-2 order-lg-1 order-xl-1">
          <div className="mt-5 stick-container">

          </div>

        </div>

        <div className="col-lg-6 order-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 " id="content_col_2">
          <article className="m-4 mt-5">
            <h3 className="mb-4">Contact us</h3>
            <h5 className="mb-4"> The Youth Print Head office is in Ethiopia Addis Ababa</h5>
            <div className="container" style={{ maxWidth: "1140px", margin: "0 auto" }}>
              <div className="u-row">
                <div id="u_column_1" className="u-col u-col-33p33 u_column" style={{
                  display: 'flex',
                  borderTop: '1px solid #000000',
                  borderLeft: '1px solid #000000',
                  borderRight: '1px solid #000000',
                  borderBottom: '1px solid #000000',
                  borderRadius: '10px',
                }}
                >
                  <div style={{ width: '100%', padding: '0px' }}>
                    <div id="u_content_text_2" className="u_content_text"
                      style={{ overflowWrap: 'break-word', padding: '10px' }}>
                      <div style={{ fontSize: '14px', lineHeight: '140%', textAlign: 'left', wordWrap: 'break-word' }}>
                        <h4>Addis Abeba</h4>
                      </div>
                      <div>
                        <div>
                          <p style={{ lineHeight: '140%' }}>

                            <Link href='https://maps.app.goo.gl/LwRCFh7hPjGLWU379'> XQ5P+W5, Addis Ababa</Link>
                            <br />
                            


                          </p>
                          <p style={{ lineHeight: '140%' }}>
                          {data?.locationdetails}
                            
                          </p>
                        </div>
                        <p style={{ lineHeight: '140%' }}>
                          Tel: {data?.telnum}
                          <br />
                          Email : {data?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                <div
                  id="u_column_3"
                  className="u-col u-col-66p67 u_column"
                  style={{
                    display: 'flex',
                    borderTop: '0px solid transparent',
                    borderLeft: '0px solid transparent',
                    borderRight: '0px solid transparent',
                    borderBottom: '0px solid transparent',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ width: '100%', padding: '0px' }}>
                    <div id="u_content_html_1" className="u_content_html"
                      style={{ overflowWrap: 'break-word', padding: '10px;' }}>

                      <div dangerouslySetInnerHTML={{ __html: data?.locationlink }}>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6771406883768!2d38.77682817501846!3d9.00182619105847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85936109263f%3A0x78fb74bc4687be4c!2sTHE%20PLACE%20LUXURY%20LIVING!5e0!3m2!1sen!2set!4v1723193752871!5m2!1sen!2set" 
                        width="600" height="450" style={{ border: '0' }} 
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"></iframe> */}

                        
                      </div>


                    </div>
                  </div>

                </div>

              </div>
            </div>
          </article>
        </div>


      </div>
    </div>
  )
}





export async function getStaticProps() {
  try {
    const response = await apiClient.get("/api/contact-p?populate=*");
    const data = response?.data?.data.attributes;  
    return {
      props: {
          data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
          aboutp: [],
      },
    };
  }
}