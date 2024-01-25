import MovieReview from '#models/movie_review'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class MovieRatersController {
  async store({ request }: HttpContext) {
    try {
      const userId: number | undefined = HttpContext.get()?.auth.user?.id

      const movieScene = request.file('movie_scene', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })

      await MovieReview.firstOrCreate({
        movie_name: request.input('movie_name'),
        review: request.input('movie_review'),
        movie_scene_path_name: movieScene?.clientName,
        userID: userId,
      })

      await movieScene?.move(app.makePath('uploads'), {
        name: `${cuid()}.${movieScene.extname}`,
      })
    } catch (error) {
      throw error
    }
  }
}
