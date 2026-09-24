import { Router, Request, Response } from 'express'
import { supabase } from '../supabaseClient'
import { requireAdmin } from '../middleware/requireAdmin'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.post('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, image_url, category_id } = req.body
    if (!name || price == null) {
      return res.status(400).json({ error: 'name and price are required' })
    }
    const { data, error } = await supabase
      .from('products')
      .insert({ name, description, price, stock, image_url, category_id })
      .select()
    if (error) throw error
    res.status(201).json(data[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, price, stock, image_url, category_id } = req.body
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price, stock, image_url, category_id })
      .eq('id', id)
      .select()
    if (error) throw error
    res.json(data[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

router.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

export default router