import { useState } from 'react';
import { BasicTable } from '../../components/BasicTable';
import { ErrorPage } from '../../components/Errorpage';
import { Loading } from '../../components/LoadingBar';
import { Searchbar } from '../../components/Searchbar';
import { endpointsV1 } from '../../environent/api-config';
import { useAxios } from '../../hooks/useAxios';

const Movements = () => {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  

  const { error, response, loading } = useAxios({
    url: `${endpointsV1.movements}?take=${take}&skip=${skip}`,
    method: 'get',
    body: null,
  });




  if (loading) return <Loading />;

  if (error) return <ErrorPage />;

  if (response) {

    return (
      <div className='container'>
        <Searchbar />
        <BasicTable tableData={response.data} total={response.pagination.total} setTake={setTake} setSkip={setSkip} take={take} skip={skip}/>
      </div>
      
    );
  }
};

export default Movements;
