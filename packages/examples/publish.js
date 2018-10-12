/* eslint-disable
  import/no-extraneous-dependencies,
  no-console
*/
const ghpages = require('gh-pages')
const path = require('path')

ghpages.publish(path.join(__dirname, 'public'), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Success')
  }
})
