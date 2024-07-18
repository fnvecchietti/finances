import {  useState } from 'react';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';
import { endpointsV1 } from '../../environent/api-config';

export const OpenAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string>()
  
  const privateAxios = useAxiosPrivate();

  const fetchPrompt = () => {
    privateAxios.post(endpointsV1.prompt, {prompt})
    .then(res => {
        console.log(res.data)
        setResponse('some response data')
    })
    .catch(err => {
        console.log(err);
        setResponse('some response data')

        
    })
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter your question"
        onChange={(e) => setPrompt(e.target.value)}
        onKeyUp={(e)=> {
          console.log(e.code);
          
            e.code === 'Enter' || e.code === 'NumpadEnter' ? fetchPrompt() : null
        }}
        className="border max-w-xl w-full"
      />
      <textarea
        name=""
        id=""
        value={response}
        className="border max-w-xl w-full"
      ></textarea>
    </>
  );
};
