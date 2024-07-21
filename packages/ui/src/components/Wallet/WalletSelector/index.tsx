import { useContext } from 'react';
import { FinancesContext } from '../../../context';

export type Wallet = {
  id: string;
  name: string;
};

export const WalletSelector = () => {
  const { wallets, setSelectedWallet, selectedWallet } = useContext(FinancesContext);
  
  if (!wallets || !wallets.data.length) return <></>;

  const handleOnWalletSelection = (e: React.BaseSyntheticEvent) => {
    setSelectedWallet(e.target.value);
  };

  return (
    <div className='flex flex-row justify-center items-center'>
      <label htmlFor="wallet" className='w-full'>Current Wallet</label>
      <select
        id="wallet"
        name="wallet"
        className="flex w-full h-10 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder "
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
