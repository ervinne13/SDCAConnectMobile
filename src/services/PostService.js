import _ from 'lodash';
import Realm from 'realm';
import Post from '../models/Post';
import PostAPI from '../api/PostAPI';

import Schema from '../schema/schema';

const repository = Schema;

const PostService = {

  beginSync: async function (server, authToken) {

    let api = new PostAPI(server, authToken);
    let webPosts = await api.getPosts();

    if (!webPosts.length) {
      console.log('No Posts Available');
      return;
    }

    webPosts.forEach(webPost => {
      PostService.save(new Post(webPost));
    });

  },

  find: function (id) {
    let result = repository
      .objects('Post')
      .filtered("id = '" + id + "'");

    if (result.length) {
      return result[0];
    } else {
      throw new Error('Post with id: ' + id + ' not found');
    }
  },

  findAll: function (sortBy) {
    //  false = desc
    if (!sortBy) 
      sortBy = [
        ['id', false]
      ];
    return repository
      .objects('Post')
      .sorted(sortBy);
  },

  save: function (post) {
    console.log('Attempting to save post:', post);
    //  update instead if the record already exists
    if (repository.objects('Post').filtered("id = '" + post.id + "'").length) {
      return PostService.update(post);
    }

    return new Promise(resolve => {
      repository.write(() => {
        repository.create('Post', post);
        console.log('Post Saved:', post);
        resolve(post);
      });
    });
  },

  update: function (post) {

    return new Promise(resolve => {
      repository.write(() => {
        //  TODO:
        resolve(post);
      });
    });
  }
}

module.exports = PostService;