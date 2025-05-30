import React, { useState } from 'react';
import { Button, Card, Tag, Typography, Checkbox } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  BookOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { toggleFavorite } from '@/store/newsSlice';
import { formatDate, formatReach } from '../../utils/newsUtils';
import { NewsSnippetProps } from '@/types/news';
import './NewsSnippet.scss';
import { WarningIcon } from '@/shared/ui/icons/warning-icon';

const { Text, Paragraph, Title } = Typography;

// Компонент для выделения ключевых слов
const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(<kw>.*?<\/kw>)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('<kw>') && part.endsWith('</kw>') ? (
          <span key={index} className="highlighted-keyword">
            {part.replace(/<\/?kw>/g, '')}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [showFullText, setShowFullText] = useState(false);
  const [showAllTag, setShowAllTag] = useState(false);
  const { newsList, favorites } = useSelector((state: RootState) => state.news);

  //Переключатель избранноого
  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  // Фильтруем связанные новости по ID
  const relatedNews = newsList.filter((news) => news.ID === data.ID);

  return (
    <Card className="news-card">
      {/* Шапка новости */}
      <div className="snippet-header">
        <div className="header-left">
          <Text type="secondary" className="meta-item">
            <span className="meta-value">{formatDate(data.DP).split(' ')[0]}</span>
            <span>{formatDate(data.DP).split(' ').slice(1).join(' ')}</span>
          </Text>
          <Text type="secondary" className="meta-item">
            <span className="meta-value">{formatReach(data.REACH)}</span> <span>Reach</span>
          </Text>
          <Text type="secondary" className="meta-item">
            <span>Top Traffic: </span>
            {data.TRAFFIC.slice(0, 3).map((item, index) => (
              <span key={item.value}>
                {item.value} <span className="traffic-value">{Math.round(item.count * 100)}%</span>
                {index < data.TRAFFIC.slice(0, 3).length - 1}
              </span>
            ))}
          </Text>
        </div>
        <div className="header-right">
          <Button variant="solid" className="meta-btn">
            Positive
          </Button>
          <Text type="secondary" className="meta-item">
            <WarningIcon className="icon-warning" />
          </Text>
          <Text type="secondary" className="meta-item">
            <Checkbox
              className="check-box"
              checked={favorites.includes(data.ID)}
              onChange={() => handleToggleFavorite(data.ID)}
            />
          </Text>
        </div>
      </div>

      {/* Заголовок и источник */}
      <Title level={5} className="news-title">
        <a href={data.URL} target="_blank" rel="noopener noreferrer">
          {data.TI}
        </a>
      </Title>
      <div className="source-info">
        <Text type="secondary" className="source-item">
          <span>
            <GlobalOutlined />{' '}
          </span>
          <a href={`https://${data.URL}`} target="_blank">
            {data.DOM}
          </a>
        </Text>
        <Text type="secondary" className="source-item">
          <span>{data.CNTR}</span>
        </Text>
        <Text type="secondary" className="source-item">
          <span>
            <BookOutlined /> {data.LANG.toUpperCase()}
          </span>
        </Text>
        {data.AU?.length > 0 && (
          <Text type="secondary" className="source-item">
            <span>
              <UserOutlined /> {data.AU.join(', ')}
            </span>
          </Text>
        )}
      </div>

      {/* Основной текст с кнопкой "Показать больше" */}
      <Paragraph className={`news-abstract ${showFullText ? 'expanded' : 'collapsed'}`}>
        {data.AB}
        <HighlightedText text={data.HIGHLIGHTS.join(' ')} />
      </Paragraph>
      <Text type="secondary" className="show-item" onClick={() => setShowFullText(!showFullText)}>
        <span>Show More</span> {showFullText ? <UpOutlined /> : <DownOutlined />}
      </Text>

      {/* Ключевые слова */}
      <div className="tags-container">
        {(showAllTag ? data.KW : data.KW.slice(0, 3)).map((tag, index) => (
          <Tag key={tag.value} className={index === 0 ? 'main-tag' : 'tag'}>
            <span>
              {' '}
              {tag.value} {tag.count >= 1 && tag.count}
            </span>
          </Tag>
        ))}
        {data.KW.length > 3 && !showAllTag && (
          <Tag className="more-tags" onClick={() => setShowAllTag(true)}>
            <span>Show All +{data.KW.length - 3}</span>
          </Tag>
        )}
      </div>

      {/* Футер */}
      <div className="news-footer">
        <Text type="secondary" className="dublicate-text">
          Дубликаты: <span>192</span>
        </Text>
      </div>

      {/* Связанные новости */}
      {relatedNews.map((news) => (
        <Card key={news.ID} className="related-news">
          <div className="snippet-header">
            <div className="header-left">
              <Text type="secondary" className="meta-item">
                <span className="meta-value">{formatDate(data.DP).split(' ')[0]}</span>
                <span>{formatDate(data.DP).split(' ').slice(1).join(' ')}</span>
              </Text>
              <Text type="secondary" className="meta-item">
                <span className="meta-value">{formatReach(data.REACH)}</span> <span>Reach</span>
              </Text>
            </div>
            <div className="header-right">
              <Text type="secondary" className="meta-item">
                <WarningIcon className="icon-warning" />
              </Text>
              <Text type="secondary" className="meta-item">
                <Checkbox className="check-box" />
              </Text>
            </div>
          </div>
          <Title level={5}>
            <a href={news.URL} target="_blank">
              {news.TI}
            </a>
          </Title>
          <div className="source-info">
            <Text type="secondary" className="source-item">
              <span>
                <GlobalOutlined />{' '}
              </span>
              <a href={`https://${data.URL}`} target="_blank">
                {data.DOM}
              </a>
            </Text>
            <Text type="secondary" className="source-item">
              <span>{data.CNTR}</span>
            </Text>
            <Text type="secondary" className="source-item">
              <span>
                <BookOutlined /> {data.LANG.toUpperCase()}
              </span>
            </Text>
            {data.AU?.length > 0 && (
              <Text type="secondary" className="source-item">
                <span>
                  <UserOutlined /> {data.AU.join(', ')}
                </span>
              </Text>
            )}
          </div>
        </Card>
      ))}
      <Button variant="outlined" className="footer-btn">
        <DownOutlined /> View Dublicates
      </Button>
    </Card>
  );
};

export default NewsSnippet;
