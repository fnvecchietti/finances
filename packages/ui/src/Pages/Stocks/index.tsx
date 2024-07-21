import { useContext, useEffect, useState } from 'react';
import { ErrorPage } from '../../components/common/Errorpage';
import { Loading } from '../../components/common/LoadingBar';
// import StockTable from "../../components/StocksTable"
import { endpointsV1 } from '../../environent/api-config';
import { NumericFormat } from 'react-number-format';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { AxiosResponse } from 'axios';
// import { useDebounce } from "../../hooks/useDebounce";
import { NoDataAvailable } from '../../components/common/NoDataAvailable';
import { CustomTable } from '../../components/common/CustomTable';
import { FinancesContext } from '../../context';

const Stocks = () => {
  const { stocks, setStocks, stocksBalance, setStocksBalance,selectedWallet } = useContext(FinancesContext);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    take: 10,
    skip: 0,
  });

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const getStocks = () => {
    Promise.all([
      axiosPrivate.get(
        `${endpointsV1.stocks}?take=${pagination.take}&skip=${pagination.skip}${selectedWallet? '&wallet=' + selectedWallet : ''}`,
        { signal: controller.signal },
      ),
      axiosPrivate.get(`${endpointsV1.stocks}/balance`, {
        signal: controller.signal,
      }),
    ])
      .then(
        ([stocksResponse, balanceRsponse]: [AxiosResponse, AxiosResponse]) => {
          setStocks(stocksResponse.data);
          setStocksBalance(balanceRsponse.data);
        },
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getStocks();
  }, [pagination,selectedWallet]);

  if (loading) return <Loading />;

  if (stocks.data && stocksBalance.data && stocks.data.length === 0)
    return <NoDataAvailable />;

  if (stocks.data && stocksBalance.data) {
    return (
      <div className="container">
        <div className="text-right">
          Balance:{' '}
          <NumericFormat
            displayType="text"
            value={stocksBalance.data}
            allowLeadingZeros
            thousandSeparator=","
            prefix="$"
          />
        </div>
        <CustomTable
          data={stocks.data}
          customPagination={{ setPagination, pagination }}
          rowCount={stocks.pagination?.total}
        />
      </div>
    );
  }
};

export default Stocks;
