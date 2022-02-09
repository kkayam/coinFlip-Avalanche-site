import { useEffect, useState } from 'react'

import FlipCoin from '../../components/forms/flip-coin/FlipCoin'
import Message from '../../components/message/Message'

import { useAvaxboxContext } from '../../context/coinflip/coinflipContext'

import styles from './HomeView.module.scss'

export default function HomeView() {
  return (
    <div className={styles.home}>
      <h2>Welcome to the coin flip</h2>
      <p>A decentralised way of flipping coins on the Avalanche network</p>
  
      <FlipCoin />
      {/* <Message date="date" sender="sender" value="akjlsd" text="hello"/> */}

    </div>
  )
}
