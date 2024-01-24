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
const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/registers_controller')

router.get('/login', ({ view }) => {
  return view.render('pages/login')
})

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
