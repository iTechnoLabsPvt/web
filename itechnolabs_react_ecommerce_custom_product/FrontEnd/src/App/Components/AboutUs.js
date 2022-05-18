import React, { Component } from 'react';
import AboutPage from '../Images/about_page.jpg';
import Full_custom_about_img from '../Images/full-custom-about.jpg';
import review_section_img from '../Images/reviews_section.jpg';
import map_img from '../Images/map_img.jpg';
import { injectIntl } from 'react-intl';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
        <main>
         <section className="about_page">
            <div className="container">
               <div className="row">
                  <div className="col-md-12 text-center">
                     <div className="heading_about">
                        <h2>WELCOME</h2>
                        <p>We're VOX, a product manufacturing platform that learns, collaborates, and creates.</p>
                        <img src= {AboutPage} />
                     </div>
                  </div>
               </div>
               <div className="row mt-5">
                  <div className="col-md-6">
                     <div className="about_left_ctn">
                        <p>Hi! We’re VOX, a group of individuals with a passion for product manufacturing — creativity is what has driven us for over 22 years. We truly believe in the transformative power of quality goods and design and their ability to simplify communications, elevate experiences, engage and inspire people everywhere. Good design and good relationships come from collaboration. We're excited to share our product customization platform to make something meaningful together and help you start new dialogues.</p>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="about_right_box mb-3">
                        <img src={Full_custom_about_img} />
                        <div className="ctn_abt">
                           <h4><a href="">FULL CUSTOM</a></h4>
                        </div>
                     </div>
                     <div className="about_right_box">
                        <img src={review_section_img} />
                        <div className="ctn_abt">
                           <h4><a href="">REVIEWS</a></h4>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row mt-5">
                  <div className="col-md-12 text-center">
                     <div className="heading_about">
                        <h2>OUR LOCATIONS</h2>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="map_section text-center">
            <img src={map_img} />
         </section>
         <section className="client_list">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-md-12">
                     <div className="heading_about left_line">
                        <h2>PARTIAL CLIENT LIST</h2>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <ul className="list_client_list">
                        <li><a href="">Vivint Smart Home</a></li>
                        <li><a href="">gotDoTerra</a></li>
                        <li><a href="">NuSKin</a></li>
                        <li><a href="">Isagenix </a></li>
                        <li><a href="">GoDaddy </a></li>
                        <li><a href="">USANA</a></li>
                        <li><a href="">Nature’s Sunshine</a></li>
                        <li><a href="">NFL</a></li>
                     </ul>
                  </div>
                  <div className="col-md-4">
                     <ul className="list_client_list">
                        <li><a href="">Qualtrics </a></li>
                        <li><a href="">Podium</a></li>
                        <li><a href="">Adobe  </a></li>
                        <li><a href="">Vivint Solar</a></li>
                        <li><a href="">LGCY Power</a></li>
                        <li><a href="">Google </a></li>
                        <li><a href="">Domo </a></li>
                        <li><a href="">Henry Schein</a></li>
                     </ul>
                  </div>
                  <div className="col-md-4">
                     <ul className="list_client_list">
                        <li><a href="">4Life</a></li>
                        <li><a href="">1-800 Contacts </a></li>
                        <li><a href="">Advanced MD </a></li>
                        <li><a href="">Utah Jazz</a></li>
                        <li><a href="">Ancestry</a></li>
                        <li><a href="">Rock Canyon Bank</a></li>
                        <li><a href="">Crumbl Cookies</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>
         {/* <section className="cta_section">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-8 text-left">
                     <h3>Stay up to date on new product releases!!</h3>
                  </div>
                  <div className="col-md-4 text-right">
                     <p className="mb-0">
                        <a href="#" className="subscibe_btn">SUBSCRIBE</a>
                     </p>
                  </div>
               </div>
            </div>
         </section> */}
      </main>
    );
  }
}
export default (injectIntl(AboutUs));