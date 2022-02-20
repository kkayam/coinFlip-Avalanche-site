import { useEffect, useState } from 'react'

import FlipCoin from '../../components/forms/flip-coin/FlipCoin'
import FlipCoin95 from '../../components/forms/flip-coin/FlipCoin95'
import Message from '../../components/message/Message'

import { useAvaxboxContext } from '../../context/coinflip/coinflipContext'

import styles from './HomeView.module.scss'

// original Windows95 font (optionally)
// import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
// import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

// const GlobalStyles = createGlobalStyle`
//   ${styleReset}
// `;


export default function HomeView() {
  return (
    <div className={styles.home}>
      {/* <GlobalStyles /> */}

      <h2>Welcome to the coin flip</h2>
      <p>A decentralised way of flipping coins on the Avalanche network</p>
  
      <FlipCoin95 />
      {/* <Message date="date" sender="sender" value="akjlsd" text="hello"/> */}

    </div>
  )
}
