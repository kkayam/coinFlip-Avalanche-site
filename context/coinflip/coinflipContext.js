import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ethers, utils } from 'ethers'

import { useAuthContext } from '../auth/authContext'
import coinflipContract from '../../artifacts/contracts/coinflip.sol/coinflip.json'

const CoinflipContext = createContext()

export const CoinflipProvider = ({ children }) => {
  const { authState } = useAuthContext()
  // Create a state variable to hold an instance of the Avaxbox contract
  const [contractInterface, setContractInterface] = useState()

  useEffect(() => {
    // If user is connected to site via MetaMask
    if (authState.data.length) {
      // Get the current provider (defaults to the currently selected network)
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // Get the signer (defaults to the currently selected account)
      const signer = provider.getSigner()

      // This address will be different for every network
      const contractAddress = '0x03d176737F2f40868c400Db1028636F6E45027A8'
      // Initialise the contract instance
      const contract = new ethers.Contract(
        contractAddress,
        coinflipContract.abi,
        signer
      )

      // Store this instance in the state
      setContractInterface(contract)
    }
  }, [authState.data])



  const flipCoin = useCallback(
    async ({ messageData, onSuccess, onError }) => {
      try {
        
        const { bet, guess } = messageData

        const tx = await contractInterface.coinFlip(
          guess,bet
        )
        // We have to wait for the transaction to be mined and added to a block
        const receipt = await tx.wait();
        console.log(receipt);

        if (onSuccess && typeof onSuccess === 'function') onSuccess(receipt)
      } catch (error) {
        if (onError && typeof onError === 'function') onError(error)
      }
    },
    [contractInterface]
  )

  const mintMe = useCallback(
    async () => {
      try {
        const tx = await contractInterface.mintMe(
          100
        )
        // We have to wait for the transaction to be mined and added to a block
        const receipt = await tx.wait();

      } catch (error) {
      }
    },
    [contractInterface]
  )

  const contextData = {
    contractInterface,
    flipCoin,
    mintMe
  }

  return (
    <CoinflipContext.Provider value={contextData}>
      {children}
    </CoinflipContext.Provider>
  )
}

export const useCoinflipContext = () => useContext(CoinflipContext)
