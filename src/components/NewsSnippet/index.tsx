import React from "react";
import { Card, Tag, Typography, Button, Tooltip, Layout } from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  LinkOutlined,
  StarOutlined,
  StarFilled,
  BookOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, addToReadLater } from "../../store/newsSlice";
import { RootState } from "../../store/store";
import { formatDate, formatReach } from "../../utils/newsUtils";
import { NewsSnippetProps } from "@/types/news";
import "./NewsSnippet.scss";

const { Text, Paragraph, Title } = Typography;
const { Content } = Layout;

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.news.favorites);
  const isFavorite = favorites.includes(data.ID);

  return (
    <>
      <Card className="card-block">
        <div className="snippet-header">
          <div className="header-left">
            <Text type="secondary" className="meta-item">
              <span className="meta-value">
                {formatDate(data.DP).split(" ")[0]}
              </span>
              <span>{formatDate(data.DP).split(" ").slice(1).join(" ")}</span>
            </Text>
            <Text type="secondary" className="meta-item">
              <EyeOutlined />{" "}
              <span className="meta-value">{formatReach(data.REACH)}</span>{" "}
              Reach
            </Text>
            <Text type="secondary" className="meta-item">
              Top Traffic:{" "}
              {data.TRAFFIC.slice(0, 3).map((item, index) => (
                <span key={item.value}>
                  {item.value}{" "}
                  <span className="traffic-value">
                    {Math.round(item.count * 100)}%
                  </span>
                  {index < data.TRAFFIC.slice(0, 3).length - 1 && ", "}
                </span>
              ))}
            </Text>
          </div>
          <div className="header-right">
            <Text type="secondary" className="meta-item">
              Icons 2
            </Text>
            <Text type="secondary" className="meta-item">
              Icons 2
            </Text>
            <Text type="secondary" className="meta-item">
              Icons 3
            </Text>
          </div>
        </div>
        <Title level={5} className="news-title">
          <a href={data.URL} target="_blank" rel="noopener noreferrer">
            {data.TI}
          </a>
        </Title>
        <div className="source-info">
          <Text type="secondary" className="source-item">
            <GlobalOutlined />{" "}
            <a
              href={`https://${data.DOM}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link">{data.DOM}</span>
            </a>
          </Text>
          <Text type="secondary" className="source-item">
            <span /> {data.CNTR}
          </Text>
          <Text type="secondary" className="source-item">
            <BookOutlined />
            <span>{data.LANG.toUpperCase()}</span>
          </Text>
          {data.AU?.length > 0 && (
            <Text type="secondary" className="source-item">
              <UserOutlined /> {data.AU.join(", ")}
            </Text>
          )}
        </div>
        <Paragraph ellipsis={{ rows: 3 }} className="news-abstract">
          {data.AB}
        </Paragraph>
        <Text type="secondary" className="show-item">
          <span>
            Show More <UpOutlined />
          </span>
        </Text>
        <div className="tags-container">
          {data.KW.slice(0, 3).map((tag, index) => (
            <Tag
              style={{ cursor: "pointer", borderRadius: "12px" }}
              key={tag.value}
              className={index === 0 ? "main-tag" : ""}
            >
              {tag.value}{" "}
              {tag.count > 1 && <span className="tag-count">{tag.count}</span>}
            </Tag>
          ))}
          {data.KW.length > 3 && (
            <Tag
              style={{ cursor: "pointer", borderRadius: "12px" }}
              className="show-all-tag"
            >
              Show All +{data.KW.length - 3}
            </Tag>
          )}
        </div>
        <Button variant="filled" className="btn">
          Original Source
        </Button>
      </Card>
    </>
  );
};

export default NewsSnippet;
