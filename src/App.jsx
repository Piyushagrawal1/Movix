import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api.js"
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

import Header from "./components/header/header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Home from './pages/home/Home.jsx';
import Details from "./pages/details/Deatails.jsx"
import SearchResult from "./pages/searchResult/searchResult.jsx"
import Explore from "./pages/explore/Explore.jsx"
import PageNotFound from "./pages/404/PageNotFound.jsx"



function App() {
  // const [okk,setSta] = useState();
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  // useEffect(() => {
  //   fetchApiConfig();
  // }, []);
  useEffect(() => {
    return () => {
      fetchApiConfig();
    };
  })

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      });
  };

  return (<BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:mediaType/:id" element={<Details />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/explore/:mediaType" element={<Explore />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>);
}
export default App;
