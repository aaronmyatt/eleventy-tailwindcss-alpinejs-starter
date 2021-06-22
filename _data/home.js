const axios = require('axios').default

const STORYBLOK_SLUG = 'home'

const requestConfig = {
  method: 'GET',
  url: `${process.env.STORYBLOK_REST_URL}/${STORYBLOK_SLUG}`,
  params: {
    token: process.env.STORYBLOK_SPACE_TOKEN,
    version: process.env.STORYBLOK_SPACE_VERSION
  }
}

async function fetchHomeData(){
  return axios(requestConfig)
    .then(function(response){
      return response.data.story
    }).catch(function(error){
      console.error({ error })
    })
}

module.exports = fetchHomeData