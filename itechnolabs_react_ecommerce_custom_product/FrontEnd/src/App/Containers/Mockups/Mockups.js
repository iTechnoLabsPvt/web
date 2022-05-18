import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { getMockupsService, removeMockupService } from '../../../actions/wishlist';
import _ from 'underscore';
import { Modal, Checkbox } from 'antd';
import ShareDesignModal from '../../Components/ShareDesignModal';

class Mockups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mockups: [],
      visibleRemoveMockup: false,
      currenId: '',
      showShareDesignModal: false,
      mockup_ids: []
    }
  }

  componentDidMount(){
    this.props.getMockupsService({token: this.props.user.loginToken }, (res)=>{
      if(res.status){
        this.setState({mockups: res.data})
      }
    });
 }

 deleteMockup = (id) => {
  this.setState({
    visibleRemoveMockup: true,
    currenId: id
  });
 }

 editMockup = (id, product_id) => {
    this.props.history.push({pathname: `/product-detail/edit/${product_id}`, state: {product_id: product_id, id: id, flag: 'mockup'}})
 }

 handleOkRemoveMockup = e => {
  this.props.removeMockupService({_id: this.state.currenId, token : this.props.user.loginToken }, (res)=>{
    if(res.status){
      let mockups = this.state.mockups;
      let index = _.findIndex(this.state.mockups, {id: this.state.currenId});
      mockups.splice(index, 1);
      this.setState({
        visibleRemoveMockup: false,
        mockups: mockups
      });
    }
  });
};

handleCancelRemoveMockup = e => {
    this.setState({
        visibleRemoveMockup: false
    });
};

 handleOkShareDesignModal = e => {
    this.setState({
       showShareDesignModal: false
    });
 };

 handleCancelShareDesignModal = e => {
    this.setState({
       showShareDesignModal: false
    });
 };

 handleCheckbox = (e, mockup_id) => {
     let mockup_ids = this.state.mockup_ids;
    if(e.target.checked){
        mockup_ids.push(mockup_id);
    }else{
        let index = mockup_ids.indexOf(mockup_id);
        mockup_ids.splice(index, 1);
    }
    this.setState({ mockup_ids: mockup_ids})
  }

  render() {
    return (
      <div>
        <Modal
          className="remove-cart-modal"
          title = {this.props.intl.formatMessage({id: 'remove_mockup'})}
          visible={this.state.visibleRemoveMockup}
          onOk={this.handleOkRemoveMockup}
          onCancel={this.handleCancelRemoveMockup}
          >
          {this.props.intl.formatMessage({id: 'sure_want_delete_mockup'})}
        </Modal>
        <Modal
            className="product-detail-modal"
            visible={this.state.showShareDesignModal}
            onOk={this.handleOkShareDesignModal}
            onCancel={this.handleCancelShareDesignModal}
            footer = {null}
            >
            <ShareDesignModal mockup_ids= {this.state.mockup_ids} handleCancelShare = {this.handleOkShareDesignModal} />
        </Modal>
         <section className="category-section-outer">
           <div className="container">
             <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="mockup-outer">
                          <div className="category-title">{this.props.intl.formatMessage({id: 'my_mockups'})}</div>
                          <span className="share-mockup-span">
                          {this.state.mockup_ids.length ? <i className= "fa fa-share-alt" onClick= {(e)=> this.setState({showShareDesignModal: true})}></i>
                        :
                        ''}
                          </span>
                          </div>
                          <hr className="category-border"/>
                        </div>
                    </div>
                      {this.state.mockups && this.state.mockups.length ?
                      <div className="row">
                        {this.state.mockups.map((ele, i) => (
                          <div key= {i} className="col-md-4 col-sm-12">
                          <div className="product-outer cart-price-outer">
                            <div className="product-outer-upper">
                              <img src={ele.product_data.front_model_image_url} alt="product" />
                              <a href="#" className="delete-product edit-product" onClick={(e) => {
                                e.preventDefault();
                                this.editMockup(ele.id, ele.product_id);
                              }}><i className="fa fa-edit" aria-hidden="true"></i></a>
                              <a href="#" className="delete-product" onClick={(e) => {
                                e.preventDefault();
                                this.deleteMockup(ele.id);
                              }}><i className="fa fa-trash" aria-hidden="true"></i></a>
                              <Checkbox className="mockup-checkbox" name = "spec" onChange= {(e) => this.handleCheckbox(e, ele.id, i)}></Checkbox>
                            </div>
                            <div className="product-outer-bottom">
                              <div className="product-name" dangerouslySetInnerHTML={{ __html: ele.product_data.product_title.replace(ele.product_data['style'], '') }}></div>
                            </div>
                          </div>
                        </div>
                        ))}
                      </div>
                      :
                      <FormattedMessage id= 'your_mockup_empty'></FormattedMessage>}
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
    getMockupsService: bindActionCreators(getMockupsService, dispatch),
    removeMockupService: bindActionCreators(removeMockupService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Mockups));