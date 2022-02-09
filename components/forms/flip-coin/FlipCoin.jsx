import { useState } from 'react'

import { useCoinflipContext } from '../../../context/coinflip/coinflipContext'

import styles from './FlipCoin.module.scss'

export default function FlipCoin() {
  const [formState, setFormState] = useState({
    bet: '',
    guess: ''
  })
  const [transactionState, setTransactionState] = useState({
    state: 'initial',
    data: null,
    error: null,
  })

  const { flipCoin, mintMe } = useCoinflipContext()

  const handleInputChange = (event) => {
    const {
      target: { name, value },
    } = event

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }))

    if (transactionState.state === 'success') {
      setTransactionState({
        state: 'initial',
        data: null,
        error: null,
      })
    }
  }

  const mintMeButton = (e) => {
    e.preventDefault()
      mintMe()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setTransactionState((prevTransactionState) => ({
      ...prevTransactionState,
      state: 'loading',
    }))

    const onSuccess = (data) => {
      let flipResult = Number(data.events.filter((x) => {return x.event == "coinFlipped"})[0].data);
      let resultMessage = (formState.guess === flipResult) ? 
      (flipResult+" was right! Player won "+formState.bet+" KC!") : 
      (flipResult+" was right. Player lost "+formState.bet+" KC...")
      setTransactionState({
        state: 'success',
        data: resultMessage,
        error: null,
      })
    }

    const onError = (error) => {
      setTransactionState({
        state: 'error',
        data: null,
        error,
      })
    }

    let messageD = formState;
    Object.keys(messageD).map(function(key, index) {
      messageD[key] = Number(messageD[key]);
    });
    flipCoin({ messageData: messageD, onSuccess, onError })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        <span className={styles.formLabelText}>Bet* </span>
        <input
          autoComplete="off"
          className={styles.formInput}
          name="bet"
          value={formState.bet}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className={styles.formLabel}>
        <span className={styles.formLabelText}>Guess* </span>
        <input
          autoComplete="off"
          className={styles.formInput}
          name="guess"
          value={formState.guess}
          onChange={handleInputChange}
          required
        />
      </label>

      {transactionState.state === 'success' ? (
        <p className={styles.formNotification}>Coin flipped! {transactionState.data}</p>
      ) : (
        ''
      )}
      <button className={styles.formSubmit} type="submit">
        {transactionState.state === 'loading'
          ? 'Flipping coin...'
          : 'Flip coin'}
      </button>

      <button type="button" className={styles.formSubmit} onClick={mintMe}>
        Give me 100 Koray Coins!
      </button>
      
    </form>
  )
}
