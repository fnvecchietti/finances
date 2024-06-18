import { useState } from "react";
import { ErrorPage } from "../../components/Errorpage";
import { Loading } from "../../components/LoadingBar";
import StockTable from "../../components/StocksTable"
import { useAxios } from "../../hooks/useAxios";
import { endpointsV1 } from "../../environent/api-config";
import { NumericFormat } from 'react-number-format';


const Stocks = () => {
    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);

    const stocks = useAxios({
      url: `${endpointsV1.stocks}?take=${take}&skip=${skip}`,
      method: 'get',
      body: null,
    });

    const balance = useAxios({
      url: `${endpointsV1.stocks}/balance`,
      method: 'get',
      body: null,
    });
  
  
    
  
    if (stocks.loading) return <Loading />;
  
    if (stocks.error) return <ErrorPage />;
  
    if (stocks.response && balance.response) {
      return (
        <div>
          <div>Balance: <NumericFormat displayType='text' value={balance.response.data.result} allowLeadingZeros thousandSeparator="," prefix='$' /></div>
          <StockTable tableData={stocks.response.data.result} total={stocks.response.data.pagination.total} setTake={setTake} setSkip={setSkip} take={take} skip={skip}/>
        </div>
        
      );
    }

    return 
}

export default Stocks;