import React from 'react';
import { useSelector } from 'react-redux';
import PrivatePost from './PrivatePost';

const posts = [
  {
    title: 'Bob', body: 'stupid', locationId: 1, userId: 1, wayId: 1
  },

  {
    title: 'Bob', body: 'stupid', locationId: 1, userId: 1, wayId: 1
  },
  {
    title: 'Bob', body: 'stupid', locationId: 1, userId: 1, wayId: 1
  }
];

export default function MainPrivate() {
//   const posts = useSelector((store) => store.posts);
  // const user = useSelector((store) => store.posts);
  return (
    <div className="container-main">
      {posts?.map((el) => (
        <PrivatePost
          post={el}
        />
      ))}
    </div>
  );
}
