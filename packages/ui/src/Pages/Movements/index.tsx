import { useEffect, useState } from 'react';
import { ErrorPage } from '../../components/Errorpage';
import { Loading } from '../../components/LoadingBar';
import { endpointsV1 } from '../../environent/api-config';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { HookApiResponse } from '../../types';
import { AxiosResponse } from 'axios';
import { CustomTable } from '../../components/CustomTable';

const Movements = () => {
  const [movements, setMovements] = useState<HookApiResponse>({
    data: null,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [pagination, setPagination] = useState({
    take: 10,
    skip: 0,
  });
  // const debounce = useDebounce(description, 500);
  const controller = new AbortController();

  const getMovements = () => {
    axiosPrivate
      .get(
        `${endpointsV1.movements}?take=${pagination.take}&skip=${pagination.skip}`,
        { signal: controller.signal },
      )
      .then((movementsResponse: AxiosResponse) => {
        setMovements({ ...movements, data: movementsResponse.data });
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
  }, [pagination]);

  if (loading) return <Loading />;

  if (movements.error) return <ErrorPage />;

  if (movements.data) {
    return (
      <>
        <div className="container">
          <CustomTable
            data={movements.data.data}
            rowCount={movements.data.pagination?.total}
            customPagination={{ pagination, setPagination }}
          />
        </div>
      </>
    );
  }
};

export default Movements;
