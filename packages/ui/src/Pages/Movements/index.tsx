import { useEffect, useState } from 'react';
import { MovementsTable } from '../../components/MovementsTable';
import { ErrorPage } from '../../components/Errorpage';
import { Loading } from '../../components/LoadingBar';
import { Searchbar } from '../../components/Searchbar';
import { endpointsV1 } from '../../environent/api-config';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { HookApiResponse } from '../../types';
import { AxiosResponse } from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

const Movements = () => {
  const [movements, setMovements] = useState<HookApiResponse>({
    data: null,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [description, setDescription] = useState('')
  const debounce = useDebounce(description, 500);
  const controller = new AbortController();

  const getMovements = () => {
    axiosPrivate
      .get(`${endpointsV1.movements}?take=${take}&skip=${skip}&description=${description}`, {signal: controller.signal})
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
  }, [take, skip, debounce]);

  if (loading) return <Loading />;

  if (movements.error) return <ErrorPage />;

  if (movements.data) {
    return (
      <div className="container">
        <Searchbar setFilter={setDescription}/>
        <MovementsTable
          tableData={movements.data.data}
          total={movements.data.pagination?.total as number}
          setTake={setTake}
          setSkip={setSkip}
          take={take}
          skip={skip}
        />
      </div>
    );
  }
};

export default Movements;
