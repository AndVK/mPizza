import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sortList } from '../components/Sort';
import { PizzaBlock, Skeleton, Pagination, Categories, Sort } from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
import { fetchPizzas } from '../redux/slices/pizza/pizzasSlice';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { SearchPizzaParams } from '../redux/slices/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const sortType = sort.sortProperty;

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ currentPage: String(currentPage), category, search, sortBy, order }));

    window.scrollTo(0, 0);
  };

  // Если не было первого рендера, то не вшиваем параметры в адресную строку
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate, sort.sortProperty]); // проверить необходимость включения в массив navigate, sort.sortProperty

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       // @ts-ignore
  //       setFilters({
  //         ...params,
  //         sort: sort || sortList[0],
  //       }),
  //     );

  //     isSearch.current = true;
  //   }
  // }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzass = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error has occurred. Failed to get pizzas. Please try again later</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzass}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
