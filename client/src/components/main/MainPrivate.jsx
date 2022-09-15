import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsThunk } from '../../redux/actions/postsAction';
import PrivatePost from './PrivatePost';
import './PrivatePost.css';

export default function MainPrivate() {
  const posts = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPostsThunk());
    console.log('/////////', posts);
  }, []);

  return (
    <div className="container-main">
      {posts?.slice(0, 5).map((el) => (
        <PrivatePost
          post={el}
        />
      ))}
    </div>
  );
}
