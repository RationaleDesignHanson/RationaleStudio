/**
 * Zero Interactive Demo - Complete Email Dataset
 * 10 emails with full metadata from original app-demo.html
 */

import { Email } from './types';

export const sampleEmails: Email[] = [
  {
    from: 'Amazin\' Deliveries',
    initial: 'A',
    subject: 'Package Shipped - Arriving Tomorrow',
    preview: 'Your order has shipped and is arriving tomorrow by 8 PM. Track with You\'re Probably Shipped.',
    intent: 'e-commerce.shipping.notification',
    intentConfidence: 1.0,
    timeAgo: '30m ago',
    aiSummary: {
      actions: '• Track package arriving tomorrow by 8 PM',
      why: 'Your order has shipped and is on its way.',
      context: '• Order #1234567\n• Carrier: UPS\n• Expected: Tomorrow 8 PM'
    },
    suggestedActions: [
      {
        actionId: 'track_package',
        displayName: 'Track Package',
        actionType: 'IN_APP',
        isPrimary: true,
        priority: 1,
        context: {
          trackingNumber: '1Z999AA10123456784',
          carrier: 'You\'re Probably Shipped',
          url: 'https://www.ups.com/track?tracknum=1Z999AA10123456784'
        }
      },
      {
        actionId: 'view_order',
        displayName: 'View Order',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 2,
        context: {
          url: 'https://amazon.com/orders'
        }
      }
    ],
    actions: [
      { name: 'Track Package', priority: 1, isPrimary: true },
      { name: 'View Order', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'mail',
      priority: 'high',
      trackingNumber: '1Z999AA10123456784',
      carrier: 'You\'re Probably Shipped',
      estimatedDelivery: 'Tomorrow by 8 PM'
    },
    productImageUrl: 'https://picsum.photos/seed/package/400/240',
    threadCount: 3
  },
  {
    from: 'Mrs. Johnson',
    initial: 'J',
    subject: 'Field Trip Permission Form - Science Museum',
    preview: 'Emma\'s 3rd grade class is visiting the Science Museum on Oct 28. $25 fee due by Oct 24.',
    intent: 'education.permission.form',
    intentConfidence: 1.0,
    timeAgo: '2h ago',
    aiSummary: {
      actions: '• Sign permission form by Oct 24\n• Pay $25 field trip fee',
      why: 'Emma needs permission and payment for upcoming field trip.',
      context: '• Oct 28 trip to Science Museum\n• Departs 8:30 AM, returns 2:30 PM\n• Dinosaur exhibit + planetarium show'
    },
    suggestedActions: [
      {
        actionId: 'sign_form',
        displayName: 'Sign & Send Form',
        actionType: 'IN_APP',
        isPrimary: true,
        priority: 1,
        context: {
          formType: 'permission',
          dueDate: 'Oct 24',
          studentName: 'Emma Chen',
          event: 'Science Museum Field Trip'
        }
      },
      {
        actionId: 'pay_field_trip_fee',
        displayName: 'Pay $25 Fee',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 2,
        context: {
          amount: 25.00,
          paymentMethod: 'credit_card',
          recipient: 'Lincoln Elementary School'
        }
      },
      {
        actionId: 'add_field_trip_to_calendar',
        displayName: 'Add to Calendar',
        actionType: 'NATIVE_API',
        isPrimary: false,
        priority: 3,
        context: {
          title: 'Emma - Science Museum Field Trip',
          date: 'Oct 28',
          startTime: '8:30 AM',
          endTime: '2:30 PM',
          location: 'Science Museum'
        }
      }
    ],
    actions: [
      { name: 'Sign & Send', priority: 1, isPrimary: true },
      { name: 'Pay Fee', priority: 2, isPrimary: false },
      { name: 'Add to Calendar', priority: 3, isPrimary: false }
    ],
    metadata: {
      type: 'mail',
      priority: 'high',
      kidName: 'Emma Chen',
      grade: '3rd Grade',
      paymentAmount: 25.00,
      requiresSignature: true
    },
    threadCount: 5
  },
  {
    from: 'Best... Buy Now!',
    initial: 'B',
    subject: 'Sound Innovation WH-1000XM5 Headphones',
    preview: 'FLASH SALE: 30% off premium noise-cancelling headphones. Save $120 - today only!',
    intent: 'e-commerce.promotional.deal',
    intentConfidence: 0.95,
    timeAgo: '1h ago',
    aiSummary: {
      actions: '• Claim 30% off deal **today only** (saves $120)',
      why: 'Limited-time flash sale on premium noise-cancelling headphones.',
      context: '• Industry-leading noise cancellation, 30hr battery\n• LDAC audio, multi-point connectivity\n• Free shipping + 30-day returns'
    },
    suggestedActions: [
      {
        actionId: 'schedule_purchase',
        displayName: 'Claim Deal',
        actionType: 'GO_TO',
        isPrimary: true,
        priority: 1,
        context: {
          url: 'https://www.bestbuy.com/site/sony-wh-1000xm5',
          product: 'Sound Innovation WH-1000XM5',
          originalPrice: 399.99,
          salePrice: 279.99,
          savings: 120.00,
          expiresAt: 'Today 11:59 PM'
        }
      },
      {
        actionId: 'save_to_cart',
        displayName: 'Save for Later',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 2,
        context: {
          product: 'Sound Innovation WH-1000XM5',
          price: 279.99,
          merchant: 'Best... Buy Now!'
        }
      },
      {
        actionId: 'compare_prices',
        displayName: 'Compare Prices',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 3,
        context: {
          productName: 'Sound Innovation WH-1000XM5',
          merchants: ['Amazin\' Deliveries', 'Bullseye Bargains', 'Wally World']
        }
      }
    ],
    actions: [
      { name: 'Claim Deal', priority: 1, isPrimary: true },
      { name: 'Save for Later', priority: 2, isPrimary: false },
      { name: 'Compare Prices', priority: 3, isPrimary: false }
    ],
    metadata: {
      type: 'ads',
      priority: 'high',
      originalPrice: 399.99,
      salePrice: 279.99,
      discount: 30,
      urgent: true,
      expiresIn: '6 hours'
    },
    productImageUrl: 'https://picsum.photos/seed/headphones/400/240'
  },
  {
    from: 'Bullseye Bargains',
    initial: 'B',
    subject: 'Extra 20% Off - Code: SAVE20',
    preview: 'Flash sale! Extra 20% off everything with code SAVE20. Ends tonight at midnight.',
    intent: 'marketing.promo-code.offer',
    intentConfidence: 0.98,
    timeAgo: '3h ago',
    aiSummary: {
      actions: '• Copy code SAVE20 and shop by **midnight tonight**',
      why: 'Flash sale with extra 20% off already-reduced items.',
      context: '• Stack with clearance for maximum savings\n• Valid on home, clothing, electronics'
    },
    suggestedActions: [
      {
        actionId: 'copy_promo_code',
        displayName: 'Copy Code SAVE20',
        actionType: 'IN_APP',
        isPrimary: true,
        priority: 1,
        context: {
          promoCode: 'SAVE20',
          discount: 20,
          expiresAt: 'Tonight 11:59 PM',
          categories: ['home', 'clothing', 'electronics']
        }
      },
      {
        actionId: 'shop_target_now',
        displayName: 'Shop Now',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 2,
        context: {
          url: 'https://www.target.com?promo=SAVE20',
          merchant: 'Bullseye Bargains'
        }
      }
    ],
    actions: [
      { name: 'Copy Code', priority: 1, isPrimary: true },
      { name: 'Shop Now', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'ads',
      priority: 'medium',
      promoCode: 'SAVE20',
      discount: 20,
      expiresIn: 'Tonight',
      urgent: true
    },
    productImageUrl: 'https://picsum.photos/seed/target/400/240'
  },
  {
    from: 'Real Exciting Items',
    initial: 'R',
    subject: 'Complete Your Order - 3 Items Waiting',
    preview: 'Your trail runners, water bottle, and yoga mat are waiting. Cart total: $156.97',
    intent: 'e-commerce.cart.abandoned',
    intentConfidence: 0.93,
    timeAgo: '4h ago',
    aiSummary: {
      actions: '• Complete checkout for 3 items in cart',
      why: 'Your running shoes, water bottle, and yoga mat are waiting.',
      context: '• Total: $156.97'
    },
    suggestedActions: [
      {
        actionId: 'pay_invoice',
        displayName: 'Complete Checkout',
        actionType: 'GO_TO',
        isPrimary: true,
        priority: 1,
        context: {
          url: 'https://www.rei.com/cart/checkout',
          cartTotal: 156.97,
          items: [
            { name: 'Trail Running Shoes', price: 89.99 },
            { name: 'Insulated Water Bottle', price: 29.99 },
            { name: 'Yoga Mat', price: 36.99 }
          ]
        }
      },
      {
        actionId: 'view_cart',
        displayName: 'View Cart',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 2,
        context: {
          url: 'https://www.rei.com/cart',
          itemCount: 3
        }
      },
      {
        actionId: 'save_cart_for_later',
        displayName: 'Save for Later',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 3,
        context: {
          cartId: 'REI-CART-12345',
          expiresIn: '7 days'
        }
      }
    ],
    actions: [
      { name: 'Complete Cart', priority: 1, isPrimary: true },
      { name: 'View Cart', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'ads',
      priority: 'medium',
      cartTotal: 156.97,
      itemCount: 3
    },
    productImageUrl: 'https://picsum.photos/seed/rei/400/240'
  },
  {
    from: 'Art Vanguard Gallery',
    initial: 'A',
    subject: 'James Jean - Sculpture and print duo',
    preview: 'Limited edition Sun Tarot Nebula collection drops Oct 31. One week only - 500 pieces.',
    intent: 'shopping.future_sale',
    intentConfidence: 1.0,
    timeAgo: '2h ago',
    aiSummary: {
      actions: '• Schedule purchase for **October 31** launch',
      why: 'Limited edition Sun Tarot Nebula collection drops soon.',
      context: '• One-week-only release\n• Sculpture and print duo'
    },
    suggestedActions: [
      {
        actionId: 'schedule_purchase',
        displayName: 'Schedule Purchase',
        actionType: 'IN_APP',
        isPrimary: true,
        priority: 1,
        context: {
          productName: 'James Jean - Sun Tarot Nebula',
          launchDate: 'Oct 31',
          launchTime: '10:00 AM PST',
          estimatedPrice: 500,
          limitedEdition: true,
          quantity: 500
        }
      },
      {
        actionId: 'set_launch_reminder',
        displayName: 'Remind Me on Oct 31',
        actionType: 'NATIVE_API',
        isPrimary: false,
        priority: 2,
        context: {
          title: 'James Jean Art Drop',
          date: 'Oct 31',
          time: '9:45 AM',
          alertBefore: '15 minutes'
        }
      }
    ],
    actions: [
      { name: 'Buy on Oct 31', priority: 1, isPrimary: true },
      { name: 'Remind me on Oct 31', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'ads',
      priority: 'high',
      saleDate: '31 October',
      productName: 'James Jean - Sun Tarot Nebula',
      urgent: true,
      expiresIn: 'One week only'
    },
    productImageUrl: 'https://picsum.photos/seed/art/400/240'
  },
  {
    from: 'Peak Performance Corp',
    initial: 'P',
    subject: 'Invoice Due - $599.00',
    preview: 'Invoice #INV-2025-1234 is due on Oct 30. Professional services for September.',
    intent: 'billing.invoice.due',
    intentConfidence: 1.0,
    timeAgo: '6h ago',
    aiSummary: {
      actions: '• Pay $599 invoice by **Oct 30** to avoid late fee',
      why: 'Invoice for professional services is due this week.',
      context: '• Invoice #INV-2025-1234\n• Payment methods: ACH or credit card'
    },
    suggestedActions: [
      {
        actionId: 'pay_invoice',
        displayName: 'Pay Invoice',
        actionType: 'IN_APP',
        isPrimary: true,
        priority: 1,
        context: {
          invoiceId: 'INV-2025-1234',
          amount: 599.00,
          dueDate: 'Oct 30',
          paymentMethods: ['ACH', 'credit_card'],
          recipient: 'Peak Performance Corp',
          description: 'Professional Services - September 2025'
        }
      },
      {
        actionId: 'view_invoice_details',
        displayName: 'View Details',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 2,
        context: {
          url: 'https://acmecorp.com/invoices/INV-2025-1234',
          invoiceNumber: 'INV-2025-1234'
        }
      },
      {
        actionId: 'download_invoice_pdf',
        displayName: 'Download PDF',
        actionType: 'GO_TO',
        isPrimary: false,
        priority: 3,
        context: {
          url: 'https://acmecorp.com/invoices/INV-2025-1234/download',
          filename: 'Invoice-INV-2025-1234.pdf'
        }
      }
    ],
    actions: [
      { name: 'Pay Invoice', priority: 1, isPrimary: true },
      { name: 'View Details', priority: 2, isPrimary: false },
      { name: 'Download PDF', priority: 3, isPrimary: false }
    ],
    metadata: {
      type: 'mail',
      priority: 'high',
      invoiceId: 'INV-2025-1234',
      paymentAmount: 599.00,
      dueDate: 'Oct 30',
      urgent: true
    }
  },
  {
    from: 'Mr. Thompson',
    initial: 'T',
    subject: 'Assignment Past Due - Math Homework',
    preview: 'Lucas has a past-due Chapter 5 homework. Extended deadline: Friday 3 PM to avoid penalty.',
    intent: 'education.homework.reminder',
    intentConfidence: 0.92,
    timeAgo: '8h ago',
    aiSummary: {
      actions: '• Submit Chapter 5 homework (problems 1-24) by **Friday 3 PM** to avoid late penalty',
      why: 'Assignment is past due and needs immediate submission.',
      context: '• Covers fractions, decimals, and word problems'
    },
    suggestedActions: [
      {
        actionId: 'view_assignment',
        displayName: 'View Assignment',
        actionType: 'GO_TO',
        isPrimary: true,
        priority: 1,
        context: {
          url: 'https://schoolportal.com/assignment/CH5-math',
          assignmentName: 'Chapter 5 Homework',
          problems: '1-24',
          subject: 'Math',
          teacher: 'Mr. Thompson'
        }
      },
      {
        actionId: 'set_homework_reminder',
        displayName: 'Set Reminder',
        actionType: 'NATIVE_API',
        isPrimary: false,
        priority: 2,
        context: {
          title: 'Lucas - Submit Math Homework',
          date: 'Friday',
          time: '2:00 PM',
          alertBefore: '1 hour',
          notes: 'Chapter 5, problems 1-24'
        }
      },
      {
        actionId: 'email_teacher',
        displayName: 'Email Teacher',
        actionType: 'NATIVE_API',
        isPrimary: false,
        priority: 3,
        context: {
          recipient: 'thompson@school.edu',
          subject: 'Re: Chapter 5 Homework Extension',
          template: 'homework_extension'
        }
      }
    ],
    actions: [
      { name: 'View Assignment', priority: 1, isPrimary: true },
      { name: 'Add Reminder', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'mail',
      priority: 'high',
      kidName: 'Lucas Chen',
      grade: '7th Grade',
      dueDate: 'Friday 3 PM',
      urgent: true
    }
  },
  {
    from: 'Mrs. Johnson',
    initial: 'J',
    subject: 'Science Project Graded - 95/100',
    preview: 'Emma\'s solar system project received 95/100! Excellent research and Saturn\'s rings detail.',
    intent: 'education.grade.notification',
    intentConfidence: 0.90,
    timeAgo: '1d ago',
    aiSummary: {
      actions: 'None',
      why: 'Emma\'s solar system project has been graded and received excellent marks.',
      context: '• Scored 95/100 on solar system model\n• Teacher praised planet research and Saturn\'s rings detail'
    },
    suggestedActions: [
      {
        actionId: 'check_grade',
        displayName: 'View Grade Details',
        actionType: 'GO_TO',
        isPrimary: true,
        priority: 1,
        context: {
          url: 'https://schoolportal.com/grades/emma-chen/science-project',
          assignmentName: 'Solar System Project',
          score: '95/100',
          teacher: 'Mrs. Johnson'
        }
      },
      {
        actionId: 'send_congrats_message',
        displayName: 'Congratulate Emma',
        actionType: 'NATIVE_API',
        isPrimary: false,
        priority: 2,
        context: {
          messageType: 'celebration',
          achievement: '95/100 on Solar System Project',
          childName: 'Emma'
        }
      },
      {
        actionId: 'archive_grade_notification',
        displayName: 'Archive',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 3,
        context: {
          category: 'grade_notifications',
          studentName: 'Emma Chen'
        }
      }
    ],
    actions: [
      { name: 'Check Grade', priority: 1, isPrimary: true },
      { name: 'View Feedback', priority: 2, isPrimary: false }
    ],
    metadata: {
      type: 'mail',
      priority: 'low',
      kidName: 'Emma Chen',
      grade: '3rd Grade',
      score: '95/100'
    }
  },
  {
    from: 'Tech Munch Daily',
    initial: 'T',
    subject: 'The Download: This Week in AI - Issue #47',
    preview: 'Weekly AI & tech newsletter: GPT-5 speculation, EU AI Act, GitHub Copilot X upgrade...',
    intent: 'generic.newsletter',
    intentConfidence: 0.98,
    timeAgo: '2h ago',
    aiSummary: {
      actions: 'None',
      why: 'Weekly AI & tech newsletter with industry updates.',
      context: '• GPT-5 speculation, EU AI Act goes live, GitHub Copilot X upgrade\n• 67% of devs use AI assistants daily, $21B invested this quarter'
    },
    suggestedActions: [
      {
        actionId: 'view_newsletter_summary',
        displayName: 'Read Newsletter',
        actionType: 'GO_TO',
        isPrimary: true,
        priority: 1,
        context: {
          url: 'https://techcrunch.com/newsletters/the-download-47',
          newsletterName: 'The Download',
          issueNumber: 47,
          readingTime: '8 mins'
        }
      },
      {
        actionId: 'save_newsletter_for_later',
        displayName: 'Save for Later',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 2,
        context: {
          category: 'newsletters',
          publication: 'Tech Munch Daily',
          tags: ['AI', 'Technology', 'GPT-5']
        }
      },
      {
        actionId: 'archive_newsletter',
        displayName: 'Archive',
        actionType: 'IN_APP',
        isPrimary: false,
        priority: 3,
        context: {
          category: 'newsletters',
          autoArchiveAfter: '7 days'
        }
      }
    ],
    actions: [
      { name: 'View Summary', priority: 1, isPrimary: true },
      { name: 'Save for Later', priority: 2, isPrimary: false },
      { name: 'Archive', priority: 3, isPrimary: false }
    ],
    metadata: {
      type: 'ads',
      priority: 'low',
      keyTopics: ['Artificial Intelligence', 'GPT-5', 'EU Regulation', 'GitHub']
    },
    productImageUrl: 'https://picsum.photos/seed/tech/400/240'
  }
];

// Helper function to get intent color (for UI badges)
export function getIntentColor(intent: string): string {
  if (intent.includes('shipping')) return '#FF9500';
  if (intent.includes('education')) return '#34C759';
  if (intent.includes('promotional') || intent.includes('deal')) return '#FF3B30';
  if (intent.includes('promo-code')) return '#FF2D55';
  if (intent.includes('cart')) return '#AF52DE';
  if (intent.includes('future_sale')) return '#30B0C7';
  if (intent.includes('invoice') || intent.includes('billing')) return '#FFD60A';
  if (intent.includes('homework')) return '#FF9500';
  if (intent.includes('grade')) return '#34C759';
  if (intent.includes('newsletter')) return '#007AFF';
  return '#8E8E93';
}

// Helper function to get intent icon
export function getIntentIcon(intent: string): string {
  if (intent.includes('shipping')) return '📦';
  if (intent.includes('permission')) return '📝';
  if (intent.includes('promotional') || intent.includes('deal')) return '🏷️';
  if (intent.includes('promo-code')) return '🎟️';
  if (intent.includes('cart')) return '🛒';
  if (intent.includes('future_sale')) return '🎨';
  if (intent.includes('invoice') || intent.includes('billing')) return '💳';
  if (intent.includes('homework')) return '📚';
  if (intent.includes('grade')) return '⭐';
  if (intent.includes('newsletter')) return '📰';
  return '✉️';
}
