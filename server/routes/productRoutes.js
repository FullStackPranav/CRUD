
import express from 'express'
import { addProduct, deleteProduct, getAllProducts } from '../controller/ProductController.js'

const router=express.Router()

router.post('/addProduct',addProduct)
router.get('/getproduct',getAllProducts)
router.delete('/delete/:id',deleteProduct)
export default router