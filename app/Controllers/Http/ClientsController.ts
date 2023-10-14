import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import ClientUpdateValidator from 'App/validations/clientUpdateValidator'
import ClientValidator from 'App/validations/clientValidator'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    try {
      await request.validate(ClientValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

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
    const data = await Client.query().preload('addresses').preload('telephones').preload('user').preload('sales').orderBy('id', 'desc') 
    
    return data
  }catch (error) {
    return response.status(400).json({ message: error.message })
  }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()      
      const client = await Client.query().preload('addresses').preload('telephones').preload('user').preload('sales').where('id', id)
      return client
    } catch (error) {
      return response.status(400).json({ message: 'Client not found' })
    }
  }

  public async update({ request, response }: HttpContextContract) {

      try {
      await request.validate(ClientUpdateValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
    
    try {
      const { id } = request.params()
      const body = request.body()
      const data = await Client.findOrFail(id)
      data.merge(body)
      await data.save()
      return response.status(200).json({
        message: 'Client successfully updated',
        data
      })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
  
    try {
      const { id } = request.params()
      const data = await Client.findOrFail(id)
      await data.delete()
      return response.status(200).json({
        message: 'Client successfully deleted',
        data
      })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}
