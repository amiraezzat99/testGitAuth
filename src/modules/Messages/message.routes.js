import { Router } from 'express'

const router = Router()
import * as mc from './message.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'

router.post('/', asyncHandler(mc.sendMessage))
router.get('/:_id', asyncHandler(mc.getUserMessages))
router.delete('/:msgId/:loggedInUserId', asyncHandler(mc.deleteMessage))
export default router
