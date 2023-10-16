import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class ProductValidator {
  public schema = schema.create({
   name: schema.string({trim: true},[
      rules.required()      
    ]),
    author: schema.string({trim: true},[
      rules.required(),
    ]),
    editor: schema.string({trim: true},[
      rules.required(),
    ]),
    price: schema.number([
      rules.required(),
      rules.unsigned(),
    ]), 
    stock: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),       
  })
  
 public messages = {    
    'name.required': 'Name is mandatory.',
    'author.required': 'Author is mandatory.',
    'editor.required': 'Editor is mandatory.',
    'price.required': 'Price is mandatory.',
    'price.unsigned': 'Price must be a positive number.',
    'stock.required': 'Stock is mandatory.',
    'stock.unsigned': 'Stock must be a positive number.',
  }
}

