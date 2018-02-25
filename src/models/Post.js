
import Moment from 'moment';

class Post {
  constructor(webPost = {}) {
    this.id = webPost.id;
    this.authorDisplayName = webPost.author.display_name;
    this.authorImageUrl = webPost.author.image_url;
    this.content = webPost.content;    
    
    this.createdAt = Moment(webPost.created_at);
    this.updatedAt = Moment(webPost.updated_at);

}