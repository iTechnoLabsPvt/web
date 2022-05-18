import React, { Component } from "react";
import { injectIntl } from "react-intl";

class CopyrightsPolicy extends Component {
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
                  <h2>COPYRIGHTS POLICY – VOX CATALOG</h2>
                  <p>www.voxcatalog.com</p>
                  <p>Effective date: November 15, 2020</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 about_left_ctn">
                  <p>
                    <b>Copyright & Trademarks</b>
                    The Vox Marketing Group, LLC website located at
                    www.voxcatalog.com (“Vox Catalog”, “we”, “us” and “our”)
                    contains materials including, but not limited to, text,
                    images, designs, photographs, videos, audio clips, graphics,
                    button icons, pictures, advertising copy, URLs, technology,
                    software, and the overall arrangement or “look and feel” of
                    such materials including copyrightable material, as well as
                    trademarks, logos, and service marks that belong to either
                    Vox Catalog, its licensors, licensees or other third parties
                    (collectively the “Content”). The Website and the Content
                    are owned, licensed, or controlled by Vox Catalog, its
                    licensors, and certain other third parties, and all right,
                    title, interest in and to the Content and the Website are
                    the property of Vox Catalog, its licensors, or certain other
                    third parties and are protected by United States and
                    international copyright, trademark, trade dress, patent or
                    other intellectual property rights and laws to the fullest
                    extent possible. By using the Website, you will not obtain
                    any ownership or intellectual property or other interest in
                    any item or content on the Website. Subject to your
                    agreement and compliance with this Agreement, Vox Catalog
                    grants you a limited, non-exclusive, non-transferrable,
                    non-assignable, revocable license to access, display, view,
                    and use the Content on the Website for your own personal,
                    non-commercial use only. You agree that Vox Catalog may
                    immediately and, without notice to you, suspend or terminate
                    the availability of the Website, its Content, or the
                    Products without any liability to you or any third party.
                  </p>
                  <p>
                    <b>Internet regulations.</b>
                    <br />
                    Without the explicit written permission of the Vox Catalog
                    it is prohibited to integrate in whole, or in part, any of
                    the protected contents published on these websites into
                    other programs or other web sites or to use them by any
                    other means. This website can contain elements that are
                    protected by copyright and by other laws that are subject to
                    the copyright or other rights of third parties and that are
                    correspondingly protected for these third parties.
                  </p>

                  <p>
                    <b>Liability</b>
                    <br />
                    Vox Catalog has carefully compiled the contents of this
                    website in accordance with their current state of knowledge.
                    Access to and use of this website, as well as web sites
                    related or connected to this by links, are at the user's own
                    risk and responsibility. Damage and warranty claims arising
                    from missing or incorrect data are excluded. Vox Catalog
                    bears no responsibility or liability for damage of any kind,
                    also for indirect or consequential damages resulting from
                    access to or use of this website or websites related or
                    connected to this by links.
                  </p>
                  <p>
                    <b>Links to other websites</b>
                    <br />
                    Vox Catalog website can contain links (cross references) to
                    websites that are run by third parties. Vox Catalog takes no
                    responsibility for the content of these other websites.
                  </p>
                  <p>
                    <b>Disclaimer</b>
                    <br />
                    <b>
                      YOU MAY NOT MODIFY, COPY, REPRODUCE, REPUBLISH, UPLOAD,
                      POST, TRANSMIT, OR DISTRIBUTE, IN ANY MANNER, THE MATERIAL
                      ON OUR WEBSITE, INCLUDING TEXT, GRAPHICS, CODE AND/OR
                      SOFTWARE.
                    </b>
                    You must retain all copyright and other proprietary notices
                    contained in the original material on any copy you make of
                    the material. You may not sell or modify the material or
                    reproduce, display, publicly perform, distribute, or
                    otherwise use the material in any way for any public or
                    commercial purpose. If you violate any of the terms or
                    conditions, your permission to use the material
                    automatically terminates and you must immediately destroy
                    any copies you have made of the material.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      </main>
    );
  }
}
export default injectIntl(CopyrightsPolicy);
