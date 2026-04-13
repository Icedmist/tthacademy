
import type { Course } from '@/lib/types';

export const courses: Omit<Course, 'progress'>[] = [
  // --- Futures Trading ---
  {
    id: 'futures-b-01',
    title: 'Introduction to Futures Trading',
    description: 'Learn the fundamental concepts of futures contracts and markets.',
    longDescription: 'This course provides a comprehensive introduction to the world of futures trading, from basic terminology to market participants. It is the essential starting point for anyone new to the field.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-01/600/400',
    modules: [
      { 
        title: 'Foundations of Futures', 
        lessons: [
          { 
            title: 'What Are Futures?', 
            content: 'Futures are financial contracts obligating the buyer to purchase an asset or the seller to sell an asset at a predetermined future date and price. This lesson covers the history of futures, the concept of standardization, and the role they play in risk management and speculation.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=w6-qU9v9e9E',
            assignment: 'Explain the difference between a forward contract and a futures contract in your own words.',
            completed: false 
          },
          { 
            title: 'How Markets Work', 
            content: 'Understand the mechanics of futures exchanges, the clearinghouse, and how orders are matched. We discuss liquidity, volume, and open interest as key indicators of market health.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=5P2sBf6Daqc',
            assignment: 'Research and name three major futures exchanges worldwide and one primary product traded on each.',
            completed: false 
          }
        ] 
      },
      { 
        title: 'Trading Mechanics', 
        lessons: [
          { 
            title: 'Leverage and Margin', 
            content: 'One of the most powerful and dangerous aspects of futures is leverage. Learn about initial margin, maintenance margin, and margin calls.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=R9pDuxo4d90',
            assignment: 'Calculate the total contract value of a crude oil future if the current price is $75 and the contract multiplier is 1,000.',
            completed: false 
          },
          { 
            title: 'Long vs. Short Positions', 
            content: 'Discover how traders profit from both rising and falling markets. We cover the concepts of "going long" (buying) and "going short" (selling).', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=q6eS8C2E7vM',
            assignment: 'Describe a scenario where a trader might want to enter a short position in the E-mini S&P 500 futures.',
            completed: false 
          }
        ] 
      },
      { 
        title: 'Risk Management', 
        lessons: [
          { 
            title: 'Stop Losses and Risk Ratios', 
            content: 'Capital preservation is key. Learn how to place stop-loss orders and how to calculate your risk-to-reward ratio for every trade.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Draft a simple risk management rule for yourself regarding the maximum percentage of your account you are willing to risk on a single trade.',
            completed: false 
          }
        ] 
      }
    ],
    finalAssessment: [{ questionText: 'Explain the concept of leverage in futures trading and describe one potential benefit and one major risk associated with it.' }]
  },
  {
    id: 'futures-b-02',
    title: 'Futures Markets Overview',
    description: 'Explore the different types of futures markets available to trade.',
    longDescription: 'Gain a broad understanding of the various futures markets, including commodities, financials, and equity indices. Learn what makes each market unique and how to choose which ones to focus on.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-02/600/400',
    modules: [
      {
        title: 'Physical Commodities',
        lessons: [
          { 
            title: 'Energy and Metals', 
            content: 'Dive into the highly volatile world of crude oil, natural gas, gold, and silver futures. Understand how global supply chains and geopolitical events drive these prices.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=5VjIdqGk1Z8',
            assignment: 'Identify two geopolitical events in the last 12 months that caused a spike in crude oil prices.',
            completed: false 
          },
          { 
            title: 'Agricultural Futures', 
            content: 'Learn about the "softs" and "grains" - from coffee and sugar to corn and wheat. Discover how weather patterns and harvest cycles affect your trades.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=R9pDuxo4d90',
            assignment: 'What is a "WASDE" report and why do agricultural traders watch it so closely?',
            completed: false 
          }
        ]
      },
      {
        title: 'Financial Futures',
        lessons: [
          { 
            title: 'Equity Indices and Interest Rates', 
            content: 'Understand the E-mini S&P 500, Nasdaq 100, and Treasury Bond futures. Learn how these instruments react to interest rate changes and corporate earnings.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=q6eS8C2E7vM',
            assignment: 'Explain why a rise in interest rates typically causes Treasury Bond prices to fall.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Compare physical commodity futures with financial index futures. What are the key differences in how they are settled at expiration?' }]
  },
  {
    id: 'futures-b-03',
    title: 'Basic Futures Trading Strategies',
    description: 'Learn simple, effective strategies for entering and exiting trades.',
    longDescription: 'This course introduces foundational trading strategies that you can apply immediately. Learn about trend-following, range trading, and breakout strategies for different market environments.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '6h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-03/600/400',
    modules: [
      {
        title: 'Strategic Foundations',
        lessons: [
          { 
            title: 'Trend Following Basics', 
            content: 'Trend following is the cornerstone of many successful trading systems. Learn how to identify a trend and use moving averages to confirm direction.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Open a 1-hour chart of any future and identify three clear uptrends and three clear downtrends.',
            completed: false 
          },
          { 
            title: 'Support and Resistance Trading', 
            content: 'Learn how to find "walls" in the market where price is likely to bounce. We cover horizontal levels and dynamic support using trendlines.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=w6-qU9v9e9E',
            assignment: 'Draw three horizontal support/resistance lines on a daily chart and explain why you chose those specific levels.',
            completed: false 
          }
        ]
      },
      {
        title: 'Breakout Strategies',
        lessons: [
          { 
            title: 'Identifying High-Probability Breakouts', 
            content: 'Trading breakouts can be highly profitable but also risky due to "fakeouts". Learn how to use volume to confirm a breakout.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=5P2sBf6Daqc',
            assignment: 'Define a "false breakout" and describe one way to filter it out using an additional indicator.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Describe the three core components of a trading strategy: Entry, Exit, and Risk Management, using the Trend Following approach as an example.' }]
  },
  {
    id: 'futures-b-04',
    title: 'Technical Analysis for Futures',
    description: 'Understand how to read charts and use indicators to make trading decisions.',
    longDescription: 'Technical analysis is a cornerstone of futures trading. This course covers chart patterns, support and resistance, moving averages, and other key indicators that help you time your entries and exits.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '7h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-04/600/400',
    modules: [
      {
        title: 'Charting Foundations',
        lessons: [
          { 
            title: 'Candlestick Anatomy', 
            content: 'Learn how to read price action through Japanese candlesticks. We cover open, high, low, and close values and what they tell us about market sentiment.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=5VjIdqGk1Z8',
            assignment: 'Identify a "Doji" and a "Hammer" candle on a recent daily gold chart.',
            completed: false 
          },
          { 
            title: 'Moving Averages', 
            content: 'Moving averages smooth out price data to identify the trend. Learn the difference between Simple (SMA) and Exponential (EMA) moving averages.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=R9pDuxo4d90',
            assignment: 'Plot a 200-period EMA on a Nasdaq chart and describe what happens when price touches it.',
            completed: false 
          }
        ]
      },
      {
        title: 'Indicators and Oscillators',
        lessons: [
          { 
            title: 'RSI and Overbought/Oversold', 
            content: 'The Relative Strength Index (RSI) helps identify potential reversal points. Learn how to use it to spot momentum divergence.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Find a recent example where RSI divergence predicted a trend change in the Crude Oil market.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain how the combination of a moving average and a candlestick pattern (like a hammer) can create a high-probability trading signal.' }]
  },
  {
    id: 'futures-b-05',
    title: 'Fundamental Analysis in Futures',
    description: 'Learn how economic data and news events impact futures prices.',
    longDescription: 'Go beyond the charts to understand the real-world factors that drive markets. This course covers supply and demand, economic reports, and geopolitical events that move millions.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-05/600/400',
    modules: [
      {
        title: 'Economic Drivers',
        lessons: [
          { 
            title: 'Interest Rates and the Fed', 
            content: 'Interest rates are the lifeblood of the financial markets. Learn how the Federal Reserve\'s decisions impact equity indices and bond futures.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=q6eS8C2E7vM',
            assignment: 'Research the most recent FOMC meeting results and summarize how the market reacted.',
            completed: false 
          },
          { 
            title: 'Inventory and Supply Reports', 
            content: 'For commodity traders, reports like the EIA Petroleum Status Report or the USDA WASDE are critical. Learn how to interpret these "shocks".', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=w6-qU9v9e9E',
            assignment: 'Look up the next release date for the EIA Weekly Petroleum Status Report.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the concept of "Contango" and "Backwardation" in the context of fundamental supply and demand for commodity futures.' }]
  },
  {
    id: 'futures-b-06',
    title: 'Risk Management Essentials',
    description: 'Master the critical skill of protecting your capital while trading.',
    longDescription: 'The most important aspect of trading is managing risk. Learn about position sizing, stop-loss orders, and maintaining a favorable risk-to-reward ratio to ensure long-term survival.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-06/600/400',
    modules: [
      {
        title: 'Capital Preservation',
        lessons: [
          { 
            title: 'The 1% Rule', 
            content: 'Never risk more than 1% of your account on a single trade. We will show you how to calculate position sizes to stick to this golden rule.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=5P2sBf6Daqc',
            assignment: 'If you have a $5,000 account, what is the maximum dollar amount you should risk on one trade according to the 1% rule?',
            completed: false 
          },
          { 
            title: 'Stop Loss Execution', 
            content: 'A stop loss is your safety net. Learn the different types of stops: hard stops, trailing stops, and mental stops (and why you should avoid mental stops).', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Explain why keeping a stop loss is more important for futures traders than for traditional buy-and-hold investors.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Calculate the position size for a trade with a $200 stop loss on a $10,000 account. How many contracts can you trade if your maximum risk is 1%?' }]
  },
  {
    id: 'futures-b-07',
    title: 'Trading Psychology',
    description: 'Understand the mental and emotional challenges of trading and how to overcome them.',
    longDescription: 'The biggest battle in trading is often with yourself. This course addresses common psychological pitfalls like fear, greed, and FOMO, providing strategies to develop professional discipline.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-07/600/400',
    modules: [
      {
        title: 'Emotional Control',
        lessons: [
          { 
            title: 'Overcoming Fear and Greed', 
            content: 'Fear of loss and greed for gain are the primary drivers of trading errors. Learn how to recognize these emotions in real-time and revert to your plan.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=R9pDuxo4d90',
            assignment: 'Maintain a 1-day mood journal while watching live charts. Note every time you feel an impulse to trade.',
            completed: false 
          },
          { 
            title: 'The Danger of FOMO', 
            content: 'Fear Of Missing Out (FOMO) leads to chasing trades at bad prices. Learn the mindset shift required to accept that there will always be another opportunity.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=5VjIdqGk1Z8',
            assignment: 'Identify a recent "parabolic move" in a market and explain why entering at the peak would have been a psychological trap.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is "revenge trading" and what are two practical steps a trader can take to avoid it after a significant loss?' }]
  },
  {
    id: 'futures-b-08',
    title: 'Futures Trading Platforms',
    description: 'A practical guide to setting up and using popular trading software.',
    longDescription: 'Get hands-on experience with leading trading platforms like NinjaTrader and TradingView. This course walks you through setting up charts, placing orders, and managing trades efficiently.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-08/600/400',
    modules: [
      {
        title: 'Platform Mastering',
        lessons: [
          { 
            title: 'Order Types in Depth', 
            content: 'Master the difference between Market, Limit, Stop, and MIT (Market-if-Touched) orders. Learn how to use "Bracket Orders" for automatic risk management.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Simulate putting on a "Bracket Order" with a 1:2 risk-to-reward ratio on a demo account.',
            completed: false 
          },
          { 
            title: 'Customizing Your Workspace', 
            content: 'A clean workspace reduces decision fatigue. Learn how to set up DOM (Depth of Market), charts, and time & sales for optimal focus.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=w6-qU9v9e9E',
            assignment: 'Take a screenshot of a "dirty" chart and then organize it into a professional layout.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What are the technical advantages of using a Limit order over a Market order in a high-volatility futures market?' }]
  },
  {
    id: 'futures-b-09',
    title: 'Simulated Trading Practice',
    description: 'Apply your knowledge in a risk-free environment with a trading simulator.',
    longDescription: 'Before you risk real capital, practice is essential. This course guides you through setting up a demo account and building confidence through mechanical execution.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '10h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-09/600/400',
    modules: [
      {
        title: 'The Simulator Phase',
        lessons: [
          { 
            title: 'Building Muscle Memory', 
            content: 'Treat the simulator as a real account. Practice entering and exiting trades until the platform mechanics become second nature.', 
            duration: '5h', 
            videoUrl: 'https://www.youtube.com/watch?v=5P2sBf6Daqc',
            assignment: 'Execute 10 perfect trades (following your rules) in a simulator without breaking any risk management guidelines.',
            completed: false 
          },
          { 
            title: 'Journaling Your Demo Trades', 
            content: 'A journal is your most powerful growth tool. Learn how to track entry reasons, exits, and emotional states for every demo trade.', 
            duration: '5h', 
            videoUrl: 'https://www.youtube.com/watch?v=q6eS8C2E7vM',
            assignment: 'Create a spreadsheet for your trading journal and input your first 5 demo trades.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is it dangerous to jump from a simulator to a live account without a proven track record of consistency in the simulator?' }]
  },
  {
    id: 'futures-b-10',
    title: 'Building a Trading Plan',
    description: 'Create a personalized and structured plan for your trading business.',
    longDescription: 'A trading plan is your roadmap. This course will guide you through creating a comprehensive document that covers your strategy, risk management, and long-term financial goals.',
    category: 'Futures Trading',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/futures-b-10/600/400',
    modules: [
      {
        title: 'Strategic Architecture',
        lessons: [
          { 
            title: 'Defining Your Edge', 
            content: 'What is your advantage in the market? Learn how to define your "Edge" in simple, rule-based terms that can be repeated consistently.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=5VjIdqGk1Z8',
            assignment: 'Write a one-paragraph description of your current trading "Edge" (e.g., I trade pullbacks in 5-minute trends).',
            completed: false 
          },
          { 
            title: 'The Checklist Manifesto', 
            content: 'Professional traders use checklists to avoid impulsive mistakes. Learn how to build a pre-trade checklist that covers setup, risk, and target.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=R9pDuxo4d90',
            assignment: 'Draft a 10-point checklist that you must complete before clicking the "Buy" button.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'List the five essential sections of a professional trading plan, from Strategy to Risk Management.' }]
  },
  {
    id: 'futures-i-01',
    title: 'Advanced Trading Strategies',
    description: 'Explore more complex strategies like scalping, swing trading, and pairs trading.',
    longDescription: 'Go beyond the basics with advanced tactical strategies. This course covers multi-timeframe analysis and order flow techniques for the professional trader.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '12h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-01/600/400',
    modules: [
      {
        title: 'Institutional Tactics',
        lessons: [
          { 
            title: 'Inter-market Analysis', 
            content: 'Understand how different markets move together. Learn how the US Dollar, Bond yields, and S&P 500 futures correlate and diverge.', 
            duration: '6h', 
            videoUrl: 'https://www.youtube.com/watch?v=I0vI_v8EayA',
            assignment: 'Find a recent example of a "divergence" where the S&P 500 rose while Bond yields also rose sharply.',
            completed: false 
          },
          { 
            title: 'Mean Reversion Strategies', 
            content: 'Markets spend 70% of the time in ranges. Learn how to use Bollinger Bands and RSI to trade "mean reversion" back to the average price.', 
            duration: '6h', 
            videoUrl: 'https://www.youtube.com/watch?v=w6-qU9v9e9E',
            assignment: 'Explain why mean reversion strategies have a higher win rate but typically smaller gains than trend-following.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Describe a "Pairs Trade" between two correlated futures markets, such as Gold and Silver. How does a trader profit from the spread between them?' }]
  },
  {
    id: 'futures-i-02',
    title: 'Quantitative Analysis',
    description: 'Apply statistical methods to analyze market data and validate trading ideas.',
    longDescription: 'Introduce a quantitative edge to your trading. This course covers statistical concepts like correlation, regression, and the step-by-step process of backtesting a trading strategy to scientifically validate your ideas and avoid common biases.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '15h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-02/600/400',
    modules: [{title: 'Trading by Numbers', lessons: [{ title: 'Statistical Foundations & Backtesting', content: 'Learn how to apply concepts like standard deviation and correlation to market data. We will walk through building a simple backtesting engine in Python to test a moving average crossover strategy.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: "You notice a strong positive correlation between Gold and Silver futures. How could you potentially use this information to create a pairs trading strategy? What are the main risks of such a strategy?" }]
  },
  {
    id: 'futures-i-03',
    title: 'Algorithmic Trading Introduction',
    description: 'Learn the basics of designing and implementing automated trading systems.',
    longDescription: 'An introduction to the world of algorithmic trading. This course covers the fundamental concepts of system design, backtesting, and automated execution.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '18h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-03/600/400',
    modules: [{ title: 'Automating Strategies', lessons: [{ title: 'System Design Basics', content: 'Learn the components of an automated trading system, from data handling and signal generation to execution and risk management.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "overfitting" in the context of backtesting a trading algorithm, and why is it a significant problem?' }]
  },
  {
    id: 'futures-i-04',
    title: 'Options on Futures',
    description: 'Understand how to use options to hedge and speculate on futures contracts.',
    longDescription: 'Options add another dimension to your trading. Learn the basics of calls and puts, common strategies like covered calls and protective puts, and how to analyze options greeks.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '14h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-04/600/400',
    modules: [{ title: 'Options Basics', lessons: [{ title: 'Calls and Puts', content: 'Understand the fundamental building blocks of options, including rights vs. obligations, strike price, and expiration date.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the primary benefit of buying a put option on a futures contract as a hedge, compared to simply short-selling the future itself?' }]
  },
  {
    id: 'futures-i-05',
    title: 'Market Microstructure',
    description: 'Dive deep into the mechanics of how orders are executed and prices are formed.',
    longDescription: 'Understand the plumbing of the market. This course covers order books, liquidity, bid-ask spreads, and the impact of different order types on the market.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '10h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-05/600/400',
    modules: [{ title: 'The Order Book', lessons: [{ title: 'Understanding Liquidity', content: 'Learn how liquidity affects your trading execution, slippage, and overall transaction costs. Analyze order book depth to gauge market sentiment.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the "bid-ask spread" and what does a wide vs. a narrow spread typically indicate about a market\'s liquidity?' }]
  },
  {
    id: 'futures-i-06',
    title: 'Hedging Techniques',
    description: 'Learn how businesses and institutions use futures to manage price risk.',
    longDescription: 'This course is for those who want to understand the original purpose of futures markets. Learn practical hedging strategies for producers, consumers, and portfolio managers.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '12h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-06/600/400',
    modules: [{ title: 'Managing Risk', lessons: [{ title: 'A Farmer\'s Hedge', content: 'A case study on how a corn farmer can use short positions in corn futures to lock in a price for their upcoming harvest and protect against price declines.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'An airline is concerned about rising fuel costs. Explain how they could use crude oil futures to hedge this risk. What is the name of this type of hedge?' }]
  },
  {
    id: 'futures-i-07',
    title: 'Portfolio Management with Futures',
    description: 'Learn how to use futures to enhance and protect a diversified investment portfolio.',
    longDescription: 'Futures can be powerful tools for portfolio managers. Learn how to use index futures to adjust market exposure, hedge against downturns, and manage cash flows.',
    category: 'Futures Trading',
    level: 'Intermediate',
    duration: '10h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/futures-i-07/600/400',
    modules: [{ title: 'Portfolio Applications', lessons: [{ title: 'Beta Hedging', content: 'Learn to hedge the systematic market risk of a stock portfolio by shorting an appropriate amount of stock index futures.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'How can a portfolio manager use futures to "equitize" a large cash position quickly and efficiently, and why might they do this?' }]
  },
  {
    id: 'futures-a-01',
    title: 'High-Frequency Trading',
    description: 'An exploration of the strategies and technologies used in automated trading systems.',
    longDescription: 'Move from discretionary trading to systematic execution. This course provides a high-level overview of algorithmic trading, discussing system design, execution logic, and the infrastructure needed to run automated strategies.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '20h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-01/600/400',
    modules: [{title: 'The Automation Game', lessons: [{ title: 'System Design and Execution', content: 'An overview of designing a trading algorithm, from signal generation to order management. We will discuss the pros and cons of event-driven vs. vectorized backtesting.', duration: '2.5h', completed: false }] }],
    finalAssessment: [{ questionText: "What is 'slippage' in the context of algorithmic trading, and why is it a critical factor to consider when moving from a backtest to live trading?" }]
  },
  {
    id: 'futures-a-02',
    title: 'Machine Learning for Trading',
    description: 'Apply machine learning techniques to develop and test trading models.',
    longDescription: 'Harness the power of AI for trading. This course introduces how to apply machine learning models like regression and classification to predict market movements.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-02/600/400',
    modules: [{ title: 'AI in Markets', lessons: [{ title: 'Feature Engineering', content: 'Learn to create predictive features from raw market data, such as volatility, momentum, and other statistical measures, to feed into your models.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the danger of "lookahead bias" when developing a machine learning model for financial forecasting?' }]
  },
  {
    id: 'futures-a-03',
    title: 'Market Making in Futures',
    description: 'Understand the theory and practice of providing liquidity to futures markets.',
    longDescription: 'Market making is a specialized form of trading. This course delves into the strategies used to quote bid and ask prices and manage the resulting inventory risk.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '25h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-03/600/400',
    modules: [{ title: 'Providing Liquidity', lessons: [{ title: 'Inventory Management', content: 'Learn strategies for managing the risk of holding an inventory of futures contracts, including delta hedging and risk recycling.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "adverse selection" for a market maker, and how does it relate to the bid-ask spread?' }]
  },
  {
    id: 'futures-a-04',
    title: 'Exotic Futures Products',
    description: 'Explore less common but powerful futures products like volatility and weather futures.',
    longDescription: 'Move beyond traditional markets to explore futures on abstract concepts. This course covers VIX futures for trading volatility and weather derivatives for hedging climate risk.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '15h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-04/600/400',
    modules: [{ title: 'Beyond Commodities', lessons: [{ title: 'VIX Futures', content: 'Learn to trade market volatility itself through VIX futures and understand concepts like contango and backwardation in the VIX term structure.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'Who would be a natural user (hedger) of weather futures based on heating degree days (HDD)?' }]
  },
  {
    id: 'futures-a-05',
    title: 'Global Futures Trading',
    description: 'Understand the nuances of trading across different international exchanges.',
    longDescription: 'The futures market is global. This course explores the major international exchanges like Eurex and SGX, covering different time zones, regulations, and product offerings.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '18h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-05/600/400',
    modules: [{ title: 'Trading Around the World', lessons: [{ title: 'Eurex and Asian Markets', content: 'Explore products and strategies for non-US markets, including key differences in margin requirements and trading hours.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a key regulatory consideration when trading on a futures exchange in a different country?' }]
  },
  {
    id: 'futures-a-06',
    title: 'Systemic Risk Analysis',
    description: 'Analyze how risks can propagate through the interconnected financial system.',
    longDescription: 'This course provides a macro view of the financial markets, focusing on how leverage and interconnectedness can lead to systemic risk and market crises.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '22h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-06/600/400',
    modules: [{ title: 'The Big Picture', lessons: [{ title: 'Leverage Cycles', content: 'Understand how leverage builds up in the financial system during good times and unwinds violently during crises, and the role of derivatives in this cycle.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What was the role of futures and derivatives, specifically Credit Default Swaps (CDS), in the 2008 financial crisis?' }]
  },
  {
    id: 'futures-a-07',
    title: 'Advanced Legal and Regulatory Issues',
    description: 'A deep dive into the legal framework governing futures trading.',
    longDescription: 'For aspiring professionals, this course covers the complex legal and regulatory landscape, including CFTC rules, Dodd-Frank, and compliance best practices.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '20h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-07/600/400',
    modules: [{ title: 'Compliance', lessons: [{ title: 'CFTC Regulations', content: 'An overview of the key rules from the Commodity Futures Trading Commission governing US futures markets, including position limits and reporting requirements.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the main purpose of the Commodity Futures Trading Commission (CFTC)?' }]
  },
  {
    id: 'futures-a-08',
    title: 'Futures Trading Research',
    description: 'Learn how to conduct original research to find new trading edges.',
    longDescription: 'This capstone course teaches the process of academic-style research in trading. Formulate a hypothesis, gather data, test it rigorously, and write a research paper on your findings.',
    category: 'Futures Trading',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/futures-a-08/600/400',
    modules: [{ title: 'Finding Your Edge', lessons: [{ title: 'Hypothesis Testing', content: 'Learn the scientific method for validating trading ideas, including formulating a null hypothesis and using statistical tests to determine significance.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'Develop a simple, testable hypothesis for a new trading strategy. For example, "Buying S&P 500 futures after a 2% down day leads to positive returns over the next 5 days."' }]
  },
  // --- Web3 ---
  {
    id: 'web3-b-01',
    title: 'Introduction to Web3',
    description: 'A high-level overview of the Web3 ecosystem, its key players, and its potential.',
    longDescription: "Get a bird's-eye view of the entire Web3 landscape. We explore major platforms like Ethereum and Solana, discuss different use cases from DeFi to NFTs, and look at the future potential of a decentralized internet.",
    category: 'Web3',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-01/600/400',
    modules: [{title: 'The Web3 Landscape', lessons: [{ title: 'Exploring the Ecosystem', content: 'Discover the key components of the Web3 world, including blockchains, smart contracts, decentralized applications (dApps), and wallets. We will differentiate Web3 from Web2 and discuss the core philosophy of user ownership.', duration: '30m', completed: false }] }],
    finalAssessment: [{ questionText: "Explain the concept of 'decentralization' in the context of Web3. How does it differ from the traditional Web2 model (e.g., Facebook, Google), and what is one major advantage and one major disadvantage of this approach?" }]
  },
  {
    id: 'web3-b-02',
    title: 'Blockchain Fundamentals',
    description: 'Understand the core technology that powers Web3.',
    longDescription: 'This course dives into the mechanics of blockchain. Learn about blocks, chains, cryptographic hashing, and consensus mechanisms like Proof of Work and Proof of Stake.',
    category: 'Web3',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-02/600/400',
    modules: [
      {
        title: 'Under the Hood',
        lessons: [
          { 
            title: 'Hashes and Immutability', 
            content: 'Learn why a blockchain cannot be modified easily. We explore the SHA-256 algorithm and how blocks are linked together.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=_160oMzblY8',
            assignment: 'Use an online SHA-256 generator to see how changing one letter in a sentence completely changes the hash.',
            completed: false 
          },
          { 
            title: 'Consensus Mechanisms', 
            content: 'How do thousands of nodes agree on the truth? Compare Proof of Work (Bitcoin) with Proof of Stake (Ethereum).', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=pWGLtjG-F5c',
            assignment: 'Describe the role of a "Validator" in a Proof of Stake network.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is it historically accurate to say that blockchain solves the "Byzantine Generals Problem"?' }]
  },
  {
    id: 'web3-b-03',
    title: 'Cryptocurrencies 101',
    description: 'A beginner\'s guide to Bitcoin, Ethereum, and other major cryptocurrencies.',
    longDescription: 'This course provides an overview of the most important cryptocurrencies. Understand their different use cases, tokenomics, and roles in the Web3 ecosystem.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-03/600/400',
    modules: [
      {
        title: 'The Big Players',
        lessons: [
          { 
            title: 'Bitcoin: Digital Gold', 
            content: 'Explore Bitcoin\'s role as a store of value and a hedge against inflation. Learn why it is often called "digital gold".', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
            assignment: 'Find the current "Market Cap" of Bitcoin using a site like CoinMarketCap.',
            completed: false 
          },
          { 
            title: 'Ethereum: The World Computer', 
            content: 'Understand Ethereum\'s mission to build a programmable financial system. Explore Ether as gas and the primary asset for DApps.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=jxLkbJavP6Y',
            assignment: 'What is the ERC-20 token standard, and why is it important for the Ethereum ecosystem?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Differentiate between a "Coin" (Native to a blockchain) and a "Token" (Built on top of a blockchain).' }]
  },
  {
    id: 'web3-b-04',
    title: 'Smart Contracts Basics',
    description: 'Learn what smart contracts are and how they automate processes on the blockchain.',
    longDescription: 'Smart contracts are the backbone of Web3. This course explains what they are, how they work, and their potential to revolutionize industries through automation.',
    category: 'Web3',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-04/600/400',
    modules: [
      {
        title: 'Automating Trust',
        lessons: [
          { 
            title: 'How Smart Contracts Work', 
            content: 'Think of them as "If-Then" statements on the blockchain. We cover the lifecycle of a contract from deployment to execution.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=ZE2HxTmxNWg',
            assignment: 'Write a simple "If-Then" logic for a hypothetical insurance contract that pays out if a flight is delayed.',
            completed: false 
          },
          { 
            title: 'Real World Examples', 
            content: 'Explore how smart contracts are used in DeFi, supply chains, and even real estate to remove expensive third parties.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=pWGLtjG-F5c',
            assignment: 'Identify one industry, besides finance, that could be disrupted by smart contract technology.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What does "immutability" mean in the context of a deployed smart contract?' }]
  },
  {
    id: 'web3-b-05',
    title: 'Decentralized Applications (DApps)',
    description: 'Discover the world of DApps and how they differ from traditional applications.',
    longDescription: 'DApps are the frontend of the decentralized world. Learn about the architecture of a DApp and how it interacts with the blockchain.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-05/600/400',
    modules: [
      {
        title: 'Building Decentralized',
        lessons: [
          { 
            title: 'What makes a DApp?', 
            content: 'DApps have back-ends on the blockchain. Learn about the tech stack: Frontend (React) + Smart Contracts (Solidity) + Provider (MetaMask).', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=CoNBO82D-U0',
            assignment: 'Visit a DApp like Uniswap or OpenSea and explore the interface without connecting a wallet.',
            completed: false 
          },
          { 
            title: 'DApp Governance (DAOs)', 
            content: 'Many DApps are governed by their users through Decentralized Autonomous Organizations. Learn about governance tokens.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=CoNBO82D-U0',
            assignment: 'What is a "Governance Token" and how is it used to vote on protocol changes?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Contrast the "Server-Client" model of Web2 with the "Peer-to-Peer" model of Web3 DApps.' }]
  },
  {
    id: 'web3-b-06',
    title: 'Web3 Wallets (MetaMask)',
    description: 'A practical guide to setting up and using digital wallets.',
    longDescription: 'Your wallet is your identity and your vault in Web3. This course provides a hands-on guide to using MetaMask, connecting to different networks, and managing your assets safely.',
    category: 'Web3',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-06/600/400',
    modules: [
      {
        title: 'Connecting to the Chain',
        lessons: [
          { 
            title: 'Configuring MetaMask', 
            content: 'Learn how to install the extension, create a secure wallet, and understand the difference between Mainnet and Testnets (like Sepolia).', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
            assignment: 'Install the MetaMask extension and create a new wallet. (Do NOT share your seed phrase with anyone).',
            completed: false 
          },
          { 
            title: 'Interacting with DApps', 
            content: 'Learn the sequence of a transaction: Connect, Approve, and Confirm. Understand how to read the details of a transaction before signing.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
            assignment: 'Connect your wallet to a testnet faucet (like Sepolia) and request some test tokens.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is it necessary to "Approve" a smart contract to spend your tokens before you can actually execute a swap or deposit?' }]
  },
  {
    id: 'web3-b-07',
    title: 'NFTs Explained',
    description: 'Understand the technology behind Non-Fungible Tokens and their use cases.',
    longDescription: 'NFTs represent unique digital ownership. This course explains the ERC-721 and ERC-1155 standards, how metadata works, and where the actual files are stored (IPFS).',
    category: 'Web3',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-07/600/400',
    modules: [
      {
        title: 'Digital Ownership',
        lessons: [
          { 
            title: 'Fungible vs. Non-Fungible', 
            content: 'Learn why 1 Bitcoin is exactly like another, but 1 NFT "Bored Ape" is different from another. We discuss scarcity and provenance.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=NNQLJcJEzv0',
            assignment: 'Give an example of a physical object that is "Fungible" and one that is "Non-Fungible".',
            completed: false 
          },
          { 
            title: 'NFT Metadata and IPFS', 
            content: 'Where is the image? Learn why putting large images on a blockchain is too expensive and how IPFS provides a decentralized alternative.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=NNQLJcJEzv0',
            assignment: 'Research what "IPFS" stands for and how it differs from traditional cloud storage like Google Drive.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is the ERC-721 token standard, and how does it differ from the standard ERC-20 cryptocurrency token?' }]
  },
  {
    id: 'web3-b-08',
    title: 'Web3 Security',
    description: 'Learn the basic principles of staying safe in the Web3 world.',
    longDescription: 'Decentralization means you are responsible for your own safety. Learn about phishing, malicious contract approvals, and the importance of hardware wallets.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-08/600/400',
    modules: [
      {
        title: 'Wall of Protection',
        lessons: [
          { 
            title: 'Phishing and Social Engineering', 
            content: 'Learn how scammers try to get your seed phrase. We cover "Ice Phishing" and malicious browser extensions.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=_160oMzblY8',
            assignment: 'Identify three red flags in a "Urgent" email claiming your wallet has been compromised.',
            completed: false 
          },
          { 
            title: 'Contract Approval Risks', 
            content: 'Interacting with a DApp can give it permission to drain your wallet. Learn how to audit your approvals using tools like Revoke.cash.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=_160oMzblY8',
            assignment: 'Visit Revoke.cash (Connect wallet if you have one) and see if you have any active project approvals.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why should you NEVER share your Seed Phrase with a "Customer Support" agent on Discord or Telegram?' }]
  },
  {
    id: 'web3-b-09',
    title: 'Ethereum for Beginners',
    description: 'A deep dive into the world\'s leading smart contract platform.',
    longDescription: 'Ethereum is the foundation of Web3. This course explores its history, the EVM, the role of gas fees, and the roadmap toward scalability (Layer 2s).',
    category: 'Web3',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-09/600/400',
    modules: [
      {
        title: 'The World Computer',
        lessons: [
          { 
            title: 'Gas and Network Fees', 
            content: 'Learn how gas is calculated (EIP-1559) and why some transactions are more expensive than others.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=jxLkbJavP6Y',
            assignment: 'Check the current "Gas Price" (in Gwei) using an Ethereum Gas Tracker.',
            completed: false 
          },
          { 
            title: 'Introduction to Layer 2', 
            content: 'Ethereum alone is too slow for global use. Learn about Rollups (Arbitrum, Optimism) and how they make trades cheaper and faster.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=jxLkbJavP6Y',
            assignment: 'Identify two major "Layer 2" networks currently live on Ethereum.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the relationship between Ethereum (Layer 1) and a Rollup (Layer 2) using a simple analogy.' }]
  },
  {
    id: 'web3-b-10',
    title: 'Web3 Development Tools',
    description: 'An overview of the essential tools for building on Web3.',
    longDescription: 'Get familiar with the Web3 developer stack. This course introduces tools like Remix for quick prototyping and Hardhat for professional local development.',
    category: 'Web3',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/web3-b-10/600/400',
    modules: [
      {
        title: 'The Developer Stack',
        lessons: [
          { 
            title: 'Intro to Remix IDE', 
            content: 'Remix is a browser-based IDE for writing and deploying Solidity. Learn how to write your first "Hello World" smart contract.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
            assignment: 'Open the Remix IDE in your browser and compile the default "Storage.sol" contract.',
            completed: false 
          },
          { 
            title: 'Local Dev Environments', 
            content: 'For larger projects, you need Hardhat or Foundry. Learn about testing, deploying, and script automation.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=CoNBO82D-U0',
            assignment: 'What are the benefits of using a local development environment versus an online IDE?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is the primary language used to write smart contracts on Ethereum and other EVM-compatible chains?' }]
  },
  {
    id: 'web3-i-01',
    title: 'Advanced Smart Contract Development',
    description: 'Learn about upgradable contracts, proxy patterns, and advanced data structures.',
    longDescription: 'Take your Solidity skills to the next level. This course covers advanced patterns for writing flexible and secure smart contracts.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '20h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-01/600/400',
    modules: [{ title: 'Contract Architecture', lessons: [{ title: 'Proxy Patterns', content: 'Learn how to make your smart contracts upgradable using patterns like the Transparent Upgradeable Proxy to fix bugs or add new features after deployment.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'Why is it important for smart contracts to be upgradable, and what is one major security risk of using a proxy pattern?' }]
  },
  {
    id: 'web3-i-02',
    title: 'Solidity Programming',
    description: 'A comprehensive guide to Solidity, from basics to advanced features.',
    longDescription: 'This course is a deep dive into the Solidity language. It covers everything from basic syntax to assembly, libraries, and inheritance.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '25h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-02/600/400',
    modules: [{ title: 'Mastering Solidity', lessons: [{ title: 'Assembly and Low-Level Calls', content: 'Learn to use inline assembly (`assembly {}`) for fine-grained control and gas optimization, but also understand the risks involved.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'When might you use `assembly` in a Solidity contract, and what is a key danger to be aware of when doing so?' }]
  },
  {
    id: 'web3-i-03',
    title: 'Web3 Frontend Development',
    description: 'Learn to build beautiful and functional interfaces for DApps.',
    longDescription: 'Connect the frontend to the backend. This course teaches you how to use libraries like ethers.js and wagmi to build seamless user experiences for your DApps.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '22h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-03/600/400',
    modules: [{ title: 'DApp Interfaces', lessons: [{ title: 'Using wagmi Hooks', content: 'Learn to simplify wallet connections, network switching, and contract interactions using the powerful and easy-to-use React Hooks provided by wagmi.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What problem do libraries like wagmi or web3-react solve for frontend developers building DApps?' }]
  },
  {
    id: 'web3-i-04',
    title: 'Blockchain Scalability',
    description: 'Explore solutions to the blockchain trilemma, including Layer 2 rollups.',
    longDescription: 'Scalability is a major challenge for blockchains. This course explores different solutions, with a deep dive into Optimistic and ZK-Rollups.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '18h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-04/600/400',
    modules: [{ title: 'Layer 2 Solutions', lessons: [{ title: 'Optimistic vs. ZK-Rollups', content: 'Understand the tradeoffs between different Layer 2 technologies, focusing on fraud proofs vs. validity proofs.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the main difference between an Optimistic Rollup and a ZK-Rollup in terms of how they prove the validity of transactions to Layer 1?' }]
  },
  {
    id: 'web3-i-05',
    title: 'DeFi Protocols',
    description: 'A deep dive into the mechanics of decentralized finance applications.',
    longDescription: 'Explore the world of "money legos." This course dissects the smart contracts behind lending protocols, decentralized exchanges, and yield farming.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '20h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-05/600/400',
    modules: [{ title: 'Money Legos', lessons: [{ title: 'Automated Market Makers (AMMs)', content: 'Learn how platforms like Uniswap use liquidity pools and algorithms to facilitate trading without a traditional order book.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'How does an Automated Market Maker (AMM) like Uniswap differ from a traditional order book exchange like the New York Stock Exchange?' }]
  },
  {
    id: 'web3-i-06',
    title: 'NFT Marketplaces',
    description: 'Learn the architecture and development of platforms like OpenSea.',
    longDescription: 'This course teaches you how to build your own NFT marketplace from scratch, covering both the smart contracts and the frontend.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '24h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-06/600/400',
    modules: [{ title: 'Building Your Own OpenSea', lessons: [{ title: 'ERC-721 and ERC-1155', content: 'Understand the different NFT standards and when to use each for different types of digital assets.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'When would you choose to use an ERC-1155 token standard instead of the more common ERC-721 for an NFT project?' }]
  },
  {
    id: 'web3-i-07',
    title: 'Web3 Security Audits',
    description: 'Learn the process and tools used to perform security audits on smart contracts.',
    longDescription: 'Become a smart contract security expert. This course covers the methodologies, tools, and mindset required to find and report vulnerabilities in Web3 applications.',
    category: 'Web3',
    level: 'Intermediate',
    duration: '20h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/web3-i-07/600/400',
    modules: [{ title: 'Finding Bugs', lessons: [{ title: 'Static and Dynamic Analysis', content: 'Learn to use automated tools like Slither for static analysis and tools like Foundry for dynamic analysis (fuzzing) to find bugs.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is static analysis in the context of smart contract auditing, and what is one common vulnerability it can help detect?' }]
  },
  {
    id: 'web3-a-01',
    title: 'Zero-Knowledge Proofs',
    description: 'An advanced course on the cryptography that enables privacy and scalability.',
    longDescription: 'Zero-Knowledge Proofs are a cutting-edge technology. This course provides a deep dive into the mathematics and applications of ZKPs, including ZK-Rollups and privacy-preserving applications.',
    category: 'Web3',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-01/600/400',
    modules: [{ title: 'The Magic of ZK', lessons: [{ title: 'SNARKs vs. STARKs', content: 'Understand the tradeoffs between different ZKP systems in terms of proof size, prover time, and trusted setups.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the "zero-knowledge" property of a ZKP, and why is it important for privacy?' }]
  },
  {
    id: 'web3-a-02',
    title: 'Layer 1 Blockchains',
    description: 'Explore the design and architecture of foundational blockchains.',
    longDescription: 'Go beyond Ethereum to understand the design decisions of other Layer 1 blockchains like Solana, Avalanche, and Cosmos. This course covers consensus, execution environments, and interoperability.',
    category: 'Web3',
    level: 'Advanced',
    duration: '28h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-02/600/400',
    modules: [{ title: 'Building from Scratch', lessons: [{ title: 'The Blockchain Trilemma', content: 'Explore the tradeoff between decentralization, security, and scalability, and how different Layer 1s approach this challenge.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'How does Solana\'s architecture (e.g., Proof of History) attempt to solve the scalability part of the blockchain trilemma, and what is a potential trade-off?' }]
  },
  {
    id: 'web3-a-03',
    title: 'Web3 Interoperability',
    description: 'Learn about cross-chain communication, bridges, and messaging protocols.',
    longDescription: 'The future of Web3 is multi-chain. This course explores the technologies that allow different blockchains to communicate with each other, covering bridges, messaging protocols, and interoperability standards.',
    category: 'Web3',
    level: 'Advanced',
    duration: '24h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-03/600/400',
    modules: [{ title: 'Connecting Chains', lessons: [{ title: 'Bridge Security', content: 'Understand the significant risks associated with cross-chain bridges, which have been a major target for hacks.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the primary security risk of a centralized cross-chain bridge?' }]
  },
  {
    id: 'web3-a-04',
    title: 'Decentralized Autonomous Organizations (DAOs)',
    description: 'Understand the governance, legal, and operational aspects of DAOs.',
    longDescription: 'DAOs are a new form of human organization. This course covers DAO tooling, governance mechanisms, treasury management, and the legal challenges they face.',
    category: 'Web3',
    level: 'Advanced',
    duration: '20h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-04/600/400',
    modules: [{ title: 'Governing the Ungovernable', lessons: [{ title: 'Voting Mechanisms', content: 'Explore different ways DAOs make decisions, such as token-based voting, conviction voting, and holographic consensus.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "token-based governance" in a DAO, and what is one of its potential drawbacks (e.g., voter apathy, plutocracy)?' }]
  },
  {
    id: 'web3-a-05',
    title: 'Advanced DeFi Strategies',
    description: 'Explore complex yield farming, derivatives, and structured products in DeFi.',
    longDescription: 'This course is for DeFi power users. It explores sophisticated strategies for maximizing yield, hedging risk, and utilizing complex DeFi primitives like perpetuals and options.',
    category: 'Web3',
    level: 'Advanced',
    duration: '26h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-05/600/400',
    modules: [{ title: 'DeFi Masterclass', lessons: [{ title: 'Yield Farming on Leverage', content: 'Understand the high-risk, high-reward world of leveraged yield farming, including the risk of liquidation.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "impermanent loss" in the context of providing liquidity to an AMM, and how does it occur?' }]
  },
  {
    id: 'web3-a-06',
    title: 'Web3 and AI Integration',
    description: 'Explore the intersection of decentralized technology and artificial intelligence.',
    longDescription: 'Two of the most powerful technologies are converging. This course explores the potential of combining AI and Web3, covering topics like decentralized AI marketplaces and AI-powered DAOs.',
    category: 'Web3',
    level: 'Advanced',
    duration: '22h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-06/600/400',
    modules: [{ title: 'The Future is Now', lessons: [{ title: 'Decentralized Compute', content: 'Explore how blockchains can be used to create marketplaces for AI computation, potentially reducing costs and censorship.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one potential benefit of running an AI model on a decentralized network compared to a centralized service like AWS or Google Cloud?' }]
  },
  {
    id: 'web3-a-07',
    title: 'Regulatory Compliance in Web3',
    description: 'Navigate the complex and evolving legal landscape of Web3.',
    longDescription: 'This course provides a guide to the regulatory challenges facing Web3, covering topics like securities law, AML/KYC, and taxation for DAOs and DeFi protocols.',
    category: 'Web3',
    level: 'Advanced',
    duration: '20h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-07/600/400',
    modules: [{ title: 'Navigating the Law', lessons: [{ title: 'The Howey Test and Tokens', content: 'Understand the criteria used by US regulators to determine if an asset is a security, and how this applies to crypto tokens.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the Howey Test and why is it so relevant to cryptocurrency projects and ICOs?' }]
  },
  {
    id: 'web3-a-08',
    title: 'Web3 Research',
    description: 'Learn to conduct and publish research on cutting-edge Web3 topics.',
    longDescription: 'This capstone course teaches you how to contribute to the Web3 knowledge base by conducting original research, from formulating a thesis to publishing your findings.',
    category: 'Web3',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/web3-a-08/600/400',
    modules: [{ title: 'Contribute to the Field', lessons: [{ title: 'Research Methodology', content: 'Learn how to design and execute a Web3 research project, including data collection from on-chain sources and qualitative analysis.', duration: '4h', completed: false }] }],
  },
  {
    id: 'crypto-b-01',
    title: 'Introduction to Cryptocurrency',
    description: 'Understand what cryptocurrency is, its history, and the technology behind it.',
    longDescription: 'This course starts at the very beginning, with the birth of Bitcoin. We will explore the core concepts of blockchain technology, decentralization, and cryptography that make cryptocurrencies possible.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '2h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-01/600/400',
    modules: [
      {
        title: 'Genesis of Crypto',
        lessons: [
          { 
            title: 'What is Bitcoin?', 
            content: 'Bitcoin is a decentralized digital currency without a central bank or single administrator. Learn about the 2008 whitepaper and the problem of double-spending.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
            assignment: 'Research and write a 100-word summary of who Satoshi Nakamoto is (or might be).',
            completed: false 
          },
          { 
            title: 'Proof of Work Explained', 
            content: 'Understand how miners secure the network and why it is so difficult to manipulate. We discuss hashes, difficulty adjustment, and energy consumption.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4',
            assignment: 'Explain the difference between a Bitcoin Node and a Bitcoin Miner.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is the total supply of Bitcoin, and how does the "Halving" event affect the rate of new supply?' }]
  },
  {
    id: 'crypto-b-02',
    title: 'Ethereum & Smart Contracts',
    description: 'Learn about the programmable blockchain and decentralized applications.',
    longDescription: 'Ethereum changed the game by introducing smart contracts. This course explores the Ethereum Virtual Machine (EVM), Ether (ETH), and the transition to Proof of Stake.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-02/600/400',
    modules: [
      {
        title: 'Beyond Sound Money',
        lessons: [
          { 
            title: 'Programmable Money', 
            content: 'Vitalik Buterin envisioned a blockchain that could do more than just transactions. Learn how Smart Contracts enable a world of decentralized apps.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=jxLkbJavP6Y',
            assignment: 'Name three popular decentralized applications (DApps) currently running on Ethereum.',
            completed: false 
          },
          { 
            title: 'The Merge: PoW to PoS', 
            content: 'Understand the historic transition from Proof of Work to Proof of Stake. Learn how validators replace miners and the impact on Ethereum\'s issuance.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=RPD9VpZzO0g',
            assignment: 'What are the minimum requirements to become a solo validator on the Ethereum network?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the role of "Gas" on the Ethereum network and why it fluctuates based on network demand.' }]
  },
  {
    id: 'crypto-b-03',
    title: 'Crypto Wallets 101',
    description: 'A practical guide to securing and managing your assets.',
    longDescription: 'Your wallet is your gateway to the crypto world. This course teaches the difference between hot and cold storage, seed phrases, and interacting with DApps.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-03/600/400',
    modules: [
      {
        title: 'Asset Security',
        lessons: [
          { 
            title: 'Custodial vs. Non-Custodial', 
            content: 'Learn why the phrase "Not your keys, not your coins" is so important. Understand the trade-offs between convenience and security.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=l_0607mOn4M',
            assignment: 'Which wallet type do you currently use (or plan to use), and is it custodial or non-custodial?',
            completed: false 
          },
          { 
            title: 'Hardware Wallets', 
            content: 'For long-term security, hardware wallets (cold storage) are the gold standard. Learn how they keep your private keys offline.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=0kFpG0t4Cq0',
            assignment: 'Research and name two leading hardware wallet manufacturers.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is a "Seed Phrase" and what are the three Golden Rules for keeping it safe?' }]
  },
  {
    id: 'crypto-b-04',
    title: 'Crypto Wallets',
    description: 'Learn the differences between wallet types and how to use them.',
    longDescription: 'Your wallet is the most important tool for interacting with crypto. This course covers hardware wallets, software wallets, and best practices for securing them.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-04/600/400',
    modules: [{ title: 'Securing Your Crypto', lessons: [{ title: 'Hardware vs. Software Wallets', content: 'Understand the security tradeoffs between "hot" software wallets and "cold" hardware wallets.', duration: '1h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the primary security advantage of a hardware wallet over a software wallet?' }]
  },
  {
    id: 'crypto-b-05',
    title: 'Decentralized Finance (DeFi) Intro',
    description: 'Discover the world of permissionless lending, borrowing, and trading.',
    longDescription: 'DeFi aims to remove the middleman from financial services. This course introduces liquidity pools, yield farming, and automated market makers (AMMs).',
    category: 'Crypto',
    level: 'Beginner',
    duration: '6h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-05/600/400',
    modules: [
      {
        title: 'The Future of Banking',
        lessons: [
          { 
            title: 'What are Liquidity Pools?', 
            content: 'In DeFi, anyone can become a liquidity provider. Learn how platforms like Uniswap use mathematical formulas to facilitate trades.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=cizLhxSKrAc',
            assignment: 'Explain the concept of "Impermanent Loss" in your own words.',
            completed: false 
          },
          { 
            title: 'Stablecoins in DeFi', 
            content: 'Stablecoins are the engine of DeFi. Learn how assets like USDC and DAI provide a stable unit of account in a volatile market.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=3-p8_uM9N0s',
            assignment: 'Research the difference between a centralized stablecoin (USDC) and a decentralized one (DAI).',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is it said that DeFi is "permissionless"? How does this contrast with a traditional bank account?' }]
  },
  {
    id: 'crypto-b-06',
    title: 'Stablecoins & Tokenomics',
    description: 'Understand the economies of digital assets.',
    longDescription: 'How do cryptocurrencies maintain value? This course explores the mechanics of stablecoins (fiat-backed, algorithmic, and crypto-backed) and the principles of supply and demand in tokenomics.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-06/600/400',
    modules: [
      {
        title: 'The Backbone of Trade',
        lessons: [
          { 
            title: 'Types of Stablecoins', 
            content: 'Not all stablecoins are created equal. Discover how USDT, DAI, and USDe use different mechanisms to maintain their peg to the US Dollar.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=3-p8_uM9N0s',
            assignment: 'Explain what happens when an algorithmic stablecoin "de-pegs" from its target price.',
            completed: false 
          },
          { 
            title: 'Token Issuance and Burns', 
            content: 'Learn about inflation and deflation in the crypto world. We cover token burns, hard caps, and vesting schedules.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
            assignment: 'Find a crypto project that uses a "Burn" mechanism and explain how it benefits token holders.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is "Tokenomics" considered a vital part of a project\'s fundamental analysis?' }]
  },
  {
    id: 'crypto-b-07',
    title: 'Crypto Market Analysis',
    description: 'An introduction to analyzing cryptocurrency market trends.',
    longDescription: 'This course provides a beginner-friendly introduction to both technical and fundamental analysis for cryptocurrencies, helping you make more informed investment decisions.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '6h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-07/600/400',
    modules: [{ title: 'Reading the Market', lessons: [{ title: 'On-Chain Metrics', content: 'Learn to use on-chain data, such as transaction count and active addresses, to gauge market sentiment and network health.', duration: '1h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one example of an "on-chain" metric and what might it tell you about a cryptocurrency?' }]
  },
  {
    id: 'crypto-b-08',
    title: 'Altcoins & Market Cycles',
    description: 'Understand the flow of money in the crypto ecosystem.',
    longDescription: 'Crypto markets move in predictable cycles. Learn about the four phases of a market cycle: Accumulation, Markup, Distribution, and Markdown.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-08/600/400',
    modules: [
      {
        title: 'Cycle Mastery',
        lessons: [
          { 
            title: 'The 4-Year Cycle', 
            content: 'Bitcoin has historically followed a 4-year cycle driven by the Halving. Learn how this impacts the broader altcoin market.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
            assignment: 'Research when the next Bitcoin Halving is scheduled to occur.',
            completed: false 
          },
          { 
            title: 'Altcoin Season Dynamics', 
            content: 'Money typically flows from BTC to large-caps, then mid-caps, then small-caps. Learn how to spot when "Altcoin Season" is starting.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=5P2sBf6Daqc',
            assignment: 'Define what "Bitcoin Dominance" (BTC.D) signifies and how it relates to altcoin performance.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Describe the characteristics of the "Distribution" phase of a market cycle. What should a trader be doing during this phase?' }]
  },
  {
    id: 'crypto-b-09',
    title: 'Crypto Regulations',
    description: 'An overview of the evolving legal and regulatory landscape for crypto.',
    longDescription: 'This course provides a high-level overview of how governments around the world are approaching cryptocurrency regulation, covering key topics like taxation and securities law.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-09/600/400',
    modules: [{ title: 'The Legal Landscape', lessons: [{ title: 'Crypto Taxation Basics', content: 'Understand the basics of how crypto transactions are typically taxed as property, leading to capital gains or losses.', duration: '1h', completed: false }] }],
    finalAssessment: [{ questionText: 'In many countries, is cryptocurrency treated as property or as currency for tax purposes? What is the implication of this?' }]
  },
  {
    id: 'crypto-b-10',
    title: 'Regulatory Landscape',
    description: 'Understand the legal side of cryptocurrencies.',
    longDescription: 'Regulations are changing rapidly. Learn about the roles of the SEC, MiCA in Europe, and how taxes apply to your crypto trades.',
    category: 'Crypto',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/crypto-b-10/600/400',
    modules: [
      {
        title: 'Tokens and the Law',
        lessons: [
          { 
            title: 'Is it a Security?', 
            content: 'Understand the "Howey Test". Learn why the SEC considers some tokens to be securities and the implications for exchanges.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=jxLkbJavP6Y',
            assignment: 'Research a recent court case involving the SEC and a crypto project (e.g., Ripple/XRP).',
            completed: false 
          },
          { 
            title: 'Crypto Taxes 101', 
            content: 'In most countries, crypto is taxed as property. Learn about capital gains, short-term vs. long-term rates, and how to track your trades.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=RPD9VpZzO0g',
            assignment: 'Find out the primary tax laws for cryptocurrency in your country of residence.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What are the potential benefits and drawbacks of increased government regulation in the crypto space?' }]
  },
  {
    id: 'crypto-i-01',
    title: 'Technical Analysis for Crypto',
    description: 'Apply advanced TA techniques specifically to the volatile crypto markets.',
    longDescription: 'Crypto markets have unique characteristics. This course adapts classical technical analysis for the 24/7, high-volatility world of cryptocurrencies.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '15h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-01/600/400',
    modules: [{ title: 'Crypto Charting', lessons: [{ title: 'Volatility Indicators', content: 'Learn to use indicators like Bollinger Bands and Average True Range (ATR) to measure and adapt to crypto\'s high volatility.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'How might you adjust a standard moving average crossover strategy to better suit the volatile crypto market?' }]
  },
  {
    id: 'crypto-i-02',
    title: 'Fundamental Analysis',
    description: 'Learn to value crypto projects based on their technology, team, and community.',
    longDescription: 'This course provides a framework for the fundamental analysis of crypto assets, looking at factors like on-chain data, developer activity, and network effects.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '16h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-02/600/400',
    modules: [{ title: 'Valuing Networks', lessons: [{ title: 'On-Chain Analysis', content: 'Dive deep into metrics like transaction count, active addresses, and token velocity to gauge the health and usage of a network.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is Metcalfe\'s Law and how can it be applied to valuing a cryptocurrency network?' }]
  },
  {
    id: 'crypto-i-03',
    title: 'Crypto Trading Strategies',
    description: 'Explore various strategies for trading cryptocurrencies, from swing trading to arbitrage.',
    longDescription: 'This course covers a range of trading strategies tailored for crypto markets, including swing trading, event-driven trading, and cross-exchange arbitrage.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '18h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-03/600/400',
    modules: [{ title: 'Trading Setups', lessons: [{ title: 'Arbitrage Opportunities', content: 'Learn how to spot and execute arbitrage trades by taking advantage of price differences for the same asset on different exchanges.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is crypto arbitrage and what is the main risk associated with executing it?' }]
  },
  {
    id: 'crypto-i-04',
    title: 'Risk Management in Crypto',
    description: 'Advanced risk management techniques for highly volatile assets.',
    longDescription: 'Managing risk in crypto requires a specialized approach. This course covers strategies for handling extreme volatility, portfolio hedging, and protecting against platform risk.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '14h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-04/600/400',
    modules: [{ title: 'Surviving Volatility', lessons: [{ title: 'Hedging with Derivatives', content: 'Learn to use futures and options on platforms like Binance or Deribit to protect your portfolio from price downturns.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'How can you use futures contracts to hedge a spot Bitcoin position?' }]
  },
  {
    id: 'crypto-i-05',
    title: 'DeFi Investing',
    description: 'A practical guide to investing in decentralized finance protocols.',
    longDescription: 'This course explores the investment side of DeFi, covering yield farming, liquidity provision, and staking, along with the associated risks.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '16h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-05/600/400',
    modules: [{ title: 'Earning Yield', lessons: [{ title: 'Yield Farming', content: 'Understand how to earn rewards by providing liquidity to DeFi protocols, and the risks involved, such as impermanent loss.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "impermanent loss" and when does it occur for a liquidity provider?' }]
  },
  {
    id: 'crypto-i-06',
    title: 'NFT Trading',
    description: 'Learn strategies for trading and investing in Non-Fungible Tokens.',
    longDescription: 'This course focuses on the financial aspects of NFTs, teaching you how to analyze projects, identify trends, and develop strategies for trading in the fast-paced NFT market.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '14h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-06/600/400',
    modules: [{ title: 'The NFT Market', lessons: [{ title: 'Rarity and Traits', content: 'Learn how to use rarity tools to evaluate the rarity of an NFT within a collection and how that can affect its value.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What are "rarity tools" and how are they used by NFT traders?' }]
  },
  {
    id: 'crypto-i-07',
    title: 'Crypto Tax Planning',
    description: 'Understand the tax implications of crypto trading and investing.',
    longDescription: 'This course provides an essential guide to cryptocurrency taxation, covering topics like capital gains, cost basis tracking, and tax-loss harvesting.',
    category: 'Crypto',
    level: 'Intermediate',
    duration: '10h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/crypto-i-07/600/400',
    modules: [{ title: 'Tax Essentials', lessons: [{ title: 'Tracking Your Transactions', content: 'Learn about tools and methods for tracking your crypto trades for tax purposes to accurately calculate gains and losses.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a "taxable event" in cryptocurrency and provide two examples.' }]
  },
  {
    id: 'crypto-a-01',
    title: 'Algorithmic Crypto Trading',
    description: 'Design, backtest, and deploy automated trading bots for crypto markets.',
    longDescription: 'This course takes you into the world of automated crypto trading. Learn to develop strategies in Python, backtest them against historical data, and deploy them on live exchanges.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '35h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-01/600/400',
    modules: [{ title: 'Bot Development', lessons: [{ title: 'Exchange APIs', content: 'Learn to connect your bot to exchanges like Binance or FTX using their APIs to fetch data and execute trades automatically.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What are some of the unique challenges of live algorithmic trading in crypto compared to traditional markets (e.g., related to APIs, uptime, fees)?' }]
  },
  {
    id: 'crypto-a-02',
    title: 'Quantitative Crypto Analysis',
    description: 'Apply advanced statistical and machine learning models to crypto data.',
    longDescription: 'This course applies rigorous quantitative methods to crypto markets, covering time series analysis, machine learning prediction, and on-chain data science.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-02/600/400',
    modules: [{ title: 'Data-Driven Insights', lessons: [{ title: 'Sentiment Analysis', content: 'Learn to analyze social media data from platforms like Twitter to gauge market sentiment and incorporate it into a trading model.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'How can you use machine learning to analyze on-chain transaction data for predictive signals?' }]
  },
  {
    id: 'crypto-a-03',
    title: 'Crypto Derivatives',
    description: 'An in-depth look at futures, options, and perpetual swaps in crypto.',
    longDescription: 'This course provides a masterclass in crypto derivatives, explaining the mechanics of perpetual swaps, funding rates, and advanced options strategies.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-03/600/400',
    modules: [{ title: 'Advanced Instruments', lessons: [{ title: 'Perpetual Swaps', content: 'Understand the most popular crypto derivative, how it tracks the spot price, and the role of the funding rate.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the "funding rate" in a perpetual swap, and what does it represent for long and short position holders?' }]
  },
  {
    id: 'crypto-a-04',
    title: 'Advanced DeFi',
    description: 'Explore the cutting edge of decentralized finance.',
    longDescription: 'This course delves into the latest innovations in DeFi, including structured products, undercollateralized lending, and cross-chain yield strategies.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '28h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-04/600/400',
    modules: [{ title: 'DeFi 2.0', lessons: [{ title: 'Undercollateralized Lending', content: 'Explore the future of decentralized credit, its mechanisms, and the risks involved.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one major challenge that must be solved to make undercollateralized lending in DeFi mainstream and secure?' }]
  },
  {
    id: 'crypto-a-05',
    title: 'Crypto Arbitrage',
    description: 'Learn to identify and execute arbitrage opportunities across exchanges and protocols.',
    longDescription: 'This course teaches the art of crypto arbitrage, covering statistical arbitrage, triangular arbitrage, and the technical infrastructure required to execute these strategies.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '25h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-05/600/400',
    modules: [{ title: 'Risk-Free Profit?', lessons: [{ title: 'Triangular Arbitrage', content: 'Learn to spot and execute near-instantaneous profit opportunities from price discrepancies between three cryptocurrencies.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "execution risk" in the context of arbitrage, and why is it especially high in crypto markets?' }]
  },
  {
    id: 'crypto-a-06',
    title: 'Blockchain Development',
    description: 'An advanced course on building and deploying decentralized applications.',
    longDescription: 'This is a capstone project course where you will build a complex, full-stack decentralized application from scratch, integrating multiple smart contracts and a sophisticated frontend.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '50h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-06/600/400',
    modules: [{ title: 'Capstone Project', lessons: [{ title: 'Building a DeFi Protocol', content: 'Build a lending or exchange protocol from scratch, including the smart contracts and a basic frontend.', duration: '10h', completed: false }] }],
    finalAssessment: [{ questionText: 'Outline the high-level architecture of a decentralized exchange (DEX) DApp you would build, including the key smart contracts.' }]
  },
  {
    id: 'crypto-a-07',
    title: 'Crypto Security Audits',
    description: 'Learn to professionally audit smart contracts and DApps for vulnerabilities.',
    longDescription: 'This course prepares you for a career in Web3 security. Learn the tools, techniques, and methodologies used by professional auditors to secure billions of dollars in assets.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-07/600/400',
    modules: [{ title: 'Become a White Hat', lessons: [{ title: 'Formal Verification', content: 'Learn about advanced techniques and tools for mathematically proving the correctness of smart contract code.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "formal verification" and how does it differ from traditional testing in smart contract auditing?' }]
  },
  {
    id: 'crypto-a-08',
    title: 'Research in Cryptocurrency',
    description: 'Conduct original research on an unsolved problem in the cryptocurrency space.',
    longDescription: 'This course guides you through a full research project, from formulating a research question to collecting data and publishing a paper on a novel topic in cryptocurrency.',
    category: 'Crypto',
    level: 'Advanced',
    duration: '45h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/crypto-a-08/600/400',
    modules: [{ title: 'Pushing the Frontier', lessons: [{ title: 'Publishing Your Work', content: 'Learn how to structure a research paper, submit to academic conferences or journals, and contribute your findings to the community.', duration: '4h', completed: false }] }],
  },
  {
    id: 'tech-b-01',
    title: 'Intro to Coding',
    description: 'The foundation of the digital world. Learn the basics of programming.',
    longDescription: 'What is code? This course introduces the fundamental concepts of programming, including variables, loops, and logic. No prior experience required.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-01/600/400',
    modules: [
      {
        title: 'The Logic of Code',
        lessons: [
          { 
            title: 'What is a Programmer?', 
            content: 'Coding is about problem-solving. Learn how computers interpret instructions and the difference between high-level and low-level languages.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
            assignment: 'Explain the "Input-Process-Output" model using a simple real-world example like a vending machine.',
            completed: false 
          },
          { 
            title: 'Variables and Data Types', 
            content: 'Strings, Integers, Booleans, and Arrays. Learn how programs store and manipulate data.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
            assignment: 'Write a list of 5 things in your room and identify what "Data Type" each one would be in a computer program.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is an "algorithm" and why is it the most important concept in coding?' }]
  },
  {
    id: 'tech-b-02',
    title: 'Web Development Basics',
    description: 'Learn how to build websites using HTML and CSS.',
    longDescription: 'The web is built on three pillars: HTML for structure, CSS for style, and JavaScript for behavior. This course covers the first two to get you building beautiful pages.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '6h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-02/600/400',
    modules: [
      {
        title: 'HTML & CSS Foundations',
        lessons: [
          { 
            title: 'The Semantic Web (HTML)', 
            content: 'Learn how to structure your content using tags like <h1>, <p>, and <div>. Understand the importance of accessibility and SEO.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
            assignment: 'Create a simple "About Me" page structure using only HTML tags.',
            completed: false 
          },
          { 
            title: 'Styling with CSS', 
            content: 'Make it look pretty! Learn about colors, fonts, the "Box Model", and how to make layouts responsive with Flexbox.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=1PnVor36_40',
            assignment: 'Change the background color and font of your "About Me" page using a simple CSS file.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is the "Box Model" in CSS and how does it affect the layout of elements on a page?' }]
  },
  {
    id: 'tech-b-03',
    title: 'JavaScript Foundations',
    description: 'Master the language that powers the interactive web.',
    longDescription: 'JavaScript brings the internet to life. Learn about functions, events, the DOM, and how to write code that reacts to user input.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '8h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-03/600/400',
    modules: [
      {
        title: 'Making the Web Move',
        lessons: [
          { 
            title: 'JS Syntax and Functions', 
            content: 'Understand variables, if-statements, and the power of reusable functions. Learn how to debug your code in the browser console.', 
            duration: '4h', 
            videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            assignment: 'Write a JavaScript function that takes a name as input and returns a "Hello [name]" string.',
            completed: false 
          },
          { 
            title: 'DOM Manipulation', 
            content: 'Document Object Model (DOM) is how JS "talks" to HTML. Learn how to change text, colors, and images on the fly based on user clicks.', 
            duration: '4h', 
            videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            assignment: 'Explain what `document.getElementById` does and give an example use case.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is an "Event Listener" in JavaScript and why is it essential for building interactive web apps?' }]
  },
  {
    id: 'tech-b-04',
    title: 'Database Management',
    description: 'Learn the basics of SQL and how to work with relational databases.',
    longDescription: 'Data is at the heart of modern applications. This course introduces you to relational databases and the SQL language for querying and managing data.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '15h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-04/600/400',
    modules: [{ title: 'Working with Data', lessons: [{ title: 'SQL Joins', content: 'Learn how to combine data from multiple tables using INNER JOIN, LEFT JOIN, and other join types.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the difference between an INNER JOIN and a LEFT JOIN in SQL?' }]
  },
  {
    id: 'tech-b-05',
    title: 'Version Control with Git',
    description: 'Master the essential tool for collaborating on software projects.',
    longDescription: 'Git is a fundamental tool for modern software development. This course will teach you how to use Git for version control, from basic commits to branching and merging.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '8h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-05/600/400',
    modules: [{ title: 'Collaboration with Git', lessons: [{ title: 'Branching and Merging', content: 'Learn the core workflow for collaborative development, allowing multiple people to work on a project simultaneously without conflicts.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'Why is it a good practice to work on a new feature in a separate Git branch?' }]
  },
  {
    id: 'tech-b-06',
    title: 'Introduction to Cybersecurity',
    description: 'Learn how to protect systems, networks, and data from digital attacks.',
    longDescription: 'The digital world is full of threats. This course covers the basics of cybersecurity, including common attack vectors, encryption, and the principles of the CIA triad (Confidentiality, Integrity, and Availability).',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-06/600/400',
    modules: [
      {
        title: 'Cyber Defense 101',
        lessons: [
          { 
            title: 'Common Attack Vectors', 
            content: 'Understand how hackers gain access: Phishing, Malware, DDoS, and Man-in-the-Middle attacks. Learn how to spot the red flags.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
            assignment: 'Explain the difference between a "Virus" and a "Worm".',
            completed: false 
          },
          { 
            title: 'Encryption and Privacy', 
            content: 'Learn how math protects your data. Discover the difference between Symmetric and Asymmetric encryption (Public/Private keys).', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
            assignment: 'Research and write a 50-word summary of what a "VPN" does.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What are the three components of the "CIA Triad" in cybersecurity?' }]
  },
  {
    id: 'tech-b-07',
    title: 'Cybersecurity Essentials',
    description: 'Learn the basic principles and practices for protecting digital systems.',
    longDescription: 'This course introduces the fundamentals of cybersecurity, covering topics like malware, phishing, network security, and cryptography.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '12h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-07/600/400',
    modules: [{ title: 'Digital Defense', lessons: [{ title: 'Phishing and Social Engineering', content: 'Learn to recognize and avoid common attacks that target human psychology rather than technical vulnerabilities.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What are three common signs of a phishing email?' }]
  },
  {
    id: 'tech-b-08',
    title: 'Networking Basics',
    description: 'Understand how computers communicate across the globe.',
    longDescription: 'How does a packet of data get from your laptop to a server on the other side of the world? This course covers IP addresses, DNS, and the OSI model.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-08/600/400',
    modules: [
      {
        title: 'The Connected World',
        lessons: [
          { 
            title: 'IP Addresses and DNS', 
            content: 'IP addresses are the coordinates of the web. Learn how the Domain Name System (DNS) translates human names (google.com) into IP addresses.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=2-76_f8S8iA',
            assignment: 'What is the "Loopback Address" on your computer (IPv4)?',
            completed: false 
          },
          { 
            title: 'The OSI Model', 
            content: 'A 7-layer framework for understanding network communication. Learn what happens at each layer, from the physical cable to the browser.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=2-76_f8S8iA',
            assignment: 'At which layer of the OSI model does a Router operate?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the "Client-Server" relationship in networking. Who initiates the connection and who provides the resource?' }]
  },
  {
    id: 'tech-b-09',
    title: 'Cloud Computing Overview',
    description: 'Learn about AWS, Azure, and Google Cloud and the shift to the cloud.',
    longDescription: 'Why own servers when you can rent them? This course introduces the business and technical benefits of Cloud Computing, including IaaS, PaaS, and SaaS.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-09/600/400',
    modules: [
      {
        title: 'The Cloud Shift',
        lessons: [
          { 
            title: 'IaaS, PaaS, and SaaS', 
            content: 'Understand the three main "Service Models". Learn when to use a virtual server (EC2) vs. a platform like Vercel or Heroku.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=M988_fsOSWo',
            assignment: 'Give a real-world example of a SaaS (Software as a Service) tool you use.',
            completed: false 
          },
          { 
            title: 'Scaling and Elasticity', 
            content: 'The cloud\'s greatest superpower. Learn how systems can automatically scale up during high traffic and scale down to save money.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=M988_fsOSWo',
            assignment: 'Why is "Elasticity" a better term than just "Scaling" in the cloud?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What are the main advantages of Cloud Computing over traditional On-Premises data centers?' }]
  },
  {
    id: 'tech-b-10',
    title: 'DevOps and CI/CD Intro',
    description: 'Learn the modern workflow for building and deploying software.',
    longDescription: 'DevOps is more than just tools—it\'s a culture. This course explains the Software Development Life Cycle (SDLC) and how Continuous Integration and Continuous Deployment (CI/CD) work.',
    category: 'Tech Skills',
    level: 'Beginner',
    duration: '4h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/tech-b-10/600/400',
    modules: [
      {
        title: 'Modern Workflows',
        lessons: [
          { 
            title: 'The SDLC Cycle', 
            content: 'From Planning to Monitoring. Learn about the infinity loop of DevOps and how it reduces the time between "code written" and "code live".', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY',
            assignment: 'Identify the five main stages of the Software Development Life Cycle.',
            completed: false 
          },
          { 
            title: 'Intro to CI/CD', 
            content: 'Learn how tools like GitHub Actions or Jenkins automatically test and deploy your code every time you make a commit.', 
            duration: '2h', 
            videoUrl: 'https://www.youtube.com/watch?v=scEDHsr3APg',
            assignment: 'Explain what happens if a "test" fails in a CI/CD pipeline.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Why is "Automation" considered the most important part of a successful DevOps implementation?' }]
  },
  {
    id: 'tech-i-01',
    title: 'Advanced Programming',
    description: 'Dive into advanced topics like concurrency, design patterns, and system design.',
    longDescription: 'This course is for those with a solid programming foundation. It covers advanced topics that are crucial for building complex, scalable systems.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '25h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-01/600/400',
    modules: [{ title: 'Building Scalable Systems', lessons: [{ title: 'Design Patterns', content: 'Learn common, reusable solutions to recurring software design problems, such as Singleton, Factory, and Observer patterns.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the Singleton design pattern and what is one common criticism of its use?' }]
  },
  {
    id: 'tech-i-02',
    title: 'Full-Stack Development',
    description: 'Learn to build complete web applications, from the database to the user interface.',
    longDescription: 'This course teaches you how to be a full-stack developer, covering both frontend frameworks like React and backend development with Node.js and Express.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '40h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-02/600/400',
    modules: [{ title: 'End-to-End Development', lessons: [{ title: 'Building a REST API', content: 'Learn to build a backend API with Node.js and Express to serve data to your frontend application.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a REST API and what are the main HTTP verbs used in its design?' }]
  },
  {
    id: 'tech-i-03',
    title: 'DevOps Practices',
    description: 'Learn the tools and practices for automating software development and deployment.',
    longDescription: 'This course introduces you to the world of DevOps, covering continuous integration, continuous deployment (CI/CD), containerization with Docker, and infrastructure as code.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '30h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-03/600/400',
    modules: [{ title: 'Automating the Pipeline', lessons: [{ title: 'Containerization with Docker', content: 'Learn to package applications and their dependencies in isolated containers for consistent deployment across environments.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What problem does containerization with a tool like Docker solve?' }]
  },
  {
    id: 'tech-i-04',
    title: 'Machine Learning Basics',
    description: 'A practical introduction to building and training machine learning models.',
    longDescription: 'This course provides a hands-on introduction to machine learning, covering popular algorithms like linear regression, logistic regression, and decision trees.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '25h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-04/600/400',
    modules: [{ title: 'Predictive Models', lessons: [{ title: 'Linear Regression', content: 'Build your first machine learning model to predict continuous values based on input features.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the difference between regression and classification in machine learning?' }]
  },
  {
    id: 'tech-i-05',
    title: 'Big Data Analytics',
    description: 'Learn to process and analyze massive datasets with tools like Spark and Hadoop.',
    longDescription: 'This course introduces you to the world of big data, covering the fundamentals of distributed systems and how to use tools like Apache Spark to analyze data at scale.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '30h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-05/600/400',
    modules: [{ title: 'Data at Scale', lessons: [{ title: 'Introduction to Spark', content: 'Learn the basics of the leading big data processing engine and its core concepts like RDDs and DataFrames.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the core concept behind the MapReduce programming model for big data processing?' }]
  },
  {
    id: 'tech-i-06',
    title: 'API Development',
    description: 'Learn to design, build, and deploy robust and scalable APIs.',
    longDescription: 'This course provides a comprehensive guide to API development, covering RESTful principles, GraphQL, and best practices for security and documentation.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '24h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-06/600/400',
    modules: [{ title: 'Building APIs', lessons: [{ title: 'REST vs. GraphQL', content: 'Understand the pros and cons of different API design philosophies and when to choose one over the other.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one key advantage of GraphQL over REST for frontend developers?' }]
  },
  {
    id: 'tech-i-07',
    title: 'Mobile App Development',
    description: 'An introduction to building mobile apps for iOS and Android with React Native.',
    longDescription: 'This course teaches you how to build cross-platform mobile apps using React Native, allowing you to write code once and deploy it on both iOS and Android.',
    category: 'Tech Skills',
    level: 'Intermediate',
    duration: '35h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/tech-i-07/600/400',
    modules: [{ title: 'Apps for Everyone', lessons: [{ title: 'React Native Components', content: 'Learn the basic building blocks of a React Native app, such as View, Text, and StyleSheet.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the main benefit of using a cross-platform framework like React Native compared to native development (Swift/Kotlin)?' }]
  },
  {
    id: 'tech-a-01',
    title: 'Distributed Systems',
    description: 'An advanced course on the principles and challenges of designing distributed systems.',
    longDescription: 'This course dives deep into the complex world of distributed systems, covering topics like consensus, replication, and fault tolerance.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-01/600/400',
    modules: [{ title: 'Building Resilient Systems', lessons: [{ title: 'Consensus Algorithms', content: 'Learn about classic consensus protocols like Paxos and its more understandable successor, Raft.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the CAP theorem in distributed systems, and what are its three components?' }]
  },
  {
    id: 'tech-a-02',
    title: 'Artificial Intelligence',
    description: 'A comprehensive course on the theory and practice of modern artificial intelligence.',
    longDescription: 'This course provides a rigorous foundation in artificial intelligence, covering search algorithms, knowledge representation, machine learning, and AI ethics.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '50h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-02/600/400',
    modules: [{ title: 'Intelligent Agents', lessons: [{ title: 'Search Algorithms', content: 'Learn about informed and uninformed search algorithms, including Breadth-First Search, Depth-First Search, and A* search.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the difference between a heuristic function and an algorithm?' }]
  },
  {
    id: 'tech-a-03',
    title: 'Blockchain Development',
    description: 'Learn to design and build your own blockchain from scratch.',
    longDescription: 'This advanced course takes you beyond DApp development to the fundamentals of blockchain architecture. You will learn to build your own simple blockchain to understand the technology at a deeper level.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '45h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-03/600/400',
    modules: [{ title: 'From the Ground Up', lessons: [{ title: 'Building a Block', content: 'Learn to implement the core data structure of a blockchain, including hashing and linking blocks together.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the role of a "nonce" in a Proof-of-Work blockchain?' }]
  },
  {
    id: 'tech-a-04',
    title: 'Quantum Computing',
    description: 'An introduction to the principles and potential of quantum computing.',
    longDescription: 'This course explores the strange and powerful world of quantum computing, covering qubits, superposition, entanglement, and quantum algorithms like Shor\'s and Grover\'s.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '35h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-04/600/400',
    modules: [{ title: 'The Next Frontier', lessons: [{ title: 'Qubits and Superposition', content: 'Learn the fundamental concepts of quantum mechanics that underpin quantum computing.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a "qubit" and how does it differ from a classical bit?' }]
  },
  {
    id: 'tech-a-05',
    title: 'Cybersecurity Advanced',
    description: 'An advanced course on offensive and defensive cybersecurity techniques.',
    longDescription: 'This course is for those who want to specialize in cybersecurity. It covers penetration testing, reverse engineering, exploit development, and advanced defensive strategies.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-05/600/400',
    modules: [{ title: 'Offense and Defense', lessons: [{ title: 'Penetration Testing', content: 'Learn the methodology of ethical hacking to find and exploit vulnerabilities in systems.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What are the main phases of a penetration test?' }]
  },
  {
    id: 'tech-a-06',
    title: 'Data Engineering',
    description: 'Learn to build and manage large-scale data pipelines and infrastructure.',
    longDescription: 'This course focuses on the engineering side of big data, teaching you how to build reliable and scalable data pipelines using tools like Airflow, Kafka, and Spark.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '38h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-06/600/400',
    modules: [{ title: 'Building Data Pipelines', lessons: [{ title: 'Data Warehousing', content: 'Learn about data modeling, ETL/ELT processes, and storage solutions for analytics.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the difference between a data lake and a data warehouse?' }]
  },
  {
    id: 'tech-a-07',
    title: 'Tech Leadership',
    description: 'Develop the skills to lead and manage high-performing engineering teams.',
    longDescription: 'This course is for experienced engineers looking to move into leadership. It covers topics like project management, team building, technical strategy, and communication.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-07/600/400',
    modules: [{ title: 'Leading Engineers', lessons: [{ title: 'Technical Project Management', content: 'Learn to scope, plan, and execute technical projects effectively with an engineering team.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'Describe a common challenge in managing a team of software engineers and how you might address it.' }]
  },
  {
    id: 'tech-a-08',
    title: 'Research in Technology',
    description: 'A capstone course on conducting and publishing original research in technology.',
    longDescription: 'This course guides students through the process of conducting novel research in a chosen field of technology, culminating in a publishable paper.',
    category: 'Tech Skills',
    level: 'Advanced',
    duration: '50h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/tech-a-08/600/400',
    modules: [{ title: 'Creating Knowledge', lessons: [{ title: 'Writing a Research Paper', content: 'Learn the structure and style of academic writing for technology conferences and journals.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'Propose a novel research question in a technical area of your interest.' }]
  },
  // --- AI & Machine Learning ---
  {
    id: 'ai-b-01',
    title: 'Intro to AI',
    description: 'Explore the history and future of Artificial Intelligence.',
    longDescription: 'What is AI? This course covers the basics of Artificial Intelligence, from its origins in the 1950s to the modern era of Large Language Models and generative art.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-01/600/400',
    modules: [
      {
        title: 'The AI Landscape',
        lessons: [
          { 
            title: 'What is Artificial Intelligence?', 
            content: 'Learn the difference between "Narrow AI" (tasks like chess) and "General AI" (human-like reasoning). Discover how AI is already part of your daily life.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=ad79nYk2kEg',
            assignment: 'Identify three ways you interacted with an AI system in the last 24 hours.',
            completed: false 
          },
          { 
            title: 'The History of AI', 
            content: 'From the Turing Test to the "AI Winters" and the eventual breakthrough of Deep Learning. Understand the milestones that brought us here.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=ad79nYk2kEg',
            assignment: 'Who is Alan Turing and why is his "test" still discussed today?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the core difference between specialized (narrow) AI and general AI.' }]
  },
  {
    id: 'ai-b-02',
    title: 'Machine Learning Basics',
    description: 'Learn how computers learn from data without being explicitly programmed.',
    longDescription: 'Machine Learning is the engine of modern AI. Study the three main types: Supervised, Unsupervised, and Reinforcement Learning.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '6h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-02/600/400',
    modules: [
      {
        title: 'Learning Paradigms',
        lessons: [
          { 
            title: 'Supervised vs. Unsupervised', 
            content: 'Learn how labeled data (Supervised) differs from find patterns in raw data (Unsupervised). We cover regression and clustering.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=IpGxLWOIZy4',
            assignment: 'If you want to predict house prices, would you use Supervised or Unsupervised learning? Explain why.',
            completed: false 
          },
          { 
            title: 'Reinforcement Learning', 
            content: 'How AI learns through trial and error. Discover how agents are trained to play games like Chess and Go through reward systems.', 
            duration: '3h', 
            videoUrl: 'https://www.youtube.com/watch?v=IpGxLWOIZy4',
            assignment: 'Describe a "Reward Function" for an AI agent learning to navigate a simple maze.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is the role of a "Training Set" versus a "Test Set" in a machine learning project?' }]
  },
  {
    id: 'ai-b-03',
    title: 'Python for AI',
    description: 'Learn the foundational Python skills necessary for AI and Machine Learning.',
    longDescription: 'This course teaches you the Python programming language from the ground up, with a focus on the libraries essential for data science, such as NumPy, Pandas, and Matplotlib. No prior programming experience is required.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '20h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-03/600/400',
    modules: [{ title: 'Data Manipulation', lessons: [{ title: 'Working with Pandas DataFrames', content: 'Learn to load, clean, filter, and analyze datasets using the powerful Pandas library, a cornerstone of data science in Python.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: "What is a Pandas DataFrame and how is it different from a standard Python dictionary or list? What are two common operations you might perform on a DataFrame?" }]
  },
  {
    id: 'ai-b-04',
    title: 'Data Preprocessing',
    description: 'Learn how to clean, transform, and prepare data for machine learning models.',
    longDescription: 'Garbage in, garbage out. This course teaches the crucial step of data preprocessing, including handling missing values, feature scaling, and encoding categorical data.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '10h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-04/600/400',
    modules: [{ title: 'Data Cleaning', lessons: [{ title: 'Handling Missing Data', content: 'Learn different strategies for dealing with missing values in a dataset, such as imputation or removal.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'Why is feature scaling (e.g., normalization or standardization) important for some machine learning algorithms?' }]
  },
  {
    id: 'ai-b-05',
    title: 'Supervised Learning',
    description: 'A deep dive into supervised learning algorithms like regression and classification.',
    longDescription: 'This course provides a thorough grounding in supervised learning, covering algorithms like linear and logistic regression, decision trees, and support vector machines.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '18h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-05/600/400',
    modules: [{ title: 'Predictive Modeling', lessons: [{ title: 'Decision Trees', content: 'Learn how decision trees make predictions by recursively splitting the data based on features.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is "overfitting" in the context of a decision tree, and how can it be prevented?' }]
  },
  {
    id: 'ai-b-06',
    title: 'Prompt Engineering 101',
    description: 'Learn the art of communicating with Large Language Models.',
    longDescription: 'How you ask matters. Learn the techniques used to get high-quality results from LLMs like ChatGPT, Claude, and Gemini. Master zero-shot, few-shot, and chain-of-thought prompting.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '2h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-06/600/400',
    modules: [
      {
        title: 'Mastering the Prompt',
        lessons: [
          { 
            title: 'Foundations of Prompting', 
            content: 'Understand the "Role-Task-Context" framework. Learn how to set the persona for an AI to get specialized advice.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=jC4v5AS4RIM',
            assignment: 'Write a prompt that asks a "Financial Expert" AI to explain inflation to a 5-year-old.',
            completed: false 
          },
          { 
            title: 'Few-Shot and Chain-of-Thought', 
            content: 'Learn how giving examples (few-shot) and asking the AI to "think step-by-step" (CoT) drastically improves accuracy in math and logic.', 
            duration: '1h', 
            videoUrl: 'https://www.youtube.com/watch?v=jC4v5AS4RIM',
            assignment: 'Provide an example of a "Few-Shot" prompt for a creative writing task.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'Explain the "Chain of Thought" prompting technique and why it helps LLMs with complex reasoning tasks.' }]
  },
  {
    id: 'ai-b-07',
    title: 'Generative AI Tools',
    description: 'Explore the creative potential of AI for images, music, and art.',
    longDescription: 'Generative AI is transforming creativity. Learn how to use Midjourney for art, Suno for music, and Runway for video generation.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '3h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-07/600/400',
    modules: [
      {
        title: 'Creative AI',
        lessons: [
          { 
            title: 'AI Art with Midjourney', 
            content: 'Learn how Diffusion models work to create stunning visuals from text. Explore aspect ratios, stylize parameters, and vary-region tools.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
            assignment: 'Generate (or research) three different art styles for the same prompt: "A futuristic city in the clouds".',
            completed: false 
          },
          { 
            title: 'AI Music and Audio', 
            content: 'Discover how AI is being used to compose melodies and clone voices. Understand the ethical implications for the music industry.', 
            duration: '1.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=CoNBO82D-U0',
            assignment: 'Identify one platform that allows creators to use AI-generated music legally in their videos.',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'How do "Diffusion Models" create images? Describe the process from "Noise" to a final clean image.' }]
  },
  {
    id: 'ai-b-08',
    title: 'AI Ethics',
    description: 'Explore the ethical challenges and societal impact of artificial intelligence.',
    longDescription: 'This course provides a crucial introduction to AI ethics, discussing issues like algorithmic bias, privacy, and the responsible development of AI.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '8h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-08/600/400',
    modules: [{ title: 'Responsible AI', lessons: [{ title: 'Algorithmic Bias', content: 'Learn how AI systems can inadvertently learn and amplify human biases present in data.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is algorithmic bias, and give one real-world example.' }]
  },
  {
    id: 'ai-b-09',
    title: 'AI in Trading & Finance',
    description: 'Learn how AI is revolutionizing the financial world.',
    longDescription: 'Explore algorithmic trading, sentiment analysis for news, and using AI for fraud detection. Understand how quantitative hedge funds use machine learning.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '5h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-09/600/400',
    modules: [
      {
        title: 'Quantitative AI',
        lessons: [
          { 
            title: 'Sentiment Analysis for Markets', 
            content: 'AI can read millions of tweets and news articles in seconds. Learn how "Sentiment Scores" are used to predict short-term price moves.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=IpGxLWOIZy4',
            assignment: 'Research how a "Sentiment Index" might have changed during a recent major market event.',
            completed: false 
          },
          { 
            title: 'Algorithmic Trading Intro', 
            content: 'High-frequency trading (HFT) and AI bots. Learn about the infrastructure required to run automated trading strategies.', 
            duration: '2.5h', 
            videoUrl: 'https://www.youtube.com/watch?v=IpGxLWOIZy4',
            assignment: 'What are the pros and cons of using an AI bot to manage your trades versus doing it manually?',
            completed: false 
          }
        ]
      }
    ],
    finalAssessment: [{ questionText: 'What is a "Flash Crash" and how can automated AI trading potentially contribute to it?' }]
  },
  {
    id: 'ai-b-10',
    title: 'Building ML Models',
    description: 'A step-by-step guide to the complete machine learning workflow.',
    longDescription: 'This course ties everything together, walking you through a complete machine learning project from problem definition and data collection to model deployment and monitoring.',
    category: 'AI & Machine Learning',
    level: 'Beginner',
    duration: '20h', instructor: 'TTH Academy',
    price: 0,
    imageUrl: 'https://picsum.photos/seed/ai-b-10/600/400',
    modules: [{ title: 'The ML Workflow', lessons: [{ title: 'Model Evaluation', content: 'Learn how to measure the performance of your models using metrics like accuracy, precision, and recall.', duration: '2h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the difference between a training set and a testing set, and why is this separation important?' }]
  },
  {
    id: 'ai-i-01',
    title: 'Deep Learning',
    description: 'Dive into the architecture and application of neural networks.',
    longDescription: 'This course opens up the black box of deep learning. You will learn about the structure of a neural network, including layers, neurons, and activation functions, and build your first image classification model using TensorFlow or PyTorch.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '30h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-01/600/400',
    modules: [{ title: 'Building Blocks of AI', lessons: [{ title: 'Anatomy of a Neural Network', content: 'Learn about dense layers, neurons, weights, biases, and common activation functions like ReLU and Sigmoid.', duration: '3h', completed: false }, { title: 'Training a Model with Gradient Descent', content: 'Understand the core concepts of training: how loss functions measure error and how optimizers like gradient descent adjust weights through backpropagation.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: "What is 'backpropagation' and what is its fundamental role in training a neural network? Why is it computationally efficient?" }]
  },
  {
    id: 'ai-i-02',
    title: 'Natural Language Processing',
    description: 'Learn how to build models that can understand and process human language.',
    longDescription: 'This course covers the fundamentals of NLP, from classic techniques like bag-of-words to modern approaches using embeddings and recurrent neural networks (RNNs).',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '28h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-02/600/400',
    modules: [{ title: 'Language and Machines', lessons: [{ title: 'Word Embeddings', content: 'Learn how words can be represented as dense vectors that capture semantic meaning, a key breakthrough for modern NLP.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a word embedding, and how does it represent the meaning of a word better than a simple one-hot encoding?' }]
  },
  {
    id: 'ai-i-03',
    title: 'Computer Vision',
    description: 'Learn to build models that can "see" and interpret images and videos.',
    longDescription: 'This course introduces the field of computer vision, with a focus on deep learning. You will learn about Convolutional Neural Networks (CNNs) and build models for image classification and object detection.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '28h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-03/600/400',
    modules: [{ title: 'Teaching Machines to See', lessons: [{ title: 'Convolutional Neural Networks (CNNs)', content: 'Learn the architecture that revolutionized computer vision, including convolutional layers, pooling layers, and filters.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is a "convolutional layer" in a CNN, and what is its main purpose?' }]
  },
  {
    id: 'ai-i-04',
    title: 'Reinforcement Learning',
    description: 'Explore how to train agents to make optimal decisions in an environment.',
    longDescription: 'This course covers the fundamentals of reinforcement learning, from Markov decision processes to Q-learning and policy gradients. You will train an agent to play a simple game.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '30h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-04/600/400',
    modules: [{ title: 'Learning from Trial and Error', lessons: [{ title: 'Q-Learning', content: 'Learn a foundational algorithm for reinforcement learning that helps an agent learn the value of actions in different states.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the "exploration vs. exploitation" tradeoff in reinforcement learning?' }]
  },
  {
    id: 'ai-i-05',
    title: 'Time Series Forecasting',
    description: 'Learn to predict future values based on historical time-series data.',
    longDescription: 'This course covers statistical methods like ARIMA and deep learning models like LSTMs for forecasting time-series data, with applications in finance and operations.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '24h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-05/600/400',
    modules: [{ title: 'Predicting the Future', lessons: [{ title: 'ARIMA Models', content: 'Learn a classic statistical method for time series analysis and forecasting.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'What do the "AR" and "MA" components in an ARIMA model stand for?' }]
  },
  {
    id: 'ai-i-06',
    title: 'Model Deployment',
    description: 'Learn how to take a trained machine learning model and deploy it to production.',
    longDescription: 'A model is useless if it\'s not deployed. This course covers the practical steps of deploying a model as a web service using tools like Flask, Docker, and cloud platforms.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '20h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-06/600/400',
    modules: [{ title: 'From Notebook to Production', lessons: [{ title: 'Deploying with Docker', content: 'Learn to containerize your machine learning application for consistent, portable, and scalable deployment.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'Why is it a good idea to deploy a machine learning model inside a Docker container?' }]
  },
  {
    id: 'ai-i-07',
    title: 'AI in Business',
    description: 'Understand how AI is being applied to solve real-world business problems.',
    longDescription: 'This course is for aspiring product managers and business leaders. It provides a strategic overview of how AI can be leveraged for business value, with case studies from various industries.',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '16h', instructor: 'TTH Academy',
    price: 5000,
    imageUrl: 'https://picsum.photos/seed/ai-i-07/600/400',
    modules: [{ title: 'The Business of AI', lessons: [{ title: 'AI Product Management', content: 'Learn how to manage the lifecycle of an AI product, from ideation and data collection to deployment and iteration.', duration: '3h', completed: false }] }],
    finalAssessment: [{ questionText: 'Describe one way a retail company could use AI to improve its business operations or customer experience.' }]
  },
  {
    id: 'ai-a-01',
    title: 'Generative Models',
    description: 'An advanced course on GANs, VAEs, and other generative models.',
    longDescription: 'This course dives deep into the world of generative AI, covering the theory and implementation of models that can create new images, text, and data.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '35h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-01/600/400',
    modules: [{ title: 'Creating with AI', lessons: [{ title: 'Generative Adversarial Networks (GANs)', content: 'Learn how two neural networks, a generator and a discriminator, can compete to create highly realistic data.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What are the two main components of a Generative Adversarial Network (GAN), and what is the role of each?' }]
  },
  {
    id: 'ai-a-02',
    title: 'Transformers',
    description: 'A deep dive into the transformer architecture that powers modern NLP.',
    longDescription: 'This course is a comprehensive guide to the transformer architecture, covering self-attention, positional encodings, and its application in models like BERT and GPT.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-02/600/400',
    modules: [{ title: 'The Attention Mechanism', lessons: [{ title: 'Self-Attention', content: 'Understand the key innovation of the transformer model that allows it to weigh the importance of different words in a sequence.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the purpose of the "self-attention" mechanism in a transformer model?' }]
  },
  {
    id: 'ai-a-03',
    title: 'AI for Robotics',
    description: 'Explore the intersection of robotics and AI, from perception to control.',
    longDescription: 'This course covers how AI is used to give robots intelligence, including computer vision for perception, reinforcement learning for control, and path planning algorithms.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '40h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-03/600/400',
    modules: [{ title: 'Intelligent Machines', lessons: [{ title: 'Robotic Perception', content: 'Learn how robots use sensors and computer vision to "see" and understand their environment.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is the SLAM (Simultaneous Localization and Mapping) problem in robotics, and why is it so challenging?' }]
  },
  {
    id: 'ai-a-04',
    title: 'Quantum Machine Learning',
    description: 'Explore the emerging field of quantum machine learning.',
    longDescription: 'This course is for those at the cutting edge. It explores the potential for quantum computers to revolutionize machine learning, covering topics like quantum circuits and quantum kernels.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '35h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-04/600/400',
    modules: [{ title: 'The Quantum Leap', lessons: [{ title: 'Variational Quantum Eigensolvers', content: 'Learn a key hybrid quantum-classical algorithm used in quantum machine learning.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one potential advantage of quantum machine learning over classical machine learning for a specific type of problem?' }]
  },
  {
    id: 'ai-a-05',
    title: 'AI Security',
    description: 'Learn about the security vulnerabilities of AI systems and how to defend against them.',
    longDescription: 'This course covers the emerging field of AI security, including adversarial attacks, data poisoning, and model inversion attacks, as well as defensive techniques.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-05/600/400',
    modules: [{ title: 'Securing AI', lessons: [{ title: 'Adversarial Attacks', content: 'Learn how to create inputs that are designed to fool machine learning models, and how to defend against them.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is an "adversarial attack" on a machine learning model?' }]
  },
  {
    id: 'ai-a-06',
    title: 'Explainable AI',
    description: 'Explore techniques for making "black box" AI models more interpretable.',
    longDescription: 'This course covers the important field of Explainable AI (XAI), teaching techniques like LIME and SHAP that help us understand why an AI model makes the decisions it does.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '25h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-06/600/400',
    modules: [{ title: 'Opening the Black Box', lessons: [{ title: 'LIME and SHAP', content: 'Learn two popular, model-agnostic techniques for explaining the predictions of any machine learning model.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'Why is explainability important for AI systems, especially in high-stakes domains like medicine or finance?' }]
  },
  {
    id: 'ai-a-07',
    title: 'AI Research',
    description: 'A capstone course on conducting and publishing original research in AI.',
    longDescription: 'This course guides students through a full research project in a chosen area of AI, from literature review and experimentation to writing and submitting a paper to a conference.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '50h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-07/600/400',
    modules: [{ title: 'Contributing to Science', lessons: [{ title: 'The Peer Review Process', content: 'Learn how to scientific research in AI is validated and published through the peer review process.', duration: '5h', completed: false }] }],
    finalAssessment: [{ questionText: 'Propose a novel research question in the field of AI that you could investigate.' }]
  },
  {
    id: 'ai-a-08',
    title: 'Ethics and Policy in AI',
    description: 'An advanced look at the ethical and policy challenges of AI.',
    longDescription: 'This course provides a deep dive into the complex ethical and policy issues surrounding AI, including governance models, social impact, and long-term safety.',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '30h', instructor: 'TTH Academy',
    price: 7000,
    imageUrl: 'https://picsum.photos/seed/ai-a-08/600/400',
    modules: [{ title: 'Shaping the Future', lessons: [{ title: 'AI Governance', content: 'Explore different models for regulating and governing the development and deployment of AI at a national and international level.', duration: '4h', completed: false }] }],
    finalAssessment: [{ questionText: 'What is one major challenge in creating effective and globally consistent AI governance policy?' }]
  }
];

export const findCourseById = (id: string): Omit<Course, 'progress'> | undefined => {
  return courses.find(course => course.id === id);
};
