import { useState } from 'react';
import React from 'react';

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

const options = [
  { value: 1, label: '⚡ 0' },
  { value: 2, label: '🌿 1' }
];

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
        Bet
        <TextField fullWidth />
        <br/>
        Guess
        <Select
        defaultValue={1}
        options={options}
        menuMaxHeight={160}
        width={'100%'}
      />
        <br/><br/>
      <Button size='sm'>
          Flip coin!
        </Button>
        <br/><br/>
        <Button size='sm'>
          Give me 100 Koray Coins!
        </Button>
      </WindowContent>
    </Window>
    </Wrapper>
  )
}
