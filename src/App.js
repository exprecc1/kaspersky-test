import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchNews } from "./store/newsSlice";
import { useAppDispatch } from "./store/store";
import NewsSnippet from "./components/NewsSnippet";
import { Spin } from "antd";
import "./App.scss";
const App = () => {
    const dispatch = useAppDispatch();
    const { newsList, status, error } = useSelector((state) => state.news);
    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);
    if (status === "loading") {
        return _jsx(Spin, { size: "large", className: "loading-spinner" });
    }
    if (status === "failed") {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "app-container", children: [_jsx("h1", { children: "News Snippets" }), _jsx("div", { className: "news-list", children: newsList.map((news) => (_jsx(NewsSnippet, { data: news }, news.ID))) })] }));
};
export default App;
