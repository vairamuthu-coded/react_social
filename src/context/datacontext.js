import { createContext,useState,useEffect } from "react";
import { format } from 'date-fns';
import api from "../api/posts";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom'
const DataContext=createContext({})
export const DataProvider=({children})=>{

    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')
    const [searchResult,setsearchResult]=useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]= useState('')
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody]= useState('')
    const navigate=useNavigate();
    const {width}=useWindowSize();  
   const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3000/posts') 
   
     useEffect(()=>{
      setPosts(data);              
    }, [data]) 
   
  
useEffect(()=>{     
      const filterresult=posts.filter((post)=>((post.title).toLowerCase()).includes(search.toLowerCase())
      || ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.datetime).toLowerCase()).includes(search.toLowerCase()));  
        setsearchResult(filterresult.reverse());
    },[posts,search]) 
  
    const handleDelete=async(id)=>{
        try
        {
          await api.delete(`posts/${id}`)
          const postDelete= posts.filter(post=> post.id !== id);                      
          setPosts(postDelete);
          navigate('/')
        }
        catch(err){
          console.log(err.Message);
        }
    }
  
    const handleSubmit= async (e)=>
    {
        e.preventDefault();
        const id=posts.length ? posts[posts.length-1].id+1 : 1;
        const datetime=format(new Date(),'MMMM dd, yyyy pp');
          const newPost=
          {
              id,
              title:postTitle,
              datetime:datetime,
              body:postBody
          };
          try{
              const response= await api.post("/posts",newPost);  
              const allPosts=[...posts,response.data] 
              setPosts(allPosts);
              setPostTitle('')
              setPostBody('');
              navigate('/')
          }
          catch(err)
          {
            if(err.response)
            {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            else
            {
                console.log(err.Message);
            }
          }
    }
  
    const handleEdit=async(id)=>{
      const datetime=format(new Date(),'MMMM dd, yyyy pp');
      const updatedPost=
      {
          id,
          title:editTitle,
          datetime:datetime,
          body:editBody
      };
      try{
          const response= await api.put(`/posts/${id}`,updatedPost)
          setPosts(posts.map(post=>post.id===id ? {...response.data} : post))
          setEditTitle('')
          setEditBody('');
          navigate('/')
      }
      catch(err){
  
      }
    }
    return(
        <DataContext.Provider  value={{
            width,search,setSearch,searchResult,fetchError,isLoading,
            handleSubmit,postTitle,setPostTitle,postBody,setPostBody,            
            posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody,
            handleDelete,
        }}>
            {children}
        </DataContext.Provider>
    )

}
export default DataContext