import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { getProducts, addProducts } from "../../../actions/products";
import { Spin, Button } from "antd";
import { Link } from "react-router-dom";

// const navLinks = [
//   { url: '/about-us', name: 'About Us' },
//   { url: '/projects', name: 'Projects' },
//   { url: '/services', name: 'Services' },
//   { url: '/contact-us', name: 'Contact Us' },
// ];

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading1: false,
      products: [],
      offset: 0,
      count: 0,
      Asc:0,
      Desc:0,
      lowP:0,
      highP:0,
      type:"menu",
      style:"menu",
      menuStatus:"open",
      navLinks:[
        { url: 'default', name: 'Newest',active:'active' },
        { url: 'Asc', name: 'A-Z',active:'' },
        { url: 'Desc', name: 'Z-A',active:'' },
        { url: 'highP', name: 'Highest price',active:'' },
        { url: 'lowP', name: 'Lowest price',active:'' },

      ]

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    switch(this.state.menuStatus)
    {
      case "open":
        this.setState({
          menuStatus:"close",
          style:"menu active"
        });
        break;
      case "close":
        this.setState({
          menuStatus:"open",
          style:"menu"
        });
        break;
    }        
  }
  
  fillter = (type) => {
 var asc =0;
 var desc=0;
 var lowp =0;
 var highp =0;
    if(type=='Asc'){

      asc=1;
      var stateCopy = Object.assign({}, this.state.navLinks);
stateCopy[1].active ='active';
stateCopy[0].active ='';
stateCopy[2].active ='';
stateCopy[3].active ='';
stateCopy[4].active ='';
this.setState(stateCopy);

    }else if(type=='Desc'){
      desc=1;
      var stateCopy = Object.assign({}, this.state.navLinks);
      stateCopy[1].active ='';
stateCopy[0].active ='';
stateCopy[2].active ='active';
stateCopy[3].active ='';
stateCopy[4].active ='';
      this.setState(stateCopy);
    }else if(type=="highP"){
      lowp=1;
      var stateCopy = Object.assign({}, this.state.navLinks);
      stateCopy[1].active ='';
stateCopy[0].active ='';
stateCopy[2].active ='';
stateCopy[3].active ='active';
stateCopy[4].active ='';
      this.setState(stateCopy);
    }else if(type=="lowP"){
      highp = 1;
      var stateCopy = Object.assign({}, this.state.navLinks);
      stateCopy[1].active ='';
stateCopy[0].active ='';
stateCopy[2].active ='';
stateCopy[3].active ='';
stateCopy[4].active ='active';
      this.setState(stateCopy);
    }else{
      var stateCopy = Object.assign({}, this.state.navLinks);
      stateCopy[1].active ='';
stateCopy[0].active ='active';
stateCopy[2].active ='';
stateCopy[3].active ='';
stateCopy[4].active ='';
      this.setState(stateCopy);
    }

    this.setState({ loading: true });
    this.props.getProducts(
      {
        token: this.props.user.loginToken,
        type: 2,
        category:
          this.props.location.state && this.props.location.state.category_name
            ? this.props.location.state.category_name
            : "",
        sub_category:
          this.props.location.state && this.props.location.state.sub_category
            ? this.props.location.state.sub_category
            : "",
        offset: 0,
        Asc:asc,
        Desc:desc,
        lowP:lowp,
        highP:highp,
      },
      (res) => {
        if (res.status) {
          this.setState({
            products: res.data.data,
            loading: false,
            offset: this.state.offset + res.data.limit,
            count: res.data.count,

          });
          //add in redux
          this.props.addProducts(res.data.data);
        }
      }
    );

    
  }

  componentDidMount() {
    console.log('didmount');
    this.setState({ loading: true });
    this.props.getProducts(
      {
        token: this.props.user.loginToken,
        type: 2,
        category:
          this.props.location.state && this.props.location.state.category_name
            ? this.props.location.state.category_name
            : "",
        sub_category:
          this.props.location.state && this.props.location.state.sub_category
            ? this.props.location.state.sub_category
            : "",
        offset: this.state.offset,
        Asc:this.state.Asc,
        Desc:this.state.Desc,
        lowP:this.state.lowP,
        highP:this.state.highP,
      },
      (res) => {
        if (res.status) {
          this.setState({
            products: res.data.data,
            loading: false,
            offset: this.state.offset,
            count: res.data.count,
          });
          //add in redux
          this.props.addProducts(res.data.data);
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
 
    

       var isFormload = localStorage.getItem('load');

       console.log(isFormload);
       console.log(this.state.offset);

    
   
    if (
      (this.props.location.state && this.props.location.state.category_name) !==
        (prevProps.location.state && prevProps.location.state.category_name) ||
      (this.props.location.state && this.props.location.state.sub_category) !==
        (prevProps.location.state && prevProps.location.state.sub_category) && (isFormload !== 'true')
    ) {
      console.log(prevState.type);
      this.props.getProducts(
        {
          token: this.props.user.loginToken,
          type: 2,
          category:
            this.props.location.state && this.props.location.state.category_name
              ? this.props.location.state.category_name
              : "",
          sub_category:
            this.props.location.state && this.props.location.state.sub_category
              ? this.props.location.state.sub_category
              : "",
          offset: 0,
        },
        (res) => {
          if (res.status) {
            this.setState({
              products: res.data.data,
              loading: false,
              offset:0,
              count: res.data.count,
              
            });
            //add in redux
            this.props.addProducts(res.data.data);

           
          }
        }
      );
    }

    localStorage.setItem('load','false');

    

  }

  loadMore = () => {
    this.setState({ loading1: true });
    localStorage.setItem('load','true');
    this.props.getProducts(
      {
        token: this.props.user.loginToken,
        type: 2,
        category:
          this.props.location.state && this.props.location.state.category_name
            ? this.props.location.state.category_name
            : "",
        sub_category:
          this.props.location.state && this.props.location.state.sub_category
            ? this.props.location.state.sub_category
            : "",
        offset: 20 + this.state.offset,
      },
      (res) => {
        if (res.status) {
          this.setState({
            products: res.data.data.length
              ? [...this.state.products, ...res.data.data]
              : this.state.products,
            offset: this.state.offset + res.data.limit,
            count: res.data.count,
            loading1: false,
          }); 

          

          

          //add in redux
          this.props.addProducts(
            res.data.data.length
              ? [...this.state.products, ...res.data.data]
              : this.state.products
          );
        }
      }
    );
  };

  render() {
    return (
      <div>
        
        {this.state.loading ? (
          <Spin />
        ) : (
          <section className="category-section-outer pro-for-btn">
            <div>
        <button className="menu-fixedbtn" onClick={this.handleClick}><i class="fa fa-tasks" aria-hidden="true"></i>
</button>
        <div className={this.state.style}>               
          <ul>
            {this.state.navLinks.map(({ url, name, active}) => (
              <li>
                <a  onClick={() => this.fillter(url)} className={active}>{name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
            <div className="container">
              {this.state.products.length ? (
                <div>
                  <div className="row">
                    {this.state.products.length &&
                      this.state.products.map((ele1, i) => (
                        <div key={i} className="col-md-4 col-sm-12">
                          <div className="product-outer">
                            <Link to={`/product-detail/${ele1.id}`}>
                              <div className="product-outer-upper">
                                <img
                                  src={ele1.front_model_image_url}
                                  alt="product"
                                />
                              </div>
                              <div className="product-outer-bottom">
                                <div
                                  className="product-name"
                                  dangerouslySetInnerHTML={{
                                    __html: ele1.product_title.replace(
                                      ele1.style,
                                      ""
                                    ),
                                  }}
                                ></div>
                                <div className="product-price-outer">
                                  <div className="product-price-outerleft">
                                    Starting at: ${ele1.piece_price}
                                  </div>
                                  <div className="product-price-outerright">
                                    Min Qty: {ele1.moq}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                  {this.state.count > this.state.products.length && (
                    <div className="col-md-3">
                      <Button
                        className="login-btn"
                        disabled={this.state.loading1}
                        loading={this.state.loading1}
                        type="primary"
                        size="large"
                        htmlType="submit"
                        onClick={() => this.loadMore()}
                      >
                        {this.props.intl.formatMessage({ id: "load_more" })}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                "No Products"
              )}
            </div>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  getProducts: bindActionCreators(getProducts, dispatch),
  addProducts: bindActionCreators(addProducts, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Products));

// products.length ?
// <div>
// <div className="row">
// {products.map((ele, i) => {
//   return <div className= "col-md-3">
//     <Link to={`/product-detail/${ele.UNIQUE_KEY}`}>
//     <Card
//       style={{ width: 300 }}
//       cover={
//         <img
//           alt="example"
//           src={ele.FRONT_MODEL}
//         />
//       }
//     >
//       <Meta
//       avatar={<Avatar src={ele.FRONT_MODEL} />}
//       title={ele.PRODUCT_TITLE}
//     description={<span title={ele.PRODUCT_DESCRIPTION}>{ele.PRODUCT_DESCRIPTION.length > 100 ? ele.PRODUCT_DESCRIPTION.slice(0,100) + '...' : ele.PRODUCT_DESCRIPTION }</span>}
//     />
//     </Card>
//     </Link>
//     </div>
// })}
// <br />
// </div>
// <div className= "col-md-3">
// <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" size="large" htmlType="submit" onClick={()=> this.loadMore()}>{this.props.intl.formatMessage({id: 'load_more'})}</Button>
// </div>
// </div>
