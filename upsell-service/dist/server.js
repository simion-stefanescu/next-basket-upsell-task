"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
const products_json_1 = __importDefault(require("../src/products.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
app.post("/upsell", async (req, res) => {
  const cartItems = req.body.cartItems || [];
  const availableNames = products_json_1.default
    .filter((p) => p.stock > 0)
    .map((p) => p.name)
    .join(", ");
  const cartSummary = cartItems
    .map((i) => {
      const product = products_json_1.default.find(
        (p) => p.id === i.product_id,
      );
      return product
        ? `${i.quantity}x ${product.name}`
        : `${i.quantity}x Unknown`;
    })
    .join(", ");
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
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });
    let text = response.choices[0].message?.content?.trim() ?? "[]";
    // Remove markdown code block if present
    if (text.startsWith("```json")) {
      text = text
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();
    } else if (text.startsWith("```")) {
      text = text
        .replace(/^```\s*/i, "")
        .replace(/```$/, "")
        .trim();
    }
    console.log("Raw response", text);
    res.json(JSON.parse(text));
  } catch (err) {
    console.error("LLM error", err);
    res.json([]);
  }
});
const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Running on port ${port}`));
