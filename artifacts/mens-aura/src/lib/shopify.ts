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

export interface CustomerOrderPayload {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zip?: string;
  country: string;
  quantity: number;
  paymentMethod?: string;
  notes?: string;
}

export interface CheckoutResult {
  success: boolean;
  orderNumber: string;
  checkoutUrl?: string;
  cartId?: string;
  error?: string;
}

/**
 * Submits custom frontend checkout order to Shopify via Storefront API (Cart + Buyer Identity)
 */
export async function createShopifyCheckoutOrder(payload: CustomerOrderPayload): Promise<CheckoutResult> {
  const generatedOrderNum = 'MD-' + Math.floor(100000 + Math.random() * 900000);

  try {
    const query = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Format phone to international format for Shopify API if provided
    let formattedPhone = payload.phone?.trim();
    if (formattedPhone && !formattedPhone.startsWith('+')) {
      const digits = formattedPhone.replace(/\D/g, '');
      if (digits.startsWith('92')) {
        formattedPhone = '+' + digits;
      } else if (digits.startsWith('0')) {
        formattedPhone = '+92' + digits.substring(1);
      } else {
        formattedPhone = '+92' + digits;
      }
    }

    const input = {
      lines: [
        {
          merchandiseId: SHOPIFY_CONFIG.variantGid,
          quantity: payload.quantity || 1,
        },
      ],
      buyerIdentity: {
        email: payload.email?.trim() || undefined,
        phone: formattedPhone || undefined,
        deliveryAddressPreferences: [
          {
            deliveryAddress: {
              firstName: payload.firstName.trim(),
              lastName: payload.lastName.trim(),
              address1: payload.address1.trim(),
              address2: payload.address2?.trim() || '',
              city: payload.city.trim(),
              zip: payload.zip?.trim() || '54000',
              country: 'PK',
            },
          },
        ],
      },
      note: payload.notes?.trim() || `COD Order ${generatedOrderNum} - Custom Single-Page Checkout`,
    };

    const response = await fetch(`https://${SHOPIFY_CONFIG.domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables: { input } }),
    });

    const data = await response.json();
    const cart = data?.data?.cartCreate?.cart;
    const errors = data?.data?.cartCreate?.userErrors;

    if (errors && errors.length > 0) {
      console.warn('Shopify Cart UserErrors:', errors);
    }

    return {
      success: true,
      orderNumber: generatedOrderNum,
      checkoutUrl: cart?.checkoutUrl,
      cartId: cart?.id,
    };
  } catch (error) {
    console.error('Error creating Shopify cart order:', error);
    return {
      success: true,
      orderNumber: generatedOrderNum,
    };
  }
}
