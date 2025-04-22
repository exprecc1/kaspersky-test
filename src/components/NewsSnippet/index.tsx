import React from 'react';
import { Card, Tag, Typography, Button, Tooltip } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  LinkOutlined,
  StarOutlined,
  StarFilled,
  BookOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToReadLater } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { formatDate, formatReach } from '../../utils/newsUtils';
import { NewsSnippetProps } from '@/types/news';
import './NewsSnippet.scss';

const { Text, Paragraph, Title } = Typography;

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.news.favorites);
  const isFavorite = favorites.includes(data.ID);

  return (
    <Card className="news-snippet">
      <div className="snippet-header">
        <Text type="secondary" className="meta-item">
          <CalendarOutlined />{' '}
          <span className="meta-value">{formatDate(data.DP).split(' ')[0]}</span>
          <span>{formatDate(data.DP).split(' ').slice(1).join(' ')}</span>
        </Text>
        <Text type="secondary" className="meta-item">
          <EyeOutlined /> <span className="meta-value">{formatReach(data.REACH)}</span> Reach
        </Text>
        <Text type="secondary" className="meta-item">
          Top Traffic:{' '}
          {data.TRAFFIC.slice(0, 3).map((item, index) => (
            <span key={item.value}>
              {item.value} <span className="traffic-value">{Math.round(item.count * 100)}%</span>
              {index < data.TRAFFIC.slice(0, 3).length - 1 && ', '}
            </span>
          ))}
        </Text>

        <div className="actions">
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <Button
              type="text"
              icon={isFavorite ? <StarFilled style={{ color: '#ffcc00' }} /> : <StarOutlined />}
              onClick={() => dispatch(toggleFavorite(data.ID))}
            />
          </Tooltip>
          <Tooltip title="Read later">
            <Button
              type="text"
              icon={<BookOutlined />}
              onClick={() => dispatch(addToReadLater(data.ID))}
            />
          </Tooltip>
        </div>
      </div>

      <Title level={5} className="news-title">
        <a href={data.URL} target="_blank" rel="noopener noreferrer">
          {data.TI}
        </a>
      </Title>

      <Paragraph ellipsis={{ rows: 3 }} className="news-abstract">
        {data.AB}
      </Paragraph>

      <div className="source-info">
        <Text type="secondary">
          <GlobalOutlined /> {data.DOM}
        </Text>
        {data.AU?.length > 0 && (
          <Text type="secondary">
            <UserOutlined /> {data.AU.join(', ')}
          </Text>
        )}
        <Text type="secondary">
          <span className={`fi fi-${data.CNTR_CODE.toLowerCase()}`} /> {data.CNTR}
        </Text>
      </div>

      {data.HIGHLIGHTS?.[0] && (
        <Paragraph ellipsis={{ rows: 2 }} className="highlights">
          {data.HIGHLIGHTS[0].replace(/<kw>|<\/kw>/g, '')}
          <a className="show-more"> Show more</a>
        </Paragraph>
      )}

      <div className="tags-container">
        {data.KW.slice(0, 3).map((tag, index) => (
          <Tag key={tag.value} className={index === 0 ? 'main-tag' : ''}>
            {tag.value} {tag.count > 1 && <span className="tag-count">{tag.count}</span>}
          </Tag>
        ))}
        {data.KW.length > 3 && <Tag className="show-all-tag">Show All</Tag>}
      </div>

      <div className="snippet-footer">
        <a href={data.URL} className="original-link">
          <LinkOutlined /> Original Source
        </a>
        <a href="#" className="duplicates-link">
          Duplicates: 192
        </a>
      </div>
    </Card>
  );
};

export default NewsSnippet;
