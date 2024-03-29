/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const MovieRatersController = () => import('#controllers/movie_raters_controller')
const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/registers_controller')
router.get('/login', ({ view }) => {
  return view.render('pages/login')
})

router.post('review-movie', [MovieRatersController, 'store']).as('review')

router.get('/', ({ view }) => {
  return view.render('pages/register')
})

router.post('register', [RegisterController, 'store']).as('register')
router.post('login', [LoginController, 'store']).as('login')

router
  .get('dashboard', ({ view }) => {
    return view.render('pages/dashboard')
  })
  .as('dashboard')
  .use(middleware.auth())

router
  .get('review-submittted', ({ view }) => {
    return view.render('pages/review-submitted')
  })
  .as('upload-successfull')
  .use(middleware.auth())
