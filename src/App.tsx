import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchNews } from './store/newsSlice';
import { RootState, useAppDispatch } from './store/store';
import NewsSnippet from './components/NewsSnippet';
import { Spin } from 'antd';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newsList, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === 'loading') {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1>News Snippets</h1>
      <div className="news-list">
        {newsList.map((news) => (
          <NewsSnippet key={news.ID} data={news} />
        ))}
      </div>
    </div>
  );
};

export default App;
