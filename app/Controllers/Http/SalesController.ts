import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import isStockSufficient from 'App/utils/isStockSufficient'
import SaleValidator from 'App/validations/saleValidator'
import SaleShowValidator from 'App/validations/salesShowValidator'

export default class SalesController {

  public async store ( {request, response}: HttpContextContract) {
    const body = request.body()
     const { client_id, product_id, quantity} = body
    try {
      await request.validate(SaleValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
    const stockSufficient = await isStockSufficient(product_id, quantity)
    if (!stockSufficient) {
      return response.status(400).json({message: 'Insufficient stock'})
    }    
    
    const product = await Product.findBy('id', product_id)
    product &&  await Product.query().where('id', product_id).update({stock: product?.stock - quantity})
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
      return response.status(400).json({message: 'Product or client not found'})
    }     
  }
  
  public async index ({response}: HttpContextContract) {
    try {
      const data = await Sale.query().preload('client').preload('product').orderBy('created_at', 'asc')    
      if (data.length === 0) {
        throw new Error('There are no registered sales')
      } 
      return data
    } catch (error) {
      return response.status(400).json({message: 'Sales not found'})
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
 [year, month]).preload('client').preload('product').orderBy('created_at', 'asc');
    if (data.length === 0) {
      return response.status(400).json({ message: 'There are no sales in this period' });
    }    
    return data;
  } catch (error) {
    return response.status(400).json({ message: 'you need type sales/filter?year=?&month=?' });
  }
}
}
