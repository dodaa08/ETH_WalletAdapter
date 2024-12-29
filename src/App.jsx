import React from 'react'
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient();

async function getter(){
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Example API URL
    if (!response.ok) {
      throw new Error("Invalid URL or Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e; // Rethrow the error for React Query to handle
  }
}


function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
    </>
  )
}

function Posts(){
  const {data, isLoading, error}  = useQuery({queryKey : ['posts'], queryFn : getter});
  if(error){
    return <div>{error}</div>
  }
  if(isLoading){
    return "Loading...."
  }
  return(
    <>
      <h1>{data.title}</h1>
      <h1>{data.body}</h1>
    </>
  )
}

export default App




// wallet adapter in Etherium, React hook library, helps us interact with the ETh blockchain
// Wagmi Library, Tan Stack lib, Viem, Wagmi

// TanStack library 