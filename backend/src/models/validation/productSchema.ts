// productSchema.ts — схема валидации товаров через Joi
import Joi from "joi";

export const productSchema = Joi.object({
  type: Joi.string().required(),
  categoryId: Joi.number().required(),
  name: Joi.string().required(),
  vendorCode: Joi.string(),
  description: Joi.string().allow(null, ''),
  material: Joi.string().required(),
  color: Joi.string().required(),
  size: Joi.string().required(),
  shape: Joi.string().allow(null, ''),
  price: Joi.number().required(),
  currency: Joi.string().default('RUB'),
  inStock: Joi.number().min(0).default(0),
  packageInfo: Joi.string().allow(null, ''),
  images: Joi.array().items(Joi.string().uri()),
  flags: Joi.object().default({})
});
