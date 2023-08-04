import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../components/Common/Topbar';
import CategoryButtons from '../../components/Button/CategoryButtons';
import BestBucketList from '../../components/Feed/BestBucketList';
import FeedForExplore from '../../components/Feed/FeedForExplore';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import ToTopButton from '../../components/Button/ToTopButton';

function ExFeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiEndpoint = 'http://i9a609.p.ssafy.io:8000/posts'; // Replace this with your API endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        console.log('요청');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExFeed;
