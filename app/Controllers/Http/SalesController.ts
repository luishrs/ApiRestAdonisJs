import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import SaleValidator from 'App/validations/saleValidator'
import SaleShowValidator from 'App/validations/salesShowValidator'

export default class SalesController {
  public async store ( {request, response}: HttpContextContract) {
    const body = request.body()
    const { client_id, product_id, quantity,} = body
    try {
      await request.validate(SaleValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

    const product = await Product.findBy('id', product_id)
    const sale = {
      client_id,
      product_id,
      quantity,
      unit_price: Number(product?.price),
    }

    try {
      const saleregistred = await Sale.create(sale)
      return response.status(201).json(saleregistred)
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
    const { year, month } = request.qs(); 

     try {
      await request.validate(SaleShowValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
  try {
    const data = await Sale.query()
      .whereRaw(`YEAR(created_at) = ? AND MONTH(created_at) = ?`,
 [year, month]).preload('client').preload('product');
    if (data.length === 0) {
      return response.status(400).json({ message: 'There are no sales in this period' });
    }    
    return data;
  } catch (error) {
    return response.status(400).json({ message: 'you need type sales/filter?year=?&month=?' });
  }
}
}
