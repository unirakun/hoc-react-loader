const ghpages = require('gh-pages')
const path = require('path')

/* eslint-disable no-console */
ghpages.publish(path.join(__dirname, 'public'), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Success')
  }
})
/* eslint-enable no-console */
