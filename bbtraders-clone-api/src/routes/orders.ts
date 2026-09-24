import { Router, Request, Response } from 'express'
import { supabase } from '../supabaseClient'
import { requireAdmin } from '../middleware/requireAdmin'

const router = Router()

router.get('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

router.put('/:id/status', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    if (!status) {
      return res.status(400).json({ error: 'status is required' })
    }
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
    if (error) throw error
    res.json(data[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

export default router