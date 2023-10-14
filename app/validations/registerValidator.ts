import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class registerValidator {
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(15),
    ]),  
    
  })
  
 public messages = {
    'email.email': 'Please enter a valid email address.',
    'email.required': 'The email field is mandatory.',
    'email.unique': 'This email address is already registered.',
    'password.required': 'Password is mandatory.',
    'password.minLength': 'The password must be at least 8 characters long.',
    'password.maxLength': 'The password must not be longer than 15 characters.',
  }
}

