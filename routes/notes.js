const { Router } = require('express');
const controller = require('../controllers/notes');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.get('/', auth, controller.get);
router.post('/', auth, controller.create);
router.patch('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
