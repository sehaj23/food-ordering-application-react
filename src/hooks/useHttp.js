import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const products = await fetch(url, config);
  if (products.ok) {
    return await products.json();
  }

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
}

export default  function useHttp(url, config, initialData) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData(){
    setData(initialData)
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      if(config.method !== 'GET'){
        config = {...config,body:data}
      }
      setIsLoading(true);
      try {
        const responseData = await sendHttpRequest(url, config);
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
