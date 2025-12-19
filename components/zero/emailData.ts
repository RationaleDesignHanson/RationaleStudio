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
    preview: `Hello,

Great news! Your order has shipped and is on its way to you.

━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━

Order Number: #1234567
Tracking Number: 1Z999AA10123456784
Carrier: You're Probably Shipped (UPS)
Estimated Delivery: Tomorrow by 8:00 PM

━━━━━━━━━━━━━━━━━━━━━━

Track your package in real-time:
https://www.ups.com/track?tracknum=1Z999AA10123456784

Your package will be delivered to your doorstep. No signature required.

Questions? Visit our Help Center or reply to this email.

Thank you for shopping with us!

Amazin' Deliveries Team
Customer Service: 1-800-DELIVER
www.amazindeliveries.com`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=240&fit=crop',
    threadCount: 3,
    recipients: ['me']
  },
  {
    from: 'Mrs. Johnson',
    initial: 'J',
    subject: 'Field Trip Permission Form - Science Museum',
    preview: `Dear Parents and Guardians,

I'm excited to announce that Emma's 3rd grade class will be taking a field trip to the Science Museum on October 28, 2025!

FIELD TRIP DETAILS:
───────────────────
Date: October 28, 2025
Destination: Science Museum
Departure: 8:30 AM (please arrive by 8:15 AM)
Return: 2:30 PM
Activities: Dinosaur exhibit & planetarium show

WHAT YOU NEED TO DO:
───────────────────
✓ Sign the attached permission form
✓ Pay $25 field trip fee
✓ Deadline: October 24, 2025

Payment can be made online through the school portal or by check made out to "Lincoln Elementary School."

Students should bring:
• Packed lunch (nut-free please)
• Water bottle
• Comfortable walking shoes

This will be an amazing educational experience! The museum has hands-on exhibits and we'll be seeing a special presentation on space exploration in the planetarium.

Please email me if you have any questions or concerns.

Thank you!
Mrs. Johnson
3rd Grade Teacher
Lincoln Elementary School
mjohnson@lincolnelementary.edu`,
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
    threadCount: 5,
    recipients: ['me', 'spouse@email.com']
  },
  {
    from: 'Best... Buy Now!',
    initial: 'B',
    subject: 'Sound Innovation WH-1000XM5 Headphones',
    preview: `🔥 FLASH SALE - TODAY ONLY! 🔥

Save BIG on Premium Audio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOUND INNOVATION WH-1000XM5
Wireless Noise-Cancelling Headphones
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Regular Price: $399.99
FLASH SALE: $279.99
YOUR SAVINGS: $120.00 (30% OFF)

⏰ ENDS TONIGHT AT 11:59 PM ⏰

FEATURES:
▸ Industry-leading noise cancellation
▸ 30-hour battery life
▸ LDAC high-resolution audio
▸ Multi-point connectivity
▸ Premium comfort design

✓ Free 2-day shipping
✓ 30-day returns
✓ 1-year manufacturer warranty

[CLAIM DEAL NOW]
👉 https://www.bestbuy.com/site/sony-wh-1000xm5

Limited stock available. This flash sale won't last!

Questions? Live chat available 24/7.

Best... Buy Now! Electronics
1-800-BUY-BEST | www.bestbuynow.com

Unsubscribe | Manage Preferences`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=240&fit=crop',
    recipients: ['me', 'family@email.com', 'friend1@email.com', 'friend2@email.com']
  },
  {
    from: 'Bullseye Bargains',
    initial: 'B',
    subject: 'Extra 20% Off - Code: SAVE20',
    preview: `⚡ FLASH SALE ALERT ⚡

Extra 20% Off EVERYTHING

Yes, you read that right. Stack your savings!

┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃   USE CODE: SAVE20    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛

Extra 20% off already-reduced clearance items
Valid on ALL departments:
• Home & Furniture
• Clothing & Accessories
• Electronics & Tech
• Kids & Baby
• Beauty & Personal Care

⏰ ENDS TONIGHT AT MIDNIGHT ⏰

HOW IT WORKS:
1. Shop online or in-store
2. Add code SAVE20 at checkout
3. Watch your savings grow!

Already on sale? Add another 20% off!
Clearance item? Add another 20% off!

This is our biggest discount of the season.

[SHOP NOW]
👉 https://www.target.com?promo=SAVE20

Store Hours: 8 AM - 10 PM daily

Bullseye Bargains
Making your dollar go further
1-800-TARGET | www.target.com

Exclusions apply. See website for details.`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=240&fit=crop'
  },
  {
    from: 'Real Exciting Items',
    initial: 'R',
    subject: 'Complete Your Order - 3 Items Waiting',
    preview: `You left something behind...

Hi there,

We noticed you were shopping with us earlier and left a few items in your cart. We've saved them for you!

YOUR CART ITEMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Trail Running Shoes - Men's Size 10
   Color: Forest Green/Black
   $89.99

2. Insulated Water Bottle - 32oz
   Color: Ocean Blue
   $29.99

3. Premium Yoga Mat - 5mm
   Color: Purple
   $36.99

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CART TOTAL: $156.97
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Free shipping on orders over $50
✓ 100% satisfaction guarantee
✓ 30-day returns on all items
✓ REI Co-op member? Get 10% back in rewards!

Your cart is saved for 7 days, but these popular items sell out fast!

[COMPLETE YOUR PURCHASE]
👉 https://www.rei.com/cart/checkout

Still deciding? Read reviews from fellow adventurers or contact our Gear Experts for personalized recommendations.

Happy trails!
The Real Exciting Items Team

Real Exciting Items (REI)
1-800-426-4840 | www.rei.com

Not interested? Remove items from cart`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=240&fit=crop'
  },
  {
    from: 'Art Vanguard Gallery',
    initial: 'A',
    subject: 'James Jean - Sculpture and print duo',
    preview: `JAMES JEAN × ART VANGUARD GALLERY

Limited Edition Release Announcement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUN TAROT NEBULA
Sculpture & Print Duo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We're thrilled to announce an exclusive collaboration with visionary artist James Jean.

DROP DATE: October 31, 2025
RELEASE TIME: 10:00 AM PST
EDITION SIZE: 500 pieces worldwide
AVAILABILITY: One week only

THE COLLECTION:
───────────────

▸ Hand-painted resin sculpture (8" tall)
▸ Signed & numbered archival print (18" × 24")
▸ Certificate of authenticity
▸ Custom magnetic presentation box

James Jean's signature ethereal style meets cosmic mysticism in this stunning interpretation of the Sun Tarot card. Each piece features luminous nebula effects achieved through his pioneering mixed-media technique.

COLLECTOR INFORMATION:
───────────────

• Expected retail: $500 USD
• Limit: 2 per customer
• Shipping: Ships within 4-6 weeks
• Payment plans available

This will sell out. Set your alarm.

[NOTIFY ME]
Get SMS alert when the drop goes live
👉 https://artvanguardgallery.com/james-jean-sun-tarot

Follow @artvanguardgallery for preview images dropping this week.

ART VANGUARD GALLERY
Contemporary & Limited Edition Art
Los Angeles, CA
info@artvanguardgallery.com`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=240&fit=crop'
  },
  {
    from: 'Peak Performance Corp',
    initial: 'P',
    subject: 'Invoice Due - $599.00',
    preview: `INVOICE

Peak Performance Corp
123 Business Plaza, Suite 500
San Francisco, CA 94105
billing@peakperformancecorp.com
(415) 555-0100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Invoice Number: INV-2025-1234
Invoice Date: October 1, 2025
Due Date: October 30, 2025

Bill To:
Your Company Name
Attn: Accounts Payable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESCRIPTION OF SERVICES

Professional Services - September 2025

• Strategic consulting (40 hours @ $120/hr)
• Project management oversight
• Technical implementation support
• Quarterly business review preparation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AMOUNT DUE: $599.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAYMENT INSTRUCTIONS:

Online Payment (Preferred):
👉 https://pay.peakperformancecorp.com/INV-2025-1234

Accepted Methods:
✓ ACH Bank Transfer (no fee)
✓ Credit Card (2.9% processing fee applies)
✓ Wire Transfer

Mail Check To:
Peak Performance Corp
PO Box 12345
San Francisco, CA 94105

Please include invoice number on payment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: Payment is due within 30 days of invoice date. A late fee of 1.5% per month may be applied to overdue balances.

Questions about this invoice?
Contact: accounting@peakperformancecorp.com
Phone: (415) 555-0100 ext. 2

Thank you for your business!`,
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
    preview: `Hello Parents/Guardians,

This is a reminder that Lucas has an overdue math assignment that needs immediate attention.

ASSIGNMENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: Math - 7th Grade
Assignment: Chapter 5 Homework
Status: PAST DUE
Extended Deadline: Friday, 3:00 PM

WHAT'S INCLUDED:
Problems 1-24 covering:
• Fractions and mixed numbers
• Decimal operations
• Real-world word problems

This assignment was originally due last Monday. I'm extending the deadline to this Friday at 3:00 PM to give Lucas a chance to complete it without penalty.

After Friday, late penalties will apply:
• 10% deduction if submitted after Friday
• Maximum of 70% possible score after one week

WHAT YOU CAN DO:
✓ Check that Lucas has the textbook (pages 124-128)
✓ Encourage him to complete 5-6 problems per day
✓ Office hours available: Tuesday & Thursday 3-4 PM
✓ Online tutoring resources in the parent portal

Lucas is a capable student and I know he can complete this work. Please reach out if there are any extenuating circumstances I should be aware of.

Access assignment: https://schoolportal.com/assignment/CH5-math

Best regards,
Mr. Thompson
7th Grade Mathematics
River Vale Middle School
rthompson@rivervaleschools.org
(201) 555-7890`,
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
    preview: `Dear Parents,

Great news! Emma's science project has been graded and I'm pleased to share the results.

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  SCIENCE PROJECT - GRADED     ┃
┃  Solar System Model           ┃
┃  Score: 95/100 (A)           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

EVALUATION BREAKDOWN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Research & Accuracy: 48/50 ⭐⭐⭐⭐⭐
Creativity & Design: 25/25 ⭐⭐⭐⭐⭐
Presentation: 17/20 ⭐⭐⭐⭐
Effort & Detail: 5/5 ⭐⭐⭐⭐⭐

TEACHER COMMENTS:

Emma created an exceptional solar system model! Her research on each planet was thorough and accurate. I was particularly impressed by her attention to detail on Saturn's rings - she even included the Cassini Division!

The painted textures on Jupiter and Mars were very realistic. Her presentation showed excellent understanding of planetary characteristics, orbital patterns, and relative sizes.

Suggestion for improvement: Adding planet distances to scale would make this an even more complete project.

This is A-level work. Well done, Emma!

You can view the full rubric and photos of Emma's project in the parent portal:
👉 https://schoolportal.com/grades/emma-chen/science-project

Please congratulate Emma on her excellent work!

Best regards,
Mrs. Johnson
3rd Grade - Room 12
Lincoln Elementary School
mjohnson@lincolnelementary.edu`,
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
    preview: `╔═══════════════════════════════════════╗
║  THE DOWNLOAD: THIS WEEK IN AI       ║
║  Issue #47 - Your Weekly AI Briefing ║
╚═══════════════════════════════════════╝

Hey tech enthusiasts! 👋

Here's what you need to know this week in AI and technology.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📰 TOP STORIES

1. GPT-5 SPECULATION HEATS UP
OpenAI reportedly targeting Q2 2025 release. Sources suggest massive performance leap in reasoning capabilities and multimodal understanding. Read more →

2. EU AI ACT OFFICIALLY GOES LIVE
Europe's landmark AI regulation takes effect this week. What it means for developers, businesses, and AI deployment. Full breakdown →

3. GITHUB COPILOT X UPGRADE RELEASED
New features include voice coding, context-aware debugging, and PR review automation. Early access available now. Details →

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 BY THE NUMBERS

• 67% of developers now use AI coding assistants daily (up from 42% last year)
• $21B invested in AI startups this quarter
• 2.3M new AI-related jobs posted globally

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 TRENDING DISCUSSIONS

• "Is prompt engineering a real career?" - The great debate continues
• Anthropic's Constitutional AI approach gaining traction
• AI watermarking standards proposal from C2PA consortium

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WHAT TO WATCH NEXT WEEK

→ Google I/O AI announcements
→ Stanford HAI Conference keynotes
→ Meta's LLaMA 3 rumored release

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 RECOMMENDED READING

"Attention Is All You Need" - Still relevant 6 years later. Why the Transformer architecture continues to dominate. [8 min read]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

That's all for this week! Stay curious.

— The Tech Munch Daily Team

[READ FULL NEWSLETTER] →
https://techcrunch.com/newsletters/the-download-47

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tech Munch Daily | Weekly AI & Tech Newsletter
Unsubscribe | Update Preferences | View in Browser`,
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
    productImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=240&fit=crop'
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
