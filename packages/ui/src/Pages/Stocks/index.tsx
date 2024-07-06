import { useEffect, useState } from "react";
import { ErrorPage } from "../../components/Errorpage";
import { Loading } from "../../components/LoadingBar";
import StockTable from "../../components/StocksTable"
import { endpointsV1 } from "../../environent/api-config";
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from "../../hooks/usePrivateAxios";
import { AxiosResponse } from "axios";
import { HookApiResponse } from "../../types";

const Stocks = () => {
    const [stocks, setStocks] = useState<HookApiResponse>({data: null, error: null});
    const [balance, setBalance] = useState<HookApiResponse>({data: null, error: null});
    const [loading, setLoading] = useState(true);

    const axiosPrivate = useAxiosPrivate();
    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);
    
    useEffect(()=> {
      setLoading(true)
      Promise.all([
        axiosPrivate.get(`${endpointsV1.stocks}?take=${take}&skip=${skip}`),
        axiosPrivate.get(`${endpointsV1.stocks}/balance`)
      ])
      .then(([stocksResponse, balanceRsponse]: [AxiosResponse, AxiosResponse]) => {
        setStocks({...stocks, data: stocksResponse.data});
        setBalance({...balance, data: balanceRsponse.data});
      })
      .catch(err => {
        console.log(err);
        
      })
      .finally(()=> {
        setLoading(false)
      })
        
      
    },[take,skip])
    
    
    if (loading) return <Loading />;
  
    if (stocks.error || balance.error) return <ErrorPage />;
  
    if (stocks.data && balance.data) {
      return (
        <div className="container">
          <div>Balance: <NumericFormat displayType='text' value={balance.data.data as number} allowLeadingZeros thousandSeparator="," prefix='$' /></div>
          <StockTable tableData={stocks.data.data} total={stocks.data.pagination?.total as number} setTake={setTake} setSkip={setSkip} take={take} skip={skip}/>
        </div>
      );
    };
  

}

export default Stocks;