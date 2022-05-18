import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import ArtWork1 from "../../Images/svg/artwork_1.svg";
import ArtWork2 from "../../Images/svg/artwork_2.svg";
import ArtWork3 from "../../Images/svg/artwork_3.svg";
import ArtWork4 from "../../Images/svg/artwork_4.svg";
import ArtWork5 from "../../Images/svg/artwork_5.svg";
import ArtWork6 from "../../Images/svg/artwork_6.svg";
import ArtWork7 from "../../Images/svg/artwork_7.svg";
import ArtWork8 from "../../Images/svg/artwork_8.svg";

class ArtWorkFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
        <main>
        <section class="dashboard_page">
             <div class="container">
             <div class="row">
                     <div class="col-md-12 mt-5 mb-5">
                             
                             <div class="dashboard_cnt ml-0">
                                 <h2>Artwork</h2>
                                
                             </div>
                             
                         </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork1} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork2} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork3} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork4} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork5} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork6} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork7} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 mb-5">
                     <div class="artwork_logo_box text-center">
                         <div class="logo_box">
                             <img src={ArtWork8} />
                         </div>
                         <div class="artwork_download">
                             <p>company_logo_black_2020.png</p>
                             <a href="">Download</a>
                         </div>
                     </div>
                 </div>
                 </div>
            </div>
           
           </section>
          
       </main>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ArtWorkFiles));