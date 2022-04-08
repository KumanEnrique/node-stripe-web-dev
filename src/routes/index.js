const dotenv = require('dotenv').config()
const {Router} = require('express')
const router = Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [1,{priceInCents:3000,name:'Learn react today'}],
    [2,{priceInCents:2000,name:'Learn css today'}],
])
router.post('/create-checkout-session',async (req,res)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items: req.body.items.map(item =>{
                const storeItem = storeItems.get(item.id)
                return {
                    price_data:{
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount:storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url: session.url})
    } catch (e) {
        res.status(500).json({error:e.message})
    }
    // res.send('hola stripe')
})
router.get('/stripe',(req,res)=>{
    res.send('hola stripe')
})

module.exports = router