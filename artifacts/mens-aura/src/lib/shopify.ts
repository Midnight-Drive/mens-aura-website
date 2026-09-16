/**
 * Shopify Storefront Client Configuration
 * Store: Men's Aura (xj2wh7-ji.myshopify.com)
 * Product: Midnight Drive (ID: 10716897706286, Variant: 52658897912110)
 */

export const SHOPIFY_CONFIG = {
  domain: 'xj2wh7-ji.myshopify.com',
  storefrontAccessToken: '34135d059170a3aac9fefa1463d03d17',
  productId: '10716897706286',
  variantId: '52658897912110',
  variantGid: 'gid://shopify/ProductVariant/52658897912110',
  productGid: 'gid://shopify/Product/10716897706286',
  defaultPrice: 2499,
  currency: 'PKR',
};

/**
 * Direct checkout redirect URL generator
 */
export function getDirectCheckoutUrl(quantity = 1): string {
  return `https://${SHOPIFY_CONFIG.domain}/cart/${SHOPIFY_CONFIG.variantId}:${quantity}?channel=buy_button`;
}

/**
 * Creates a Shopify cart via Storefront API and redirects directly to Checkout
 */
export async function redirectToShopifyCheckout(quantity = 1): Promise<void> {
  const fallbackUrl = getDirectCheckoutUrl(quantity);

  try {
    const query = `
      mutation CreateCart($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      lines: [
        {
          merchandiseId: SHOPIFY_CONFIG.variantGid,
          quantity: quantity,
        },
      ],
    };

    const response = await fetch(`https://${SHOPIFY_CONFIG.domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
  } catch (error) {
    console.warn('Storefront API error, falling back to direct cart checkout URL:', error);
  }

  // Fallback to direct Shopify cart checkout redirect
  window.location.href = fallbackUrl;
}
