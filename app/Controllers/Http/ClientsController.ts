import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const data = await Client.create(body)
      return response.status(201).json({
        message: 'Client successfully registered',
        data
      })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
    
  }


  public async index({  response }: HttpContextContract) {
   try {
    const data = await Client.all()
    return data
   }catch (error) {
    return response.status(400).json({ message: error.message })
   }
  }

  // public async show({ request, response }: HttpContextContract) {
  //   return `Exibindo cliente ${params.id}`
  // }


  // public async update({ request, response }: HttpContextContract) {
  //   return 'Atualizando cliente'
  // }

  // public async destroy({ request, response }: HttpContextContract) {
  //   return 'Deletando cliente'
  // }
}
