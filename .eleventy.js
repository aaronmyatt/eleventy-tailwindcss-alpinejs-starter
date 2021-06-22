require('dotenv').config();

const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("pug,css");
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy({
    './js/*.js': './js',
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
}
