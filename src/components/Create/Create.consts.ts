import React from 'react'
import { interfaces as peanutInterfaces } from '@squirrel-labs/peanut-sdk'

import * as createLinkViews from './Link'

export type CreateType = 'link' | 'direct' | 'email_link' | 'sms_link' | undefined

export type CreateScreens = 'INITIAL' | 'INPUT' | 'CONFIRM' | 'SUCCESS'

export interface IAttachmentOptions {
    fileUrl: string | undefined
    message: string | undefined
    rawFile: File | undefined
}

export interface ICreateScreenState {
    screen: CreateScreens
    idx: number
}

export const INIT_VIEW_STATE: ICreateScreenState = {
    screen: 'INITIAL',
    idx: 0,
}
export interface ICreateScreenProps {
    onPrev: () => void
    onNext: () => void
    onCustom: (screen: CreateScreens) => void
    tokenValue: string | undefined
    setTokenValue: (value: string | undefined) => void
    linkDetails: peanutInterfaces.IPeanutLinkDetails
    setLinkDetails: (value: peanutInterfaces.IPeanutLinkDetails) => void
    password: string
    setPassword: (value: string) => void
    transactionType: 'not-gasless' | 'gasless'
    setTransactionType: (value: 'not-gasless' | 'gasless') => void
    gaslessPayload: peanutInterfaces.IGaslessDepositPayload | undefined
    setGaslessPayload: (value: peanutInterfaces.IGaslessDepositPayload | undefined) => void
    gaslessPayloadMessage: peanutInterfaces.IPreparedEIP712Message | undefined
    setGaslessPayloadMessage: (value: peanutInterfaces.IPreparedEIP712Message | undefined) => void
    preparedDepositTxs: peanutInterfaces.IPrepareDepositTxsResponse | undefined
    setPreparedDepositTxs: (value: peanutInterfaces.IPrepareDepositTxsResponse | undefined) => void
    txHash: string
    setTxHash: (value: string) => void
    link: string
    setLink: (value: string) => void
    feeOptions: any | undefined
    setFeeOptions: (options: any | undefined) => void
    transactionCostUSD: number | undefined
    setTransactionCostUSD: (cost: number | undefined) => void
    estimatedPoints: number | undefined
    setEstimatedPoints: (points: number | undefined) => void
    attachmentOptions: IAttachmentOptions
    setAttachmentOptions: (options: IAttachmentOptions) => void
    createType: CreateType
    setCreateType: (type: CreateType) => void
    recipient: { address: string | undefined; name: string | undefined }
    setRecipient: (recipient: { address: string | undefined; name: string | undefined }) => void
    recentRecipients: {
        address: string
        count: any
        mostRecentInteraction: any
    }[]
    setRecentRecipients: (
        recipients: {
            address: string
            count: any
            mostRecentInteraction: any
        }[]
    ) => void
    crossChainDetails: []
    usdValue: string | undefined
    setUsdValue: (value: string | undefined) => void
    isPay?: boolean
    payId?: string
    payTxHash?: string
    setPayTxHash?: (txHash: string) => void
}

export const CREATE_SCREEN_FLOW: CreateScreens[] = ['INITIAL', 'INPUT', 'CONFIRM', 'SUCCESS']

export const CREATE_SCREEN_MAP: { [key in CreateScreens]: { comp: React.FC<any> } } = {
    INITIAL: { comp: createLinkViews.CreateLinkInitialView },
    INPUT: { comp: createLinkViews.CreateLinkInputView },
    CONFIRM: { comp: createLinkViews.CreateLinkConfirmView },
    SUCCESS: { comp: createLinkViews.CreateLinkSuccessView },
}
