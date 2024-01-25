import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieReview extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare movie_name: string | null

  @column()
  declare review: string | null

  @column()
  declare movie_scene_path_name: string | null

  @column()
  declare userID: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
