import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class SaleValidator {
  public schema = schema.create({
    client_id : schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    product_id : schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    quantity : schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    unit_price : schema.number([
      rules.required(),
      rules.unsigned(),
    ]),    
  })
  
 public messages = {
    'client_id.required': 'Client ID is mandatory.',
    'client_id.unsigned': 'Client ID must be a positive number.',
    'product_id.required': 'Product ID is mandatory.',
    'product_id.unsigned': 'Product ID must be a positive number.',
    'quantity.required': 'Quantity is mandatory.',
    'quantity.unsigned': 'Quantity must be a positive number.',
    'unit_price.required': 'Unit price is mandatory.',
    'unit_price.unsigned': 'Unit price must be a positive number.',
  }
}

