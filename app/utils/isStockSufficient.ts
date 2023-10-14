import Product from "App/Models/Product"

export default async function isStockSufficient(quantity: number, product_id: number)  {
  const productInserted = await Product.find(product_id)
if (productInserted && productInserted.stock >= quantity)  {  
    return true
  }   
  return false 
}

