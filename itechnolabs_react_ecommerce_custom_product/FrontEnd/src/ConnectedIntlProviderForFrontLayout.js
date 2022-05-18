/*
 * @file: ConnectedIntlProvider.js
 * @description: Component for maintaining i18n
 * @date: 09.09.2020
 * @author: Megha Sethi
 * */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlDE from 'react-intl/locale-data/de';
import en from './translations/en';
import de from './translations/de';

addLocaleData([...intlEN, ...intlDE]);

const messages = {
  en: en,
  de: de
};

class ConnectedIntlProvider extends Component {
  constructor(props) {
    super(props);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  onChangeLanguage(ev) {
    let context = this;
    context.props.localeChange(ev.target.value);
  }

  render() {
    const { children } = this.props;
    return (
      <IntlProvider
        key={this.props.locale.lang}
        locale={this.props.locale.lang}
        messages={messages[this.props.locale.lang]}
      >
          {children}
      </IntlProvider>
    );
  }
}

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
const mapStateToProps = state => ({ locale: state.locale });
// const mapDispatchToProps = dispatch => ({
//   localeChange: bindActionCreators(localeChange, dispatch)
// });

export default connect(mapStateToProps, null)(ConnectedIntlProvider);
