import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <= 0 ){
    return <h1 className='my-30 text-5xl font-black text-center mb-10 text-gray-300'>No New User Found !</h1>
  }

  return (
    feed && (
      <div className='flex justify-center my-10 pt-20 px-4'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;


