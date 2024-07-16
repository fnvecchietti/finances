import { useEffect, useState } from "react";
import { ErrorPage } from "../../components/Errorpage";
import { Loading } from "../../components/LoadingBar";
// import StockTable from "../../components/StocksTable"
import { endpointsV1 } from "../../environent/api-config";
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from "../../hooks/usePrivateAxios";
import { AxiosResponse } from "axios";
import { HookApiResponse } from "../../types";
// import { useDebounce } from "../../hooks/useDebounce";
import { CustomTable } from "../../components/CustomTable";

const Stocks = () => {
    const [stocks, setStocks] = useState<HookApiResponse>({data: null, error: null});
    const [balance, setBalance] = useState<HookApiResponse>({data: null, error: null});
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
      take: 10,
      skip: 0
    })
    
    // const [name, setName] = useState('')
    const axiosPrivate = useAxiosPrivate();
    // const debounce = useDebounce(name, 500);
    const controller = new AbortController();



    const getStocks = () => {
      Promise.all([
        axiosPrivate.get(`${endpointsV1.stocks}?take=${pagination.take}&skip=${pagination.skip}`, {signal: controller.signal}),
        axiosPrivate.get(`${endpointsV1.stocks}/balance`,  {signal: controller.signal})
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
    },[pagination])
    
    
    if (loading) return <Loading />;
  
    if (stocks.error || balance.error) return <ErrorPage />;
  
    if (stocks.data && balance.data) {
      return (
        <div className="container">
          <div className="text-right">Balance: <NumericFormat displayType='text' value={balance.data.data as number} allowLeadingZeros thousandSeparator="," prefix='$' /></div>
          <CustomTable data={stocks.data.data} customPagination={{setPagination, pagination}} rowCount={stocks.data.pagination?.total}/>
        </div>
      );
    };
  

}

export default Stocks;