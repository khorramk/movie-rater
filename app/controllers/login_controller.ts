import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class LoginController {
  async store({ request, auth, response }: HttpContext) {
    // logger.log('info', 'hello')
    // /**
    //  * Step 1: Get credentials from request body
    //  */
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    // logger.info({ email: email, password: password }, 'info')
    // /**
    //  * Step 2: Verify credentials
    //  */
    let user: User = await User.verifyCredentials(email, password)

    // let user: User = await User.create({
    //   fullName: fullName,
    //   email: email,
    //   password: password,
    // })
    // /**
    //  * Step 3: Login user
    //  */
    await auth.use('web').login(user)

    // /**
    //  * Step 4: Send them to a protected route
    //  */
    response.redirect().toRoute('dashboard')
  }
}
