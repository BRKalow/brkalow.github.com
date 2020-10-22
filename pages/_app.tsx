import React from 'react';
import App from 'next/app';
import StyleProvider from '../components/style-provider';
import ThemeSwitcher from '../components/theme-switcher';
import Shapes from '../components/shapes';
import { Header } from '../components/header';

import '../styles/prism-theme.css';
import '../styles/animations.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
        <main role="main">
          <StyleProvider>
            <Header />
            <div className="content">
            <Component {...pageProps} />
            </div>
          </StyleProvider>
          <Shapes />
        </main>
    );
  }
}

export default MyApp;
