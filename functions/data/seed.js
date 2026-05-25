export const seedDb = {
  "deals": [
    {
      "id": 1,
      "name": "Bombay Shaving Co.",
      "sh": "BSC",
      "bg": "rgba(168,85,247,.15)",
      "tc": "#d8b4fe",
      "type": "MRR",
      "dur": "6mo",
      "amt": 480000,
      "af": "Rs.4,80,000",
      "stage": "active",
      "ref": "REF-BSC-0041",
      "sales": "Sneha Tiwari",
      "cam": "Rohan Kumar",
      "biz": "Shantanu Deshpande",
      "ren": "6 Jun 2026",
      "rm": "jun",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0041",
      "raised": "01 Apr",
      "due": "15 Apr",
      "paid": "09 Apr",
      "days": 8,
      "month": "apr",
      "nextAction": "Send renewal proposal",
      "actionDate": "28 May 2026",
      "aurg": "warn",
      "mrrI": [
        {
          "mo": "Apr 2026",
          "num": "#INV-0041",
          "ref": "REF-BSC-0041",
          "amt": "Rs.80,000",
          "raised": "01 Apr",
          "due": "15 Apr",
          "paid": "09 Apr",
          "st": "Paid"
        },
        {
          "mo": "May 2026",
          "num": "#INV-0047",
          "ref": "REF-BSC-0047",
          "amt": "Rs.80,000",
          "raised": "01 May",
          "due": "15 May",
          "paid": "12 May",
          "st": "Paid"
        },
        {
          "mo": "Jun 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.80,000",
          "raised": "01 Jun (expected)",
          "due": "15 Jun",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "15 Mar 2026",
          "done": true,
          "n": "Email approval from Shantanu Deshpande"
        },
        {
          "s": "Agreement Sent",
          "d": "17 Mar 2026",
          "done": true,
          "n": "6-month MRR agreement signed via DocuSign"
        },
        {
          "s": "Invoice Raised",
          "d": "18 Mar 2026",
          "done": true,
          "n": "INV-0041 raised on Refrens for Rs.80,000/mo"
        },
        {
          "s": "Invoice Paid",
          "d": "19 Mar 2026",
          "done": true,
          "n": "Payment received within 1 day via NEFT"
        },
        {
          "s": "Onboarding",
          "d": "22 Mar 2026",
          "done": true,
          "n": "Shopify, GA4, Meta Ads access. Dashboard: BSC-2026-001"
        },
        {
          "s": "Active – Month 1",
          "d": "01 Apr 2026",
          "done": true,
          "n": "INV-0041 paid by 09 Apr"
        },
        {
          "s": "Active – Month 2",
          "d": "01 May 2026",
          "done": true,
          "n": "INV-0047 paid by 12 May"
        },
        {
          "s": "Active – Month 3",
          "d": "01 Jun 2026",
          "done": false,
          "n": "Next invoice due. Renewal discussion pending"
        }
      ]
    },
    {
      "id": 2,
      "name": "Rabbitat",
      "sh": "RBT",
      "bg": "rgba(34,197,94,.12)",
      "tc": "#86efac",
      "type": "MRR",
      "dur": "3mo",
      "amt": 210000,
      "af": "Rs.2,10,000",
      "stage": "renewal",
      "ref": "REF-RBT-0039",
      "sales": "Aryan Shah",
      "cam": "Priya Malhotra",
      "biz": "Priyanka R.",
      "ren": "23 May 2026",
      "rm": "may",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0039",
      "raised": "28 Mar",
      "due": "12 Apr",
      "paid": "10 Apr",
      "days": 13,
      "month": "mar",
      "nextAction": "Call Priyanka for renewal",
      "actionDate": "20 May 2026",
      "aurg": "urgent",
      "mrrI": [
        {
          "mo": "Feb 2026",
          "num": "#INV-0029",
          "ref": "REF-RBT-0029",
          "amt": "Rs.70,000",
          "raised": "01 Feb",
          "due": "15 Feb",
          "paid": "13 Feb",
          "st": "Paid"
        },
        {
          "mo": "Mar 2026",
          "num": "#INV-0035",
          "ref": "REF-RBT-0035",
          "amt": "Rs.70,000",
          "raised": "01 Mar",
          "due": "15 Mar",
          "paid": "10 Mar",
          "st": "Paid"
        },
        {
          "mo": "Apr 2026",
          "num": "#INV-0039",
          "ref": "REF-RBT-0039",
          "amt": "Rs.70,000",
          "raised": "28 Mar",
          "due": "12 Apr",
          "paid": "10 Apr",
          "st": "Paid"
        },
        {
          "mo": "May 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.70,000",
          "raised": "Pending renewal",
          "due": "--",
          "paid": "--",
          "st": "Renewal Due"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "28 Jan 2026",
          "done": true,
          "n": "Email from Priyanka R."
        },
        {
          "s": "Agreement Sent",
          "d": "30 Jan 2026",
          "done": true,
          "n": "3-month MRR agreement signed"
        },
        {
          "s": "Invoice Raised",
          "d": "01 Feb 2026",
          "done": true,
          "n": "INV-0029 for Rs.70,000/month"
        },
        {
          "s": "Invoice Paid",
          "d": "03 Feb 2026",
          "done": true,
          "n": "Paid in 2 days"
        },
        {
          "s": "Onboarding",
          "d": "05 Feb 2026",
          "done": true,
          "n": "Dashboard: RBT-2026-002"
        },
        {
          "s": "Active M1",
          "d": "01 Feb",
          "done": true,
          "n": "Paid 13 Feb"
        },
        {
          "s": "Active M2",
          "d": "01 Mar",
          "done": true,
          "n": "Paid 10 Mar"
        },
        {
          "s": "Active M3",
          "d": "28 Mar",
          "done": true,
          "n": "Paid 10 Apr"
        },
        {
          "s": "Renewal Due",
          "d": "23 May 2026",
          "done": false,
          "n": "Renewal call pending with Priyanka"
        }
      ]
    },
    {
      "id": 3,
      "name": "Mamaearth",
      "sh": "MEH",
      "bg": "rgba(168,85,247,.12)",
      "tc": "#c4b5fd",
      "type": "onetime",
      "dur": "One-Time",
      "amt": 120000,
      "af": "Rs.1,20,000",
      "stage": "inv-raised",
      "ref": "REF-MEH-0043",
      "sales": "Riya Singh",
      "cam": "Amit Verma",
      "biz": "Varun Alagh",
      "ren": "--",
      "rm": "",
      "inv": "Pending",
      "ip": 0,
      "nda": false,
      "agr": true,
      "inum": "#INV-0043",
      "raised": "08 May",
      "due": "22 May",
      "paid": "--",
      "days": "--",
      "month": "may",
      "nextAction": "Follow up on invoice",
      "actionDate": "22 May 2026",
      "aurg": "urgent",
      "mrrI": [
        {
          "mo": "May 2026",
          "num": "#INV-0043",
          "ref": "REF-MEH-0043",
          "amt": "Rs.1,20,000",
          "raised": "08 May",
          "due": "22 May",
          "paid": "--",
          "st": "Pending"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "02 May 2026",
          "done": true,
          "n": "Email from Varun Alagh"
        },
        {
          "s": "Agreement Sent",
          "d": "04 May 2026",
          "done": true,
          "n": "One-time agreement signed"
        },
        {
          "s": "Invoice Raised",
          "d": "08 May 2026",
          "done": true,
          "n": "INV-0043 for Rs.1,20,000. Due 22 May"
        },
        {
          "s": "Invoice Paid",
          "d": "--",
          "done": false,
          "n": "Pending – follow up required"
        },
        {
          "s": "Onboarding",
          "d": "--",
          "done": false,
          "n": "Pending payment"
        },
        {
          "s": "Active",
          "d": "--",
          "done": false,
          "n": "Pending"
        }
      ]
    },
    {
      "id": 4,
      "name": "Sugar Cosmetics",
      "sh": "SGR",
      "bg": "rgba(59,130,246,.12)",
      "tc": "#93c5fd",
      "type": "MRR",
      "dur": "2mo",
      "amt": 350000,
      "af": "Rs.3,50,000",
      "stage": "onboarding",
      "ref": "REF-SGR-0042",
      "sales": "Mansi Patel",
      "cam": "Karan Joshi",
      "biz": "Vineeta Singh",
      "ren": "13 Jul 2026",
      "rm": "jul",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": false,
      "inum": "#INV-0042",
      "raised": "03 May",
      "due": "17 May",
      "paid": "13 May",
      "days": 10,
      "month": "may",
      "nextAction": "Complete onboarding – get Shopify",
      "actionDate": "19 May 2026",
      "aurg": "urgent",
      "mrrI": [
        {
          "mo": "May 2026",
          "num": "#INV-0042",
          "ref": "REF-SGR-0042",
          "amt": "Rs.1,75,000",
          "raised": "03 May",
          "due": "17 May",
          "paid": "13 May",
          "st": "Paid"
        },
        {
          "mo": "Jun 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.1,75,000",
          "raised": "01 Jun (expected)",
          "due": "15 Jun",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "28 Apr 2026",
          "done": true,
          "n": "From Vineeta Singh"
        },
        {
          "s": "Agreement Sent",
          "d": "30 Apr 2026",
          "done": true,
          "n": "2-month MRR sent – pending signature"
        },
        {
          "s": "Invoice Raised",
          "d": "03 May 2026",
          "done": true,
          "n": "INV-0042 for Rs.1,75,000"
        },
        {
          "s": "Invoice Paid",
          "d": "13 May 2026",
          "done": true,
          "n": "Paid in 10 days"
        },
        {
          "s": "Onboarding",
          "d": "15 May 2026",
          "done": true,
          "n": "Meeting done – Shopify access pending"
        },
        {
          "s": "Active",
          "d": "--",
          "done": false,
          "n": "Target: 20 May 2026"
        }
      ]
    },
    {
      "id": 5,
      "name": "boAt Lifestyle",
      "sh": "BOT",
      "bg": "rgba(239,68,68,.12)",
      "tc": "#fca5a5",
      "type": "onetime",
      "dur": "One-Time",
      "amt": 90000,
      "af": "Rs.90,000",
      "stage": "renewal",
      "ref": "REF-BOT-0037",
      "sales": "Mansi Patel",
      "cam": "Karan Joshi",
      "biz": "Aman Gupta",
      "ren": "25 Jun 2026",
      "rm": "jun",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0037",
      "raised": "15 Mar",
      "due": "30 Mar",
      "paid": "27 Mar",
      "days": 12,
      "month": "mar",
      "nextAction": "Prepare renewal deck",
      "actionDate": "10 Jun 2026",
      "aurg": "safe",
      "mrrI": [
        {
          "mo": "Mar 2026",
          "num": "#INV-0037",
          "ref": "REF-BOT-0037",
          "amt": "Rs.90,000",
          "raised": "15 Mar",
          "due": "30 Mar",
          "paid": "27 Mar",
          "st": "Paid"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "10 Mar 2026",
          "done": true,
          "n": "From Aman Gupta"
        },
        {
          "s": "Agreement Sent",
          "d": "12 Mar 2026",
          "done": true,
          "n": "One-time signed"
        },
        {
          "s": "Invoice Raised",
          "d": "15 Mar 2026",
          "done": true,
          "n": "INV-0037 for Rs.90,000"
        },
        {
          "s": "Invoice Paid",
          "d": "27 Mar 2026",
          "done": true,
          "n": "Paid in 12 days"
        },
        {
          "s": "Onboarding",
          "d": "29 Mar 2026",
          "done": true,
          "n": "Dashboard setup complete"
        },
        {
          "s": "Active",
          "d": "01 Apr 2026",
          "done": true,
          "n": "Delivery in progress"
        },
        {
          "s": "Renewal",
          "d": "25 Jun 2026",
          "done": false,
          "n": "Start renewal discussion 10 Jun"
        }
      ]
    },
    {
      "id": 6,
      "name": "WOW Skin Science",
      "sh": "WOW",
      "bg": "rgba(59,130,246,.12)",
      "tc": "#93c5fd",
      "type": "MRR",
      "dur": "3mo",
      "amt": 520000,
      "af": "Rs.5,20,000",
      "stage": "active",
      "ref": "REF-WOW-0044",
      "sales": "Riya Singh",
      "cam": "Priya Malhotra",
      "biz": "Manish Chowdhary",
      "ren": "12 Jul 2026",
      "rm": "jul",
      "inv": "Pending",
      "ip": 0,
      "nda": true,
      "agr": true,
      "inum": "#INV-0044",
      "raised": "10 May",
      "due": "24 May",
      "paid": "--",
      "days": "--",
      "month": "may",
      "nextAction": "Chase May invoice payment",
      "actionDate": "24 May 2026",
      "aurg": "urgent",
      "mrrI": [
        {
          "mo": "Mar 2026",
          "num": "#INV-0032",
          "ref": "REF-WOW-0032",
          "amt": "Rs.1,30,000",
          "raised": "01 Mar",
          "due": "15 Mar",
          "paid": "12 Mar",
          "st": "Paid"
        },
        {
          "mo": "Apr 2026",
          "num": "#INV-0038",
          "ref": "REF-WOW-0038",
          "amt": "Rs.1,30,000",
          "raised": "01 Apr",
          "due": "15 Apr",
          "paid": "13 Apr",
          "st": "Paid"
        },
        {
          "mo": "May 2026",
          "num": "#INV-0044",
          "ref": "REF-WOW-0044",
          "amt": "Rs.1,30,000",
          "raised": "10 May",
          "due": "24 May",
          "paid": "--",
          "st": "Pending"
        },
        {
          "mo": "Jun 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.1,30,000",
          "raised": "01 Jun (expected)",
          "due": "15 Jun",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval",
          "d": "20 Feb 2026",
          "done": true,
          "n": "From Manish Chowdhary"
        },
        {
          "s": "Agreement",
          "d": "22 Feb 2026",
          "done": true,
          "n": "3-month MRR signed"
        },
        {
          "s": "Invoice Raised",
          "d": "25 Feb 2026",
          "done": true,
          "n": "First invoice raised"
        },
        {
          "s": "Invoice Paid",
          "d": "28 Feb 2026",
          "done": true,
          "n": "Paid in 3 days"
        },
        {
          "s": "Onboarding",
          "d": "02 Mar 2026",
          "done": true,
          "n": "Dashboard: WOW-2026-006"
        },
        {
          "s": "Active M1",
          "d": "01 Mar",
          "done": true,
          "n": "Paid 12 Mar"
        },
        {
          "s": "Active M2",
          "d": "01 Apr",
          "done": true,
          "n": "Paid 13 Apr"
        },
        {
          "s": "Active M3",
          "d": "10 May",
          "done": true,
          "n": "INV-0044 raised – PAYMENT PENDING"
        }
      ]
    },
    {
      "id": 7,
      "name": "The Ayurveda Co.",
      "sh": "AYV",
      "bg": "rgba(249,115,22,.12)",
      "tc": "#fdba74",
      "type": "onetime",
      "dur": "One-Time",
      "amt": 220000,
      "af": "Rs.2,20,000",
      "stage": "approval",
      "ref": "--",
      "sales": "Aryan Shah",
      "cam": "Rohan Kumar",
      "biz": "Shreedha Singh",
      "ren": "--",
      "rm": "",
      "inv": "--",
      "ip": 0,
      "nda": false,
      "agr": false,
      "inum": "--",
      "raised": "--",
      "due": "--",
      "paid": "--",
      "days": "--",
      "month": "may",
      "nextAction": "Send agreement to Shreedha",
      "actionDate": "19 May 2026",
      "aurg": "urgent",
      "mrrI": [],
      "journey": [
        {
          "s": "Approval Received",
          "d": "16 May 2026",
          "done": true,
          "n": "Email from Shreedha Singh"
        },
        {
          "s": "Agreement Sent",
          "d": "--",
          "done": false,
          "n": "Pending – send by 19 May"
        },
        {
          "s": "Invoice Raised",
          "d": "--",
          "done": false,
          "n": "Pending"
        },
        {
          "s": "Onboarding",
          "d": "--",
          "done": false,
          "n": "Pending"
        },
        {
          "s": "Active",
          "d": "--",
          "done": false,
          "n": "Pending"
        }
      ]
    },
    {
      "id": 8,
      "name": "Minimalist",
      "sh": "MIN",
      "bg": "rgba(168,85,247,.1)",
      "tc": "#c4b5fd",
      "type": "MRR",
      "dur": "2mo",
      "amt": 120000,
      "af": "Rs.1,20,000",
      "stage": "agreement",
      "ref": "--",
      "sales": "Sneha Tiwari",
      "cam": "Amit Verma",
      "biz": "Mohit Yadav",
      "ren": "Aug 2026",
      "rm": "aug",
      "inv": "--",
      "ip": 0,
      "nda": true,
      "agr": false,
      "inum": "--",
      "raised": "--",
      "due": "--",
      "paid": "--",
      "days": "--",
      "month": "may",
      "nextAction": "Get agreement signed from Mohit",
      "actionDate": "21 May 2026",
      "aurg": "warn",
      "mrrI": [
        {
          "mo": "Jun 2026 (expected)",
          "num": "--",
          "ref": "--",
          "amt": "Rs.60,000",
          "raised": "After agreement",
          "due": "--",
          "paid": "--",
          "st": "Upcoming"
        },
        {
          "mo": "Jul 2026 (expected)",
          "num": "--",
          "ref": "--",
          "amt": "Rs.60,000",
          "raised": "01 Jul",
          "due": "--",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval Received",
          "d": "14 May 2026",
          "done": true,
          "n": "From Mohit Yadav"
        },
        {
          "s": "Agreement Sent",
          "d": "16 May 2026",
          "done": true,
          "n": "2-month MRR sent – awaiting signature"
        },
        {
          "s": "Invoice Raise",
          "d": "--",
          "done": false,
          "n": "Pending signature"
        },
        {
          "s": "Onboarding",
          "d": "--",
          "done": false,
          "n": "Pending"
        },
        {
          "s": "Active",
          "d": "--",
          "done": false,
          "n": "Target: Jun 2026"
        }
      ]
    },
    {
      "id": 9,
      "name": "Nykaa Fashion",
      "sh": "NYK",
      "bg": "rgba(168,85,247,.15)",
      "tc": "#d8b4fe",
      "type": "MRR",
      "dur": "3mo",
      "amt": 380000,
      "af": "Rs.3,80,000",
      "stage": "active",
      "ref": "REF-NYK-0038",
      "sales": "Kiran Shah",
      "cam": "Priya Malhotra",
      "biz": "Falguni Nayar",
      "ren": "10 Aug 2026",
      "rm": "aug",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0038",
      "raised": "01 Apr",
      "due": "15 Apr",
      "paid": "11 Apr",
      "days": 10,
      "month": "apr",
      "nextAction": "Mid-contract check-in call",
      "actionDate": "10 Jun 2026",
      "aurg": "safe",
      "mrrI": [
        {
          "mo": "Apr 2026",
          "num": "#INV-0038",
          "ref": "REF-NYK-0038",
          "amt": "Rs.1,26,666",
          "raised": "01 Apr",
          "due": "15 Apr",
          "paid": "11 Apr",
          "st": "Paid"
        },
        {
          "mo": "May 2026",
          "num": "#INV-0045",
          "ref": "REF-NYK-0045",
          "amt": "Rs.1,26,666",
          "raised": "01 May",
          "due": "15 May",
          "paid": "10 May",
          "st": "Paid"
        },
        {
          "mo": "Jun 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.1,26,666",
          "raised": "01 Jun",
          "due": "15 Jun",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval",
          "d": "20 Mar 2026",
          "done": true,
          "n": "From Falguni Nayar team"
        },
        {
          "s": "Agreement",
          "d": "22 Mar 2026",
          "done": true,
          "n": "3-month MRR signed"
        },
        {
          "s": "Invoice Raised",
          "d": "25 Mar 2026",
          "done": true,
          "n": "First invoice Rs.1,26,666"
        },
        {
          "s": "Invoice Paid",
          "d": "28 Mar 2026",
          "done": true,
          "n": "Paid in 3 days"
        },
        {
          "s": "Onboarding",
          "d": "30 Mar 2026",
          "done": true,
          "n": "Dashboard: NYK-2026-009"
        },
        {
          "s": "Active M1",
          "d": "01 Apr",
          "done": true,
          "n": "Paid 11 Apr"
        },
        {
          "s": "Active M2",
          "d": "01 May",
          "done": true,
          "n": "Paid 10 May"
        },
        {
          "s": "Active M3",
          "d": "01 Jun",
          "done": false,
          "n": "Invoice upcoming"
        }
      ]
    },
    {
      "id": 10,
      "name": "MCaffeine",
      "sh": "MCF",
      "bg": "rgba(34,197,94,.12)",
      "tc": "#86efac",
      "type": "onetime",
      "dur": "One-Time",
      "amt": 75000,
      "af": "Rs.75,000",
      "stage": "inv-paid",
      "ref": "REF-MCF-0040",
      "sales": "Riya Singh",
      "cam": "Karan Joshi",
      "biz": "Tarun Sharma",
      "ren": "--",
      "rm": "",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0040",
      "raised": "20 Mar",
      "due": "04 Apr",
      "paid": "01 Apr",
      "days": 12,
      "month": "mar",
      "nextAction": "Upsell to MRR plan",
      "actionDate": "01 Jun 2026",
      "aurg": "safe",
      "mrrI": [
        {
          "mo": "Mar 2026",
          "num": "#INV-0040",
          "ref": "REF-MCF-0040",
          "amt": "Rs.75,000",
          "raised": "20 Mar",
          "due": "04 Apr",
          "paid": "01 Apr",
          "st": "Paid"
        }
      ],
      "journey": [
        {
          "s": "Approval",
          "d": "15 Mar 2026",
          "done": true,
          "n": "From Tarun Sharma"
        },
        {
          "s": "Agreement",
          "d": "17 Mar 2026",
          "done": true,
          "n": "One-time signed"
        },
        {
          "s": "Invoice Raised",
          "d": "20 Mar 2026",
          "done": true,
          "n": "INV-0040 for Rs.75,000"
        },
        {
          "s": "Invoice Paid",
          "d": "01 Apr 2026",
          "done": true,
          "n": "Paid in 12 days"
        },
        {
          "s": "Onboarding",
          "d": "03 Apr 2026",
          "done": true,
          "n": "Dashboard: MCF-2026-010"
        },
        {
          "s": "Active/Delivered",
          "d": "15 Apr 2026",
          "done": true,
          "n": "Project delivered"
        },
        {
          "s": "Upsell Opportunity",
          "d": "01 Jun 2026",
          "done": false,
          "n": "Good MRR candidate"
        }
      ]
    },
    {
      "id": 11,
      "name": "Beardo",
      "sh": "BRD",
      "bg": "rgba(239,68,68,.12)",
      "tc": "#fca5a5",
      "type": "MRR",
      "dur": "3mo",
      "amt": 240000,
      "af": "Rs.2,40,000",
      "stage": "active",
      "ref": "REF-BRD-0035",
      "sales": "Aryan Shah",
      "cam": "Amit Verma",
      "biz": "Ashutosh Valani",
      "ren": "20 Aug 2026",
      "rm": "aug",
      "inv": "Paid",
      "ip": 100,
      "nda": true,
      "agr": true,
      "inum": "#INV-0035",
      "raised": "01 Feb",
      "due": "15 Feb",
      "paid": "12 Feb",
      "days": 11,
      "month": "feb",
      "nextAction": "Performance review before renewal",
      "actionDate": "25 Jul 2026",
      "aurg": "safe",
      "mrrI": [
        {
          "mo": "Feb 2026",
          "num": "#INV-0035",
          "ref": "REF-BRD-0035",
          "amt": "Rs.80,000",
          "raised": "01 Feb",
          "due": "15 Feb",
          "paid": "12 Feb",
          "st": "Paid"
        },
        {
          "mo": "Mar 2026",
          "num": "#INV-0041",
          "ref": "REF-BRD-0041",
          "amt": "Rs.80,000",
          "raised": "01 Mar",
          "due": "15 Mar",
          "paid": "11 Mar",
          "st": "Paid"
        },
        {
          "mo": "Apr 2026",
          "num": "#INV-0048",
          "ref": "REF-BRD-0048",
          "amt": "Rs.80,000",
          "raised": "01 Apr",
          "due": "15 Apr",
          "paid": "14 Apr",
          "st": "Paid"
        },
        {
          "mo": "May 2026",
          "num": "--",
          "ref": "--",
          "amt": "Rs.80,000",
          "raised": "01 May (expected)",
          "due": "--",
          "paid": "--",
          "st": "Upcoming"
        }
      ],
      "journey": [
        {
          "s": "Approval",
          "d": "25 Jan 2026",
          "done": true,
          "n": "From Ashutosh Valani"
        },
        {
          "s": "Agreement",
          "d": "27 Jan 2026",
          "done": true,
          "n": "3-month MRR signed"
        },
        {
          "s": "Invoice Raised",
          "d": "01 Feb 2026",
          "done": true,
          "n": "INV-0035 for Rs.80,000/mo"
        },
        {
          "s": "Invoice Paid",
          "d": "12 Feb 2026",
          "done": true,
          "n": "Paid in 11 days"
        },
        {
          "s": "Onboarding",
          "d": "14 Feb 2026",
          "done": true,
          "n": "Dashboard: BRD-2026-011"
        },
        {
          "s": "Active M1",
          "d": "01 Feb",
          "done": true,
          "n": "Paid"
        },
        {
          "s": "Active M2",
          "d": "01 Mar",
          "done": true,
          "n": "Paid"
        },
        {
          "s": "Active M3",
          "d": "01 Apr",
          "done": true,
          "n": "Paid"
        },
        {
          "s": "Renewal",
          "d": "20 Aug 2026",
          "done": false,
          "n": "Review before renewal"
        }
      ]
    }
  ],
  "churned": [
    {
      "id": 101,
      "name": "Plum Goodness",
      "sh": "PLM",
      "bg": "rgba(168,85,247,.15)",
      "tc": "#d8b4fe",
      "type": "MRR",
      "af": "Rs.1,80,000",
      "reason": "Budget Cut",
      "rsn": "budget",
      "sales": "Riya Singh",
      "cam": "Priya Malhotra",
      "biz": "Shankar Prasad",
      "cd": "02 May 2026",
      "cm": "may",
      "tenure": "3 months",
      "li": "REF-PLM-0036",
      "lia": "Rs.60,000",
      "lis": "Paid",
      "re": false
    },
    {
      "id": 102,
      "name": "Heads Up For Tails",
      "sh": "HFT",
      "bg": "rgba(34,197,94,.12)",
      "tc": "#86efac",
      "type": "onetime",
      "af": "Rs.95,000",
      "reason": "Competitor",
      "rsn": "competitor",
      "sales": "Aryan Shah",
      "cam": "Rohan Kumar",
      "biz": "Rashi Narang",
      "cd": "18 Apr 2026",
      "cm": "apr",
      "tenure": "1 month",
      "li": "REF-HFT-0033",
      "lia": "Rs.95,000",
      "lis": "Paid",
      "re": true
    },
    {
      "id": 103,
      "name": "Marico",
      "sh": "MRC",
      "bg": "rgba(245,158,11,.12)",
      "tc": "#fcd34d",
      "type": "MRR",
      "af": "Rs.4,20,000",
      "reason": "Dissatisfied",
      "rsn": "dissatisfied",
      "sales": "Mansi Patel",
      "cam": "Amit Verma",
      "biz": "Harsh Mariwala",
      "cd": "31 Mar 2026",
      "cm": "mar",
      "tenure": "2 months",
      "li": "REF-MRC-0030",
      "lia": "Rs.70,000",
      "lis": "Pending",
      "re": false
    },
    {
      "id": 104,
      "name": "Himalaya Herbals",
      "sh": "HIM",
      "bg": "rgba(59,130,246,.12)",
      "tc": "#93c5fd",
      "type": "MRR",
      "af": "Rs.2,80,000",
      "reason": "Budget Cut",
      "rsn": "budget",
      "sales": "Kiran Shah",
      "cam": "Karan Joshi",
      "biz": "Philipe Haydon",
      "cd": "15 Feb 2026",
      "cm": "feb",
      "tenure": "2 months",
      "li": "REF-HIM-0025",
      "lia": "Rs.1,40,000",
      "lis": "Paid",
      "re": true
    },
    {
      "id": 105,
      "name": "Forest Essentials",
      "sh": "FRE",
      "bg": "rgba(249,115,22,.12)",
      "tc": "#fdba74",
      "type": "onetime",
      "af": "Rs.1,50,000",
      "reason": "No Renewal",
      "rsn": "norenewal",
      "sales": "Sneha Tiwari",
      "cam": "Priya Malhotra",
      "biz": "Mira Kulkarni",
      "cd": "10 Jan 2026",
      "cm": "jan",
      "tenure": "1 month",
      "li": "REF-FRE-0018",
      "lia": "Rs.1,50,000",
      "lis": "Paid",
      "re": false
    }
  ]
};
