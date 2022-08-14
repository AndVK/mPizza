import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addItem } from '../redux/slices/cart/cartSlice';
import { CartItem } from '../redux/slices/cart/types';

interface PizzaState {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  sizes: number;
  types: number;
  rating: number;
}

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<PizzaState>();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<PizzaState | undefined>(`https://628ac91c7886bbbb37abab9f.mockapi.io/items/${id}`);
        setData(data);
      } catch (error) {
        console.log('Error', error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  const onClockAdd = () => {
    const item: CartItem = {
      id: data?.id as string,
      title: data?.title as string,
      price: data?.price as string,
      imageUrl: data?.imageUrl as string,
      type: 0,
      size: 26,
      count: 0,
    };
    dispatch(addItem(item));
  };

  if (!data) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container--fullpizza">
      <div>
        <img src={data.imageUrl} alt={data.title} />
      </div>
      <div>
        <h2>{data.title}</h2>
        <h4>{data.price} dollars</h4>
        <button className="button button--outline button--add" onClick={onClockAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
          </button>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
