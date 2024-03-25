const path = require('path');

function getPost(req, res) {
  res.render('post', {
    templateName: 'post1'
  })
  //res.sendFile(path.join(__dirname, '..', 'public', '1.png'));
  //res.send('<div><h1>Post Title</h1><p>This is a post</p></div>');
}

module.exports = getPost;