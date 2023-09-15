import { useContext } from "react"
import { Link } from "react-router-dom"
import DataContext from "./context/datacontext"

const Nav = () => {
const {search,setSearch}=useContext(DataContext)
  return (
   <nav className="Nav">
        <form className="searchForm" onSubmit={(e)=>e.preventDefault()} >
          <label htmlFor="search">Search Posts</label>
                      <input type="text" id='search' role='search' placeholder='search items' 
                      className='col-md-8' value={search} 
                      onChange={(e)=>setSearch(e.target.value)}></input>

        </form>
        <ul>
              <li>
                <Link to={"/"}> Home</Link>      
                <Link to={"about"}> About</Link>        
                <Link to={"post"}> Post</Link>       
                
              </li>
        </ul>
   </nav>
  )
}

export default Nav