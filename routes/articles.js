const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

//   show form for new post
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article:article } )
})


//Get an Article by ID

// router.get('/:id', async (req, res) => {
//     const article = await Article.findById(req.params.id)
//     if(article == null) res.redirect('/articles')
//     res.render('articles/show', {article:article})
//   })

// Using slug
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( {slug: req.params.slug} )
    if(article == null) res.redirect('/articles')
    res.render('articles/show', {article:article})
  })

// Get all Articles
router.get('/', async (req, res) => {
    const article = await Article.find().sort({
        createdAt:"desc"
    })
    res.render('articles/lists', {article:article})
  })

router.post('/', async (req, res , next) => {
    req.article =  new Article()
    next()
}, saveArticleAndRedirect('new') )

router.put('/:id', async (req, res , next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit') )

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')

})

function saveArticleAndRedirect(path) {
    return async (req, res) => {

   let article = req.article
   article.title = req.body.title
   article.description = req.body.description
   article.markdown = req.body.markdown

    
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
        console.log('Article saved successfully')    
        } catch (e){
        res.render(`articles/${path}`, {article: article})
        }

    }

}

module.exports = router ;