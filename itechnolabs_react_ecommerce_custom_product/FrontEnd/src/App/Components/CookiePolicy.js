import React, { Component } from "react";
import { injectIntl } from "react-intl";

class CookiePolicy extends Component {
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
                  <h2>COOKIE POLICY – VOX CATALOG</h2>
                  <p>www.voxcatalog.com</p>
                  <p>Effective date: November 15, 2020</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 about_left_ctn">
                  <p>
                    This Cookie Policy explains how Vox Marketing Group, LLC
                    (“Vox Catalog”, “we”, “us” or “our”) uses cookies and
                    similar technologies in connection with
                    the www.voxcatalog.com website.
                  </p>
                  <p>
                    <b>What are cookies?</b>
                    <br />
                    Cookies can be delicious. Cookies are small text files
                    placed on your computer by websites and sometimes by emails.
                    They provide useful information to organizations, which
                    helps to make your visits to their websites more effective
                    and efficient. We use cookies to ensure that we are able to
                    understand how you use our websites and to ensure that we
                    can make improvements to the websites.
                    <br />
                    Cookies do not contain any personal or confidential
                    information about you.
                  </p>

                  <p>
                    <b>How we use cookies</b>
                    <br />
                    We use cookies to ensure that you get the best from our
                    website. The first time that you visit our website you will
                    be asked to consent to our use of cookies and we suggest
                    that you agree to allow the cookies to be active on your
                    device whilst you visit and browse our website to ensure
                    that you experience our website fully.
                    <br />
                    The types of cookies that we use:
                    <br />
                    We use three types of cookies on our websites:
                    <ul style={{ marginLeft: "20px" }}>
                      <li>
                        <span>&#9679; </span> Session cookies that are deleted
                        after each visit
                      </li>
                      <li>
                        <span>&#9679; </span> Persistent/tracking cookies that
                        remain in place across multiple visit to our websites
                      </li>
                      <li>
                        <span>&#9679; </span> Third party cookies that are used
                        by other parties, for example Google Analytics
                      </li>
                    </ul>
                    Session cookies and persistent cookies are necessary in
                    order for you to use our website. These cookies can be
                    deleted via your browser, but this will restrict the
                    functions that you are able to carry out on our websites.
                    <br />
                    Session cookies expire when you leave the website and are
                    not stored on your computer and do not contain any personal
                    data. Persistent cookies last beyond your visit to our
                    website.
                    <br />
                    We may use Google Analytics on our website. This is a
                    tracking cookie which enables us to track how popular our
                    site is and to record visitor trends over time. The cookie
                    does not contain any personal data but it does use your
                    computer’s IP address to determine where in the world you
                    are accessing the website from, and to track your page visit
                    within the site.
                  </p>
                  <p>
                    <b>Optional cookies</b>
                    <br />
                    These cookies are usually supplied by business partners and
                    help us to filter out information which is not relevant to
                    you.
                  </p>
                  <p>
                    <b>Cookies and Demographics</b>
                    <br />
                    We may use data from Google's interest-based advertising or
                    3rd-party audience data (such as age, gender, and interests)
                    with Google Analytics.
                  </p>
                  <p>
                    <b>Managing Cookies</b>
                    <br />
                    You can control and/or delete cookies as you wish – for
                    details, see aboutcookies.org. You can delete all cookies
                    that are already on your computer and you can set most
                    browsers to prevent them from being placed. If you do this,
                    however, you may have to manually adjust some preferences
                    every time you visit our website or use our Platform and
                    some services and functionalities we offer may not work.
                    <br />
                    To restrict or handle cookies, please see the ‘Help’ section
                    of your internet browser.
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
export default injectIntl(CookiePolicy);
