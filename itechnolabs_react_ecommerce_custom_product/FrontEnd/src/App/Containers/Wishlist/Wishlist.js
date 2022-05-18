import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { getWishlistService, removeFromWishlistService } from '../../../actions/wishlist';
import _ from 'underscore';
import { Modal } from 'antd';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      wishlist: [],
      visibleRemoveWishlist: false,
      currenId: ''
    }
  }

  componentDidMount(){
    this.props.getWishlistService({token: this.props.user.loginToken }, (res)=>{
      if(res.status){
        this.setState({wishlist: res.data})
      }
    });
 }

 deleteWhishlist = (id) => {
  this.setState({
    visibleRemoveWishlist: true,
    currenId: id
  });
 }

 handleOkRemoveWishlist = e => {
  this.props.removeFromWishlistService({_id: this.state.currenId, token : this.props.user.loginToken }, (res)=>{
    if(res.status){
      let wishlist = this.state.wishlist;
      let index = _.findIndex(this.state.wishlist, {_id: this.state.currenId});
      wishlist.splice(index, 1);
      this.setState({
        visibleRemoveWishlist: false,
        wishlist: wishlist
      });
    }
  });
};

handleCancelRemoveWishlist = e => {
    this.setState({
      visibleRemoveWishlist: false
    });
};

  render() {
    return (
      <div>
        <Modal
          className="remove-cart-modal"
          title = {this.props.intl.formatMessage({id: 'remove_wishlist'})}
          visible={this.state.visibleRemoveWishlist}
          onOk={this.handleOkRemoveWishlist}
          onCancel={this.handleCancelRemoveWishlist}
          >
          {this.props.intl.formatMessage({id: 'sure_want_delete_wishlist'})}
        </Modal>
         <section className="category-section-outer">
           <div className="container">
             <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="category-title">{this.props.intl.formatMessage({id: 'my_fav'})}</div>
                          <hr className="category-border"/>
                        </div>
                    </div>
                      {this.state.wishlist && this.state.wishlist.length ?
                      <div className="row">
                        {this.state.wishlist.map((ele, i) => (
                          <div className="col-md-4 col-sm-12">
                          <div className="product-outer cart-price-outer">
                            <div className="product-outer-upper">
                              <img src={ele.product_data.front_model_image_url} alt="product" />
                              <a href="#" className="delete-product" onClick={(e) => {
                                e.preventDefault();
                                this.deleteWhishlist(ele.id);
                              }}><i class="fa fa-trash" aria-hidden="true"></i></a>
                            </div>
                            <div className="product-outer-bottom">
                              <div className="product-name">{ele.product_data.product_title}</div>
                              <div className="product-price-outer">
                                  <div className="product-price-outerleft">
                                    From $9.20 to $28.50
                                  </div>
                                  <div className="product-price-outerright">
                                    Min Qyt: N/A
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        ))}
                      </div>
                      :
                      <FormattedMessage id= 'your_wishlist_empty'></FormattedMessage>}
                   <div className="row">
                      <div className="col-md-12 col-md-12">
                         <Link className="Conatinue-shopping-btn" to="/">{this.props.intl.formatMessage({id: 'continue_shopping'})}</Link>
                      </div>
                   </div>
                </div>
             </div>

           </div>
         </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  getWishlistService: bindActionCreators(getWishlistService, dispatch),
  removeFromWishlistService: bindActionCreators(removeFromWishlistService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Wishlist));