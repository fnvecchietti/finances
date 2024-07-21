import { useContext } from 'react';
import { FinancesContext } from '../../../context';
import { NoDataAvailable } from '../../common/NoDataAvailable';

export type Wallet = {
  id: string;
  name: string;
};

export const WalletSelector = () => {
  const { wallets, setSelectedWallet, selectedWallet } = useContext(FinancesContext);
  
  if (!wallets || !wallets.data.length) return <NoDataAvailable/>;

  const handleOnWalletSelection = (e: React.BaseSyntheticEvent) => {
    setSelectedWallet(e.target.value);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <label htmlFor="wallet">Select your Wallet</label>
      <select
        id="wallet"
        name="wallet"
        className="mt-3 flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
        onChange={handleOnWalletSelection}
        onClick={handleOnWalletSelection}
        defaultValue={selectedWallet}
      >
        {wallets.data.map((w: Wallet, index: number) => {
          return (
            <option key={index} value={w.id}>
              {w.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
