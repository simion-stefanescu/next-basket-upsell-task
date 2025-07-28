export async function getUpsellSuggestions(cartItems: any[]): Promise<any[]> {
  try {
    const res = await fetch("http://localhost:5005/upsell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });
    if (!res.ok) throw new Error("Upsell service failed");
    const data = (await res.json()) as any[];
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Upsell response not array", data);
      return [];
    }
  } catch (err) {
    console.error("Error calling LLM upsell service:", err);
    return [];
  }
}
