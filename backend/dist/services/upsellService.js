"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpsellSuggestions = getUpsellSuggestions;
function getUpsellSuggestions(cartItems) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:5005/upsell", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartItems }),
            });
            if (!res.ok)
                throw new Error("Upsell service failed");
            const data = (yield res.json());
            if (Array.isArray(data)) {
                return data;
            }
            else {
                console.error("Upsell response not array", data);
                return [];
            }
        }
        catch (err) {
            console.error("Error calling LLM upsell service:", err);
            return [];
        }
    });
}
