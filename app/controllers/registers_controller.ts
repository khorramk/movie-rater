import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import UnAuthorizedException from '#exceptions/un_authorized_exception'

export default class RegisterController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    try {
      let user: User = await User.firstOrCreate({
        fullName: fullName,
        email: email,
        password: password,
      })

      await auth.use('web').login(user)

      response.redirect('/dashboard')
    } catch (error) {
      throw new UnAuthorizedException('Login if you can', {
        status: 403,
        code: 'E_UNAUTHORIZED',
      })
    }
  }
}
