import React, { Component } from "react";
import { injectIntl } from "react-intl";

class Maintance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
       <div class="error-image">
  <h1>👨‍🔧</h1>
</div>
<div class="error-msg-container">
  <h1>Temporarily down for maintenance
We’ll be back soon!
</h1>
  <p>Sorry for the inconvenience but we’re performing some maintenance at the moment. we’ll be back online shortly!</p>
  <p>voxmarketinggroup.com</p>
</div>
      </div>
    );
  }
}
export default injectIntl(Maintance);
