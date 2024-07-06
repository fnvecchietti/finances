import { useEffect, useState } from "react";
import { ErrorPage } from "../../components/Errorpage";
import { Loading } from "../../components/LoadingBar";
import StockTable from "../../components/StocksTable"
import { endpointsV1 } from "../../environent/api-config";
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from "../../hooks/usePrivateAxios";
import { AxiosResponse } from "axios";
import { HookApiResponse } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import { Searchbar } from "../../components/Searchbar";

const Stocks = () => {
    const [stocks, setStocks] = useState<HookApiResponse>({data: null, error: null});
    const [balance, setBalance] = useState<HookApiResponse>({data: null, error: null});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('')
    const axiosPrivate = useAxiosPrivate();
    const debounce = useDebounce(name, 500);

    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);

    const getStocks = () => {
      Promise.all([
        axiosPrivate.get(`${endpointsV1.stocks}?take=${take}&skip=${skip}&name=${name}`),
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
        
    }
    
    useEffect(()=> {
      getStocks()
    },[take,skip,debounce])
    
    
    if (loading) return <Loading />;
  
    if (stocks.error || balance.error) return <ErrorPage />;
  
    if (stocks.data && balance.data) {
      return (
        <div className="container">
          <div className="text-right">Balance: <NumericFormat displayType='text' value={balance.data.data as number} allowLeadingZeros thousandSeparator="," prefix='$' /></div>
          <Searchbar setFilter={setName}/>
          <StockTable tableData={stocks.data.data} total={stocks.data.pagination?.total as number} setTake={setTake} setSkip={setSkip} take={take} skip={skip}/>
        </div>
      );
    };
  

}

export default Stocks;