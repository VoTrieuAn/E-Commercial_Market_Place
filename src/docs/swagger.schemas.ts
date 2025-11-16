/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         avatar:
 *           type: string
 *           example: https://example.com/avatar.jpg
 *         phone:
 *           type: string
 *           example: +84123456789
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: iPhone 15 Pro Max
 *         slug:
 *           type: string
 *           example: iphone-15-pro-max
 *         description:
 *           type: string
 *           example: Latest iPhone model with advanced features
 *         price:
 *           type: number
 *           example: 29990000
 *         discount:
 *           type: number
 *           example: 10
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         stock:
 *           type: number
 *           example: 100
 *         rating:
 *           type: number
 *           example: 4.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           example: Smartphones
 *         slug:
 *           type: string
 *           example: smartphones
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         parent:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         quantity:
 *           type: number
 *           example: 2
 *         price:
 *           type: number
 *           example: 29990000
 *
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalAmount:
 *           type: number
 *           example: 59980000
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           example: pending
 *         shippingAddress:
 *           type: object
 *         paymentMethod:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Article:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           example: Top 10 smartphones in 2024
 *         slug:
 *           type: string
 *         content:
 *           type: string
 *         thumbnail:
 *           type: string
 *         author:
 *           type: string
 *         category:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         views:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Voucher:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         code:
 *           type: string
 *           example: SUMMER2024
 *         description:
 *           type: string
 *         discountType:
 *           type: string
 *           enum: [percentage, fixed]
 *         discountValue:
 *           type: number
 *         minOrderValue:
 *           type: number
 *         maxDiscount:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         usageLimit:
 *           type: number
 *         usedCount:
 *           type: number
 *         isActive:
 *           type: boolean
 *
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         product:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserAddress:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         ward:
 *           type: string
 *         district:
 *           type: string
 *         province:
 *           type: string
 *         isDefault:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *           example: 1
 *         limit:
 *           type: number
 *           example: 10
 *         totalPages:
 *           type: number
 *           example: 5
 *         totalItems:
 *           type: number
 *           example: 50
 */

// This file contains schema definitions for Swagger documentation
export {};
