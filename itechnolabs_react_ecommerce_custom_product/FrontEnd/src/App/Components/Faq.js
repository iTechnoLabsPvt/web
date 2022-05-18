import React, { Component } from "react";
import { injectIntl } from "react-intl";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <section className="about_page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="heading_about">
                  <h2>Frequently asked questions</h2>
                  <p>GENERAL ORDERING INFORMATION</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 about_left_ctn">
                  <p>
                    <b>The Vox MG Customization Process:</b>
                    <br />
                    1. Once you place your order, an email confirmation is sent
                    immediately with your order number and details. <br />
                    2. Our art department reviews your project. Within 48 hours,
                    art proofs are sent for your approval. Respond with any
                    feedback or changes required.
                    <br />
                    3. After you have approved art, we start production
                    (embroidery or printing). <br />
                    4. Once production is complete, items are shipped out and
                    tracking information is emailed.
                  </p>
                  <p>
                    <b>Can I cancel or make changes to my order?</b>
                    <br />
                    You can cancel your order prior to production (post artwork
                    approval). Once items have been imprinted or embroidered
                    with your logo, we can no longer process a cancellation. If
                    you need to change your order for any reason contact us at
                    and we will be happy to assist you.
                  </p>
                  <p>
                    <b>
                      Will I see an art proof before my order goes into
                      production?
                    </b>
                    <br />
                    Yes. We will never go into production until you have
                    approved the production artwork.
                  </p>
                  <p>
                    <b>Do you charge sales tax?</b>
                    <br />
                    We collect all applicable taxes for goods and services
                    shipped into New York. If you are based in NY and are exempt
                    from NY State taxes, let us know and we will resolve it.
                  </p>
                  <p>
                    <b>ARTWORK</b>
                    <br />
                    What kind of file type should I use for my logo or artwork
                    upload? The most common file format is a PNG with a clear
                    background. The bigger the file, typically, the better the
                    resolution.
                  </p>
                  <p>
                    <b>Do you keep my art on file?</b>
                    <br />
                    Your artwork will remain in the “Artwork Files” section of
                    your profile. This helps you see all of the previous art
                    files you have used and makes reordering products simple and
                    easy.
                  </p>
                  <p>
                    <b>Can I specify a PMS color for my print?</b>
                    <br />
                    Our product design page will detect the Pantone colors in
                    your uploaded file. If your our system is not detecting the
                    correct file type, please let us know in the notes section
                    of your order and we will modify it to your specifications.
                  </p>
                  <h2 className="text-center">SHIPPING & DELIVERY</h2>
                  <p>
                    <b>How fast will I get my order?</b>
                    <br />
                    Production times are 7-10 business days after art proofs
                    have been approved. This is the number of business days it
                    takes to print your item after you’ve approved the
                    production mockup. The number of days for delivery depends
                    on the shipping method you choose during the checkout
                    process.
                  </p>
                  <h2 className="text-center">PAYMENT</h2>
                  <p>
                    <b>What type of payments do you accept?</b>
                    <br />
                    We accept all major credit cards.
                  </p>
                </div>
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
                  <a href="#" className="subscibe_btn">
                    SUBSCRIBE
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    );
  }
}
export default injectIntl(Faq);
