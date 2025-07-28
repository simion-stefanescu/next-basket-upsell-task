import React from "react";

interface UpsellProps {
  upsell: any[];
}

const Upsell: React.FC<UpsellProps> = ({ upsell }) => (
  <div>
    <h3>Upsell Suggestions</h3>
    {upsell && upsell.length > 0 ? (
      <ul>
        {upsell.map((item, idx) => (
          <li key={idx}>
            {item.product_id}: {item.reason} (Confidence: {item.confidence})
          </li>
        ))}
      </ul>
    ) : (
      <p>No suggestions at this time.</p>
    )}
  </div>
);

export default Upsell;
