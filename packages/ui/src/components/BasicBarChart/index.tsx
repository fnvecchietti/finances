import ReactApexChart from 'react-apexcharts';
import { DateInRange } from '../DateInRange';
import { Loading } from '../../components/LoadingBar';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAxios } from '../../hooks/useAxios';
import { endpointsV1 } from '../../environent/api-config';
import { ErrorPage } from '../../components/Errorpage';
export const BasicBarchart = () => {

  const [range, setRange ] = useState({from: '', to: ''})
  

  useEffect(()=> {
    const today = new Date()
    
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)
    
    setRange({
      from:format(sevenDaysAgo,'yyyy-MM-dd'),
      to: format(today,'yyyy-MM-dd')
    })
  }, []);


  const { response, error, loading } = useAxios({
    url: `${endpointsV1.movements}?take=10&order=asc${range.from? `&from=${range.from}` : ``}${range.to? `&to=${range.to}`: ''}`,
    method: 'get',
    body: null,
  });

  if (error) return <ErrorPage />;

  const data = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [],
      },
    ],
  };

  if (response) {
    const { result } = response.data;
    result.map((movement: any) => {
      data.options.xaxis.categories.push(movement.date as never);
      data.series[0].data.push(movement.amount as never);
    });
  }

  if(loading) return <Loading/>

  const handleChangeOnDate = ({from, toDate}: {from:string, toDate:string}) =>{
    setRange({from, to:toDate})
    
  }

  return (
    <div className="w-1/2 min-h-max">
      <DateInRange initialStateFrom={range.from} initialStateToDate={range.to} callbackRange={handleChangeOnDate}/>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};
