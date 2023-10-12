import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sale from 'App/Models/Sale'
import SaleValidator from 'App/validations/saleValidator'

export default class SalesController {
  public async store ( {request, response}: HttpContextContract) {
    const body = request.body()
     try {
      await request.validate(SaleValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

    try {
      const sale = await Sale.create(body)
      return response.status(201).json(sale)
    } catch (error) {
      return response.status(400).json({message: error.message})
    }     
  }
  
  public async index ({response}: HttpContextContract) {
    try {
      const data = await Sale.query().preload('client').preload('product').orderBy('created_at', 'desc')     
      return data
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async show({ request, response }: HttpContextContract) {
  try {
    const { year, month } = request.qs(); 
    const data = await Sale.query()
      .whereRaw(`YEAR(created_at) = ? AND MONTH(created_at) = ?`,
 [year, month]).preload('client').preload('product');
    return data;
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}
}
