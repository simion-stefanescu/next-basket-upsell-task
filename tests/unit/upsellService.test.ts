import { getUpsellSuggestions } from '../../backend/src/services/upsellService';

describe('getUpsellSuggestions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns suggestions when response is a valid array', async () => {
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['Item 1', 'Item 2']),
      })
    );
    const result = await getUpsellSuggestions([{ id: 1 }]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toBe('Item 1');
  });

  it('returns empty array if response is not ok', async () => {
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      })
    );
    const result = await getUpsellSuggestions([{ id: 1 }]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('returns empty array if response is not an array', async () => {
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ foo: 'bar' }),
      })
    );
    const result = await getUpsellSuggestions([{ id: 1 }]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('returns empty array if fetch throws error', async () => {
    (global as any).fetch = jest.fn(() => {
      throw new Error('Network error');
    });
    const result = await getUpsellSuggestions([{ id: 1 }]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('calls fetch with correct URL and body', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['foo']),
      })
    );
    (global as any).fetch = mockFetch;
    const items = [{ id: 123, qty: 2 }];
    await getUpsellSuggestions(items);
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:5005/upsell",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: items }),
      })
    );
  });
});
