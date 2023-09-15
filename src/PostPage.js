import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/datacontext';
const PostPage = () => {
  const {posts,handleDelete}=useContext(DataContext)
  const { id }=useParams();
  const post=posts.find(post=>(post.id).toString() ===id);  
  return (
    <main className='PostPage' >
      <article className="newPostForm">
          {
            post && <>
            <h2>{post.title}</h2>
            <p className="postDate">ID : {post.id}</p>
            <p className="postDate">Date Time:  {post.datetime}</p>
            <p className="postBody">Content : {post.body}</p>
            <p>
            <Link to={`/edit/${id}`}>
            <button>Edit Post</button>
            </Link>
            <button className="deletebutton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
            </p>
            </>
          }
          {
            !post && <>
            <p>page not found</p>
            <Link to="/">Visit Home Page</Link>
            </>
          }
      </article>
    </main>
  )
}

export default PostPage