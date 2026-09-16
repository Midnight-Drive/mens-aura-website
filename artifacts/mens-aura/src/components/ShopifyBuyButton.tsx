import React, { useEffect, useRef } from 'react';
import { SHOPIFY_CONFIG, redirectToShopifyCheckout } from '@/lib/shopify';
import { ShoppingBag, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

interface ShopifyBuyButtonProps {
  elementId?: string;
  buttonText?: string;
  className?: string;
}

export function ShopifyBuyButton({
  elementId = 'product-component-1789550414545',
  buttonText = 'BUY NOW — PKR 2,499',
  className = '',
}: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    function initShopifyBuy() {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;

      const node = document.getElementById(elementId);
      if (!node) return;

      // Clear existing content if any
      node.innerHTML = '';

      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_CONFIG.domain,
        storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        ui.createComponent('product', {
          id: SHOPIFY_CONFIG.productId,
          node: node,
          moneyFormat: 'Rs.%7B%7Bamount%7D%7D',
          options: {
            product: {
              buttonDestination: 'checkout',
              contents: {
                img: false,
                title: false,
                price: false,
                button: true,
                quantity: false,
              },
              text: {
                button: buttonText,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                  'text-align': 'center',
                  'width': '100%',
                },
                button: {
                  'font-family': 'Cinzel, Montserrat, system-ui, -apple-system, sans-serif',
                  'font-size': '13px',
                  'font-weight': '700',
                  'letter-spacing': '0.15em',
                  'text-transform': 'uppercase',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                  'padding-left': '32px',
                  'padding-right': '32px',
                  'color': '#070b12',
                  'background-color': '#c5a059',
                  'border-radius': '12px',
                  'box-shadow': '0 0 25px rgba(197, 160, 89, 0.45), 0 4px 15px rgba(0, 0, 0, 0.5)',
                  'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  'width': '100%',
                  'cursor': 'pointer',
                  ':hover': {
                    'background-color': '#e5c583',
                    'box-shadow': '0 0 35px rgba(229, 197, 131, 0.75), 0 6px 20px rgba(0, 0, 0, 0.6)',
                    'transform': 'translateY(-1px) scale(1.015)',
                  },
                  ':focus': {
                    'background-color': '#e5c583',
                    'outline': 'none',
                  },
                  ':active': {
                    'transform': 'translateY(1px)',
                  },
                },
              },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': {
                    'margin-left': '0px',
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            cart: {
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
            },
            toggle: {},
          },
        });
      });
      initializedRef.current = true;
    }

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      initShopifyBuy();
    } else {
      let script = document.querySelector(`script[src="${scriptURL}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        document.head.appendChild(script);
      }
      script.addEventListener('load', initShopifyBuy);
    }
  }, [elementId, buttonText]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Target element for Shopify Buy Button SDK */}
      <div id={elementId} className="w-full flex justify-center" />

      {/* Fallback button in case JS SDK is loading or disabled */}
      <noscript>
        <button
          type="button"
          onClick={() => redirectToShopifyCheckout(1)}
          className="gold-glow-button group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-4 font-mono-ui text-xs font-bold uppercase tracking-[0.2em] text-[#0b0f17] shadow-2xl transition-all"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{buttonText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </noscript>
    </div>
  );
}

