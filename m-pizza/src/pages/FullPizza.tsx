import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PizzaState {
  imageUrl: string;
  title: string;
  price: string;
}

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<PizzaState>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://628ac91c7886bbbb37abab9f.mockapi.io/items/${id}`);
        setData(data);
      } catch (error) {
        console.log('Error', error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!data) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <img src={data.imageUrl} alt={data.title} />
      <h2>{data.title}</h2>
      <h4>{data.price} рублей</h4>
    </div>
  );
};

export default FullPizza;
