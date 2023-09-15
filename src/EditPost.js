import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import DataContext from './context/datacontext';
const EditPost = () => {
  const {posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody}=useContext(DataContext)
  const { id }=useParams()
  const post=posts.find(post=>(post.id).toString() === id);    

  useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }

  },[post,setEditTitle, setEditBody])

  return (
    <main className='NewPost'><h1>Edit Post</h1>
    <form onSubmit={(e)=>e.preventDefault()} className="newPostForm">
      {editTitle &&
      <>
   
          <label className='postTitle' htmlFor="postTitle">Title :</label>
            <input type="text" id='postTitle' role='search' placeholder='Title' required
             className='col-md-8' value={editTitle} 
                 onChange={(e)=>setEditTitle(e.target.value)}></input>
          <label className='postBody' htmlFor="postBody">Posts : </label>
                      <textarea type="text" id='postBody' role='search' required
                      placeholder='Title' className='col-md-8' value={editBody} 
                 onChange={(e)=>setEditBody(e.target.value)}></textarea>
          <br></br>
          <button  type="submit"  onClick={()=>handleEdit(post.id)} >Submit</button>
          </>
      }
      {
        !editTitle &&
        <>
        <h2>Post Not Found</h2>
        <Link to={'/'}> Visit Our Home Page</Link>
        </>
      }
    </form>
    
    </main>
  )
}

export default EditPost