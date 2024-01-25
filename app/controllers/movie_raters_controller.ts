import MovieReview from '#models/movie_review'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class MovieRatersController {
  async store({ request, response, auth }: HttpContext) {
    try {
      const user: User = await auth.authenticate()

      const movieScene = request.file('movie_scene', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })

      if (!movieScene) {
        return response.badRequest(
          'make sure file is under 2mb and with these filename: jpg, png, jpeg'
        )
      }

      if (!user) {
        return response.redirect().toRoute('register')
      }

      await MovieReview.create({
        movie_name: request.input('movie_name'),
        review: request.input('movie_review'),
        movie_scene_path_name: movieScene?.clientName,
        userID: user.id,
      })

      const filename = movieScene.clientName.split('.')[0];

      await movieScene?.move(app.makePath('uploads'), {
        name: `${filename}.${movieScene.extname}`,
      })
    } catch (error) {
      throw error
    }
  }
}
