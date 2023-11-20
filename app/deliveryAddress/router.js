const { police_check } = require('../../middlewares');

const router = require('express').Router();

router.post('/delivery-addresses',
    police_check('create', 'DeliveryAddress'),
    deliveryAddressController.store
)
router.put('/delivery-addresses/:id',
    police_check('update', 'DeliveryAddress'),
    deliveryAddressController.update);
router.delete('/delivery-addresses/:id',
    police_check('delete', 'DeliveryAddress'),
    deliveryAddressController.destroy);

module.exports = {
    router
}