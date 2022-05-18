import React, { Component } from "react";
import Footer_Logo from "../Images/svg/footer-logo.svg";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

class DashboardFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className="footer_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-right">
                <ul className="footer_social_icon">
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="footer_menu">
                  <h4>
                    {this.props.intl.formatMessage({ id: "product" })} <br />{" "}
                    {this.props.intl.formatMessage({ id: "categories" })}
                  </h4>
                  {this.props.categories && this.props.categories.length ? (
                    <ul className="footer_links">
                      {this.props.categories.map((ele, i) => (
                        <a
                          key={i}
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push({
                              pathname: "/products/all",
                              state: { category_name: ele.category_name },
                            });
                          }}
                        >
                          <li>{ele.category_name}</li>
                        </a>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer_menu">
                  <h4>{this.props.intl.formatMessage({ id: "top_links" })}</h4>
                  <ul className="footer_links">
                    <li>
                      <a href="#">Contact us </a>
                    </li>
                    {/* <li>
                      <a href="#">Returns </a>
                    </li>
                    <li>
                      <a href="#">Google Reviews </a>
                    </li>
                    <li>
                      <a href="#">Full-Custom Products </a>
                    </li>
                    <li>
                      <a href="#">Ambassadors </a>
                    </li> */}
                    {/* <li>
                      <a href="#">Careers </a>
                    </li> */}
                    <li>
                      <a
                        href="http://voxmarketinggroup.com/blog/"
                        target="_blank"
                      >
                        {this.props.intl.formatMessage({ id: "blog" })}
                      </a>
                    </li>
                    {/* <li>
                      <Link to="/about-us">
                        {this.props.intl.formatMessage({ id: "about_us" })}
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq">
                        {this.props.intl.formatMessage({ id: "faq" })}
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/privacy-policy">
                        {this.props.intl.formatMessage({
                          id: "privacy_policy",
                        })}
                      </Link>
                    </li>
                    <li>
                      <Link to="/term-and-conditions">
                        {this.props.intl.formatMessage({
                          id: "term_conditions",
                        })}
                      </Link>
                    </li>
                    <li>
                      <Link to="/cookie-policy">
                        {this.props.intl.formatMessage({
                          id: "cookie_policy",
                        })}
                      </Link>
                    </li>
                    <li>
                      <Link to="/copyrights-policy">
                        {this.props.intl.formatMessage({
                          id: "copyrights_policy",
                        })}
                      </Link>
                    </li>
                    <li>
                      <Link to="/shipping-returns-refunds">
                        {this.props.intl.formatMessage({
                          id: "shipping_returns_refunds",
                        })}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer_menu">
                  <h4>LOCATION</h4>
                  <ul className="footer_links">
                    <li>
                      Vox Marketing Utah
                      <br />
                      2222 S. 950 E.
                      <br />
                      Provo, UT 84606
                    </li>
                    <li>
                      <a href="tel:801-377-8695">
                        <strong>801-377-8695</strong>
                      </a>
                    </li>
                    {/* <li>
                      VOX Asia
                      <br />
                      Room 605, 6/F.
                      <br />
                      Keader Centre 129-149 On Lok Road
                      <br />
                      Yuen Long, NT Hong Kong
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-md-12 text-right">
                <a href="#">
                  <img src={Footer_Logo} className="footer_logo" />
                </a>
              </div>
              <div className="col-md-12 text-right">
                <p className="mb-0 copy-right">
                  © voxmarketinggroup.com • 2020 • All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </footer>
    );
  }
}

export default injectIntl(DashboardFooter);
