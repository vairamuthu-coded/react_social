import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/datacontext'
const Home = () => {
  const{searchResult,fetchError,isLoading}=useContext(DataContext)
  return (
        <main className='Home' style={{height:"300px"}}>            
            {isLoading && <p className="statusMsg" >...Loading Posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}} >{fetchError}</p>}
            {!isLoading && !fetchError && searchResult.length ? (<Feed posts={searchResult} />) : (<p  style={{marginTop:"2rem"}}> No Post Display  </p>)}
          
        </main>  
  )
}

export default Home