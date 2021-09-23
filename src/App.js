import './App.css';
import { Component } from 'react';

import { PostCard } from './components/PostCard';
import {loadPosts} from './utils/load-posts'

// eslint-disable-next-line 
class App extends Component {
    state = {
      posts: [ ]
    };

    componentDidMount() {
      this.loadPosts();
    }

    loadPosts = async () => {
      const postsAndPhotos = await loadPosts();
      this.setState({ posts: postsAndPhotos});
    }

   
  render() {
    // eslint-disable-next-line
    const{ posts, counter } = this.state;

    return (
      <section className="container"> 
        <div className="posts"> 
          {posts.map(post => (
            <PostCard 
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              cover={post.cover}
              />
          ))}
        </div>
      </section>
    );
  }
}
export default App;
