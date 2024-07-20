import { Wallet } from "../common/models/Entity/wallet"


export const searchWalletService = async () => {

    return await Wallet.findAndCount()

}


export const createWalletService = async (name:string) => {
    return Wallet.save({name: name})
}

export const updateWalletService = async () => {}

export const deleteWalletService = async () => {}

