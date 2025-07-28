import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  OpenAI from 'openai';
import products from '../../backend/src/db/products.json';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

app.post('/upsell', async(req, res)=>{
    const cartItems = req.body.cartItems || [];
    
    
  

    const availableNames = products.filter(p => p.stock > 0).map(p => p.name).join(', ');
    const cartSummary = cartItems.map((i:{ product_id: string, quantity: number }) => {
        const product = products.find(p => p.id === i.product_id);
        return product ? `${i.quantity}x ${product.name}` : `${i.quantity}x Unknown`;
    }).join(', ');
   //now the code works as it should , next up is the d

const prompt = `
Given the following items in the shopping cart: ${cartSummary}.
The available products in this shop are: ${availableNames}.
Suggest up to 3 complementary products (by product name, not ID) for the cart, ONLY from the available products above (no new or made-up names). For each, add a short explanation and a confidence (0-1).
Respond strictly as a JSON array of objects with fields: product_name, reason, confidence.
`;


    console.log("Upsell Service prompt", prompt);

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            temperature: 0.7,
            max_tokens: 300,
        });
        let text = response.choices[0].message?.content?.trim() ?? "[]";

        
        // Remove markdown code block if present
        if (text.startsWith('```json')) {
            text = text.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
        } else if (text.startsWith('```')) {
            text = text.replace(/^```\s*/i, '').replace(/```$/, '').trim();
        }
  
        console.log("Raw response", text);

        res.json(JSON.parse(text));
    } catch (err){
        console.error("LLM error", err);
        res.json([]);
    }
});

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Running on port ${port}`));