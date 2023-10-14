import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import registerAddress from 'App/utils/RegisterAddres'
import registerTelephone from 'App/utils/RegisterTelephone'
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
    const data = await Client.query().select(['name','id' ]).orderBy('id', 'desc') 
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

  public async update({ request, response, params }: HttpContextContract) {
    const{address, telephone} = request.body()   
    try {
      await request.validate(ClientUpdateValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
    if (address) {
      await registerAddress(address, params.id)
    }
  if (telephone && telephone.number) { 
      await registerTelephone(telephone.number, params.id);
    }
  
  try {   
      const {name, cpf} = request.body()
      const client = await Client.findOrFail(params.id)         
      client.merge({name, cpf})
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
