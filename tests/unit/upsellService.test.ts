// tests/unit/upsellService.test.ts
import { getUpsellSuggestions } from "../../backend/src/services/upsellService";

describe("Upsell Service Unit Tests", () => {
  it("should get upsell suggestions (mocked)", async () => {
    const cart = [{ id: 1, name: "Bag", price: 50 }];
    // Mock OpenAI or whatever logic here
    const suggestion = await getUpsellSuggestions(cart);
    expect(typeof suggestion).toBe("string");
    expect(suggestion.length).toBeGreaterThan(0);
  });
});
