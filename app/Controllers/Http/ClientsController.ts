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
    const data = await Client.query().preload('addresses').preload('telephones').orderBy('id', 'desc') 
    if (data.length === 0) {
      return response.status(400).json({ message: 'There are no unregistered customers' })
    }
    return data
  }catch (error) {
    return response.status(400).json({ message: error.message })
  }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()      
      const client = await Client.query().preload('addresses').preload('telephones').preload('sales').where('id', id)
      if (client.length === 0) {
        return response.status(400).json({ message: 'Client not found' })
      }
      return client
    } catch (error) {
      return response.status(400).json({ message: 'Client not found' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const{addresses, telephones} = request.body()
    if (addresses) {
      //chamar a função de cadastro na adress
    }
    if (telephones) {
      //chamar a função de cadastro na telephone
    }
      try {
      await request.validate(ClientUpdateValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
    
    try {
      const { id } = request.params()
      const body = request.body()
      const client = await Client.findOrFail(id)      
      client.merge(body)
      await client.save()
      return response.status(200).json({
        message: 'Client successfully updated',
        client
      })
    } catch (error) {
      return response.status(400).json({ message: 'Client not found' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
  
    try {
      const { id } = request.params()
      const client = await Client.findOrFail(id)      
      await client.delete()
      return response.status(200).json({
        message: 'Client successfully deleted',
        client
      })
    } catch (error) {
      return response.status(400).json({ message: 'Client not found' })
    }
  }
}
