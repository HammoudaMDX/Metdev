const router = require('express').Router()
const { param, body } = require('express-validator');
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const boardController = require('../controllers/board')

router.post(
  '/',
  tokenHandler.verifyToken,
  boardController.create
)

router.get(
  '/',
  tokenHandler.verifyToken,
  boardController.getAll
)

router.put(
  '/',
  tokenHandler.verifyToken,
  boardController.updatePosition
)

router.get(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.getFavourites
)

router.put(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.updateFavouritePosition
)

router.get(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.getOne
)

router.put(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.update
)

router.delete(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.delete
)


router.post(
  '/:boardId/users',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      throw new Error('Invalid ID');
    }
    return true;
  }),
  body('username').notEmpty().withMessage('Username is required'),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.addUserToBoard
);

router.delete(
  '/:boardId/users/:userId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      throw new Error('Invalid board ID');
    }
    return true;
  }),
  param('userId').custom((value) => {
    if (!validation.isObjectId(value)) {
      throw new Error('Invalid user ID');
    }
    return true;
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.removeUserFromBoard
);




module.exports = router