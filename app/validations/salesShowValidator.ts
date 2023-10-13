import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class SaleShowValidator {
  public schema = schema.create({
    year: schema.number.optional([
    rules.unsigned(),
    rules.required(),
    rules.range(2000, 3000) 
  ]),
  month: schema.number.optional([
    rules.unsigned(),
    rules.required(),
    rules.range(1, 12),
  ]),
  })
  
 public messages = {
    'year.unsigned': 'Year must be a positive number.',
    'year.range': 'Year must be between 2000 and 3000.',
    'year.required': 'Year is mandatory.',
    'month.unsigned': 'Month must be a positive number.',
    'month.range': 'Month must be between 1 and 12.',
    'month.required': 'Month is mandatory.',
  }
}

