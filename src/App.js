import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import ProtectedRoute from './Pages/ProtectedRoute';
import PageLoading from './Pages/PageLoading';
import Feed from './Pages/Feed/Feed';
import Explore from './Pages/Explore/Explore';
import Notifications from './Pages/Notifications/Notifications';
import Messages from './Pages/Messages/Messages';
import Lists from './Pages/Lists/Lists';
import Profile from './Pages/Profile/Profile';
import More from './Pages/More/More';
import Bookmarks from './Pages/Bookmark/Bookmarks';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route index element={<Feed/>}/>
        </Route>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route path='feed' element={<Feed/>}/>
          <Route path='explore' element={<Explore/>}/>
          <Route path='notifications' element={<Notifications/>}/>
          <Route path='messages' element={<Messages/>}/>
          <Route path='bookmarks' element={<Bookmarks/>}/>
          <Route path='lists' element={<Lists/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='more' element={<More/>}/>

        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/page-loading" element={<PageLoading/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
