function ready(callback) {
  if(document.readyState !== 'loading'){
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

function loadBridge(callback) {
  existingScript = document.getElementById("storyblokBridge")
  if(existingScript){
    callback()
  } else {
    script = document.createElement("script")
    script.src = "https://app.storyblok.com/f/storyblok-v2-latest.js"
    script.id = "storyblokBridge"
    document.body.appendChild(script)
    script.onload = function(){
      callback()
    }
  }
}

ready(loadBridge(function(){
  console.log('Preparing Bridge')

  storyblokInstance = new window.StoryblokBridge()

  storyblokInstance.on(['published', 'change'], function(event){
    console.log(event)
    Alpine.store(event.story.slug, event.story.content)
  })

  storyblokInstance.on('input', function(event){
    console.log(event)
    Alpine.store(event.story.slug, event.story.content)
  })
}))