'use client'
import { useAccount } from 'wagmi'

import CopyField from '@/components/Global/CopyField'
import * as context from '@/context'
import * as utils from '@/utils'
import { useState, useContext } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import TokenAmountInput from '@/components/Global/TokenAmountInput'
import TokenSelector from '@/components/Global/TokenSelector/TokenSelector'

export const Request = () => {
    const { isConnected, address } = useAccount()
    const { selectedChainID, selectedTokenAddress } = useContext(
        context.tokenSelectorContext
    )
    const { open } = useWeb3Modal()
    const [errorState, setErrorState] = useState<{
        showError: boolean
        errorMessage: string
    }>({ showError: false, errorMessage: '' })
    const [requestLink, setRequestLink] = useState<string | undefined>(undefined)
    const { setLoadingState, loadingState, isLoading } = useContext(context.loadingStateContext)
    const [tokenValue, setTokenValue] = useState<string | undefined>()


    const handleRequest = async () => {
        try {
            if (isLoading || (isConnected && !tokenValue)) return

            setLoadingState('Loading')

            setErrorState({
                showError: false,
                errorMessage: '',
            })
            setLoadingState('Generating details')
            const payRes = await fetch('http://localhost:3000/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    chainId: selectedChainID,
                    tokenAddress: selectedTokenAddress,
                    amount: tokenValue,
                }),
            })
            setRequestLink((await payRes.json()).link)
        } catch (error) {
            const errorString = utils.ErrorHandler(error)
            setErrorState({
                showError: true,
                errorMessage: errorString,
            })
        } finally {
            setLoadingState('Idle')
        }
    }

    return (
        <div className="card">
            <div className="flex w-full flex-col items-center justify-center gap-6 py-2 text-center">
                <label className="text-h2">Request</label>
                <div className="max-w-96 text-start text-h8 font-light">
                </div>
            <div className="flex w-full flex-col items-center justify-center gap-3">
                <TokenAmountInput
                    className="w-full"
                    tokenValue={tokenValue}
                    setTokenValue={setTokenValue}
                    onSubmit={() => {console.log('submit')}}
                />
                <TokenSelector classNameButton="w-full" />
            </div>

                    <div
                        className={
                            errorState.showError
                                ? 'mx-auto mb-0 mt-4 flex w-full flex-col items-center gap-10 sm:mt-0'
                                : 'mx-auto mb-8 mt-4 flex w-full flex-col items-center sm:mt-0'
                        }
                    >
                        <button
                            className="btn-purple btn-xl"
                            onClick={() => {
                                if (!isConnected) {
                                    open()
                                } else {
                                    handleRequest()
                                }
                            }}
                            disabled={isLoading || (isConnected && !tokenValue) || !!requestLink}
                        >
                            {isLoading ? (
                                <div className="flex justify-center gap-1">
                                    <label>{loadingState} </label>
                                    <span className="bouncing-dots flex">
                                        <span className="dot">.</span>
                                        <span className="dot">.</span>
                                        <span className="dot">.</span>
                                    </span>
                                </div>
                            ) : !isConnected ? (
                                'Create or Connect Wallet'
                            ) : requestLink ? (
                                'Success'
                            ) : (
                                'Request'
                            )}
                        </button>
                        {requestLink ? (
                            <div className="hidden w-full md:block">
                                <CopyField text={requestLink} />
                            </div>
                        ) : (
                            errorState.showError && (
                                <div className="text-center">
                                    <label className="font-bold text-red ">{errorState.errorMessage}</label>
                                </div>
                            )
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Request
