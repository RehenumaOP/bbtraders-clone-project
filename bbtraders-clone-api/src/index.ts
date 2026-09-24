import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import categoriesRouter from './routes/categories'
import productsRouter from './routes/products'
import ordersRouter from './routes/orders'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

app.get('/', (req, res) => {
  res.send('BB Traders Clone API is running')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})