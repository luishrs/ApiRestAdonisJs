import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class ClientUpdateValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.minLength(5),
      rules.maxLength(100),
    ]),

    cpf: schema.string({}, [
      rules.required(),
      rules.minLength(11),
      rules.maxLength(11),
      rules.unique({ 
        table: 'clients', 
        column: 'cpf',
        whereNot: { id: this.ctx.params.id } }),
    ]),    
  })

  public messages = {
    'name.required': 'Name is mandatory.',
    'name.minLength': 'The name must be at least 5 characters long.',
    'name.maxLength': 'The name must not be longer than 100 characters.',
    'cpf.required': 'CPF is mandatory.',
    'cpf.minLength': 'The CPF must be at least 11 characters long.',
    'cpf.maxLength': 'The CPF must not be longer than 11 characters.',
    'cpf.unique': 'This CPF is already registered.',    
  }
}
