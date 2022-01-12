import { Component } from 'react';

import './styles.css'

import { Posts } from '../../components/Posts'
import {loadPosts} from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

// eslint-disable-next-line 
export class Home extends Component {
    state = {
      posts: [ ],
      allPosts: [ ],
      page: 0,
      postPerPage: 2,
      searchValue: '',
    };

    async componentDidMount() {
      await this.loadPosts();
    }
  
    loadPosts = async () => {
      const { page, postPerPage } = this.state;
      const postsAndPhotos = await loadPosts();
      this.setState({ 
        posts: postsAndPhotos.slice(page, postPerPage), // posts por pagina
        allPosts: postsAndPhotos,
      });
    }

    loadMorePosts = () => {
      const {
        page,
        postPerPage,
        allPosts,
        posts
      } = this.state;

      const nextPage = page + postPerPage
      const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
      posts.push(...nextPosts); // espalhar todos os posts sem criar array

      this.setState({ posts, page: nextPage })

      
    }

    handleChange = (e) => {
      const {value} = e.target; //retorna o elemento que disparou o evento, ou seja, aqui retornará o input
      this.setState({ searchValue: value})
  
    }
   
  
  render() {
    const{ posts, page, postPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 

    allPosts.filter( posts => {
      return posts.title.toLowerCase().includes(searchValue.toLowerCase()
      )
    })
    : posts;

    return (
      <section className="container"> 
      <div className="search-container">
        {!!searchValue && (
          <h1> Search value: {searchValue} </h1>
        )}
      

      <TextInput searchValue={searchValue} handleChange={this.handleChange} />
      </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p> Não existem posts com o nome de "{searchValue}" </p>
        )}

        

        <div className="button-container"> 
        {!searchValue && (
          <Button
            text="+ Load more posts" 
            onClick={this.loadMorePosts} //isso é apenas um atributo
            disabled={noMorePosts} // fica "bloqueado" quando atinge a qto de posts
          />
        )}

        </div>
      </section>
    );
  }
}

