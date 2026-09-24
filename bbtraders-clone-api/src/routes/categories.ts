import { Router, Request, Response } from 'express'
import { supabase } from '../supabaseClient'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('categories').select('*')
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }
    const { data, error } = await supabase.from('categories').insert({ name }).select()
    if (error) throw error
    res.status(201).json(data[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create category' })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw error
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete category' })
  }
})

export default router