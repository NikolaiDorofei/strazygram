// orderSchema.ts — схема валидации заказа (пример для расширения)
import Joi from "joi";

export const orderSchema = Joi.object({
  customer: Joi.object({
    telegram_user_id: Joi.string().required(),
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required()
  }).required(),
  city: Joi.string().required(),
  address: Joi.string().allow('', null),
  pickup_point_id: Joi.any().allow(null, ''),
  comment: Joi.string().allow('', null),
  delivery_type: Joi.string().valid('courier', 'pickup', 'self').required(),
  payment_type: Joi.string().valid('online_yookassa', 'online_stripe', 'cod').required(),
  items: Joi.array().items(
    Joi.object({
      product_id: Joi.number().required(),
      quantity: Joi.number().min(1).required()
    })
  ).min(1).required()
});
