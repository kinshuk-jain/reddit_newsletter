const router = require('express').Router()
const ROUTES = require('../constants/routes')
const { bodyValidator } = require('../middlewares/body-validator')

const serviceMetadataHandler = require('./service-metadata')

const createUserHandler = require('./users/create')
const updateUserHandler = require('./users/update')
const listUserHandler = require('./users/list')

const addFavoriteHandler = require('./favorites/create')
const updateFavoriteHandler = require('./favorites/update')

const subscribeNewsletterHandler = require('./subscription/subscribe')
const unsubscribeNewsletterHandler = require('./subscription/unsubscribe')

router.get(ROUTES.SERVICE_METADATA, serviceMetadataHandler)

router.post(
  ROUTES.CREATE_USER,
  bodyValidator('src/schemas/users/create-user/request.js'),
  createUserHandler
)

router.get(ROUTES.GET_USER_LIST, listUserHandler)

router.put(
  ROUTES.UPDATE_USER,
  bodyValidator('src/schemas/users/update-user/request.js'),
  updateUserHandler
)

router.post(
  ROUTES.ADD_FAVORITE,
  bodyValidator('src/schemas/favorites/add-favorites/request.js'),
  addFavoriteHandler
)

router.put(
  ROUTES.UPDATE_FAVORITE,
  bodyValidator('src/schemas/favorites/update-favorites/request.js'),
  updateFavoriteHandler
)

router.put(ROUTES.SUBSCRIBE_NEWSLETTER, subscribeNewsletterHandler)

router.put(ROUTES.UNSUBSCRIBE_NEWSLETTER, unsubscribeNewsletterHandler)

module.exports = router
