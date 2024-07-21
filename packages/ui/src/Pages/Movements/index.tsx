import { useContext, useEffect, useState } from 'react';
import { Loading } from '../../components/common/LoadingBar';
import { endpointsV1 } from '../../environent/api-config';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { AxiosResponse } from 'axios';
import { NoDataAvailable } from '../../components/common/NoDataAvailable';
import { CustomTable } from '../../components/common/CustomTable';
import { FinancesContext } from '../../context';

const Movements = () => {
  const { movements, setMovements, selectedWallet } = useContext(FinancesContext);
  const [pagination, setPagination] = useState({
    take: 10,
    skip: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const getMovements = () => {
    axiosPrivate
      .get(
        `${endpointsV1.movements}?take=${pagination.take}&skip=${pagination.skip}${selectedWallet? '&wallet=' + selectedWallet : ''}`,
        { signal: controller.signal },
      )
      .then((movementsResponse: AxiosResponse) => {
        setMovements(movementsResponse.data)
      })
      .catch((err) => {
       console.log(err);
       
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovements();
  }, [pagination, selectedWallet]);

  if (loading) return <Loading />;

  if (movements && movements.data.length === 0) return <NoDataAvailable />;

  if (movements.data) {
    return (
      <>
        <div className="container">
          <CustomTable
            data={movements.data}
            rowCount={movements.pagination.total}
            customPagination={{ pagination, setPagination }}
          />
        </div>
      </>
    );
  }
};

export default Movements;
