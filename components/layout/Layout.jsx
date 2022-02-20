import React from 'react'
import Head from 'next/head'

import Header from '../header/Header'
import Footer from '../footer/Footer'
import Error from '../error/Error'

import { useAuthContext } from '../../context/auth/authContext'
import { ACCOUNTS_ERROR } from '../../context/auth/authReducer'

import styled from 'styled-components';
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Panel,
  TextField,
  Select
} from 'react95';

import styles from './Layout.module.scss'

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { styleReset, List, ListItem, Divider } from 'react95';
// pick a theme of your choice
import original from "react95/dist/themes/original";


const Wrapper = styled.div`
  padding: 5rem;
  background: ___CSS_0___;
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ___CSS_1___;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    width: 500px;
    margin-left:35%;
    // background-color;
    min-height: 200px;
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`;
export default function Layout({
  children,
  pageImage,
  pageTitle,
  pageDescription,
}) {
  const imageUrl = pageImage || ''
  const { authState } = useAuthContext()

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child)
    }
    return child
  })

  const hasAccountError = authState.status === ACCOUNTS_ERROR || authState.error

  return (
      <ThemeProvider theme={original}>
    <Wrapper>
  <Window className='window'>
      <WindowHeader className='window-header'>
        <span>DCoinflip.exe</span>
        <Button>
        X
        </Button>
      </WindowHeader>
      <Toolbar>
        {/* <Button variant='menu' size='sm'>
          File
        </Button>
        <Button variant='menu' size='sm'>
          Edit
        </Button>
        <Button variant='menu' size='sm' disabled>
          Save
        </Button> */}
      </Toolbar>
      <WindowContent>
      
    <div className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main className={styles.layoutMain}>
        {hasAccountError ? <Error /> : childrenWithProps}
      </main>

      <Footer />
    </div>
      </WindowContent>
    </Window>
    </Wrapper>
    </ThemeProvider>  
  )
}
