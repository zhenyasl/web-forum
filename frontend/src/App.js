import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import NotFound from './pages/NotFound';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import MyComments from './pages/MyComments';
import User from './pages/User';
import MyPosts from './pages/User';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/post/:postId" element={<Post />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-comments" element={<MyComments />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/my-posts" element={<MyPosts />} />
            </Routes>
        </Router>
    );
}

export default App;
