'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service')

router.get('/', controller.get)
router.get('/:slug', controller.getBySlug)
router.get('/admin/:id', authService.authorize, controller.getById)
router.get('/tags/:tag', authService.authorize, controller.getByTag)
router.post('/', authService.isAdmin, controller.post)
router.put('/admin/:id', authService.isAdmin, controller.put)
router.delete('/admin/:id', authService.isAdmin, controller.delete)

module.exports = router
