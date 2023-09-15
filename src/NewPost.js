import React, { useContext } from 'react'
import DataContext from './context/datacontext'

const NewPost = () => {
  const {handleSubmit,postTitle,setPostTitle,postBody,setPostBody}=useContext(DataContext)
  return (
    <main className="NewPost"><h1>New Post</h1>
    <form onSubmit={handleSubmit} className="newPostForm">

          <label className='postTitle' htmlFor="postTitle">Title :</label>
            <input type="text" id='postTitle' role='search' placeholder='Titles' required
              value={postTitle}      onChange={(e)=>setPostTitle(e.target.value)}></input>

          <label className='postBody' htmlFor="postBody">Posts : </label>
                      <textarea type="text" id='postBody' role='search' required
                      placeholder='Posts' value={postBody} 
                 onChange={(e)=>setPostBody(e.target.value)}></textarea>
          <button  type="submit">Submit</button>
    </form>
    
    </main>
  )
}

export default NewPost