
import Moment from 'moment';

class Post {
  constructor(webPost = {}) {
    this.id = webPost.id;
    this.authorDisplayName = webPost.author.display_name;
    this.authorImageUrl = webPost.author.image_url ? webPost.author.image_url : '';
    this.groupDisplayName = webPost.group.display_name;
    this.content = webPost.content;    
    
    this.createdAt = Moment(webPost.created_at).toDate();
    this.updatedAt = Moment(webPost.updated_at).toDate();
  }
}

Post.schema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    authorDisplayName: { type: 'string' },
    authorImageUrl: { type: 'string' },
    groupDisplayName: { type: 'string' },
    content: { type: 'string' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
  }
};

module.exports = Post;