import { Wallet } from "../common/models/Entity/wallet"


export const searchWalletService = async (userId: string) => {

    return await Wallet.findAndCount({where: {created_by: {id: userId}}})

}


export const createWalletService = async (name:string) => {
    return Wallet.save({name: name})
}

export const updateWalletService = async () => {}

export const deleteWalletService = async () => {}

