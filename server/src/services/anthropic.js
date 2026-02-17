const DEMO_MODE = !process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here';

let client = null;
if (!DEMO_MODE) {
  const Anthropic = require('@anthropic-ai/sdk');
  client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// Demo responses keyed by persona ID (extracted from system prompt)
const DEMO_RESPONSES = {
  'satoshi-purist': [
    `Great question! Let me share the **Bitcoin maximalist** perspective.

Bitcoin is fundamentally different from all other cryptocurrencies because it solved the **Byzantine Generals Problem** — how to achieve consensus in a trustless, decentralized network.

Here's how a Bitcoin transaction works:

\`\`\`
You (Wallet) → Sign with Private Key → Broadcast to Network
    ↓
Mempool → Miners select transactions
    ↓
Mining → Solve cryptographic puzzle (Proof of Work)
    ↓
New Block → Added to blockchain → Confirmed!
\`\`\`

As Satoshi Nakamoto wrote in the **Bitcoin whitepaper (2008)**: *"A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution."*

Key principles to remember:
- **Don't trust, verify** — run your own node
- **Not your keys, not your coins** — self-custody matters
- **21 million cap** — Bitcoin is provably scarce, unlike fiat currency

> Source: Nakamoto, S. (2008). "Bitcoin: A Peer-to-Peer Electronic Cash System"

|||FOLLOWUPS|||["What is proof of work and why does Bitcoin use it?", "How does the Lightning Network make Bitcoin faster?", "Why do Bitcoin maximalists criticize altcoins?"]|||END|||`,
    `That's a really important topic! **Bitcoin mining** is the backbone of the network's security.

Think of it like a **global lottery** that happens every ~10 minutes:

| Aspect | Details |
|--------|---------|
| **What miners do** | Compute SHA-256 hashes to find a valid block |
| **Block reward** | Currently 3.125 BTC (halved every 210,000 blocks) |
| **Difficulty** | Adjusts every 2,016 blocks (~2 weeks) |
| **Energy source** | Increasingly renewable (58%+ as of 2024) |

The beauty of Proof of Work is that it's **thermodynamically secured** — to attack the network, you'd need to outspend all honest miners combined. According to research by the **Cambridge Centre for Alternative Finance**, the Bitcoin network has never been successfully 51% attacked.

Remember: mining isn't wasteful — it's the cost of running a **decentralized, censorship-resistant monetary system** that no government can shut down.

> Source: Cambridge Centre for Alternative Finance, "Cambridge Bitcoin Electricity Consumption Index"

|||FOLLOWUPS|||["What happens when all 21 million Bitcoin are mined?", "How does mining difficulty adjustment work?", "What is a 51% attack and is Bitcoin vulnerable?"]|||END|||`,
  ],
  'defi-strategist': [
    `Excellent question! Let me break down **DeFi** in practical terms.

**Decentralized Finance** is essentially rebuilding traditional banking services using smart contracts — no banks, no middlemen, just code.

Here's a comparison:

| Traditional Finance | DeFi Equivalent |
|---|---|
| Bank savings account | Aave/Compound lending (earn interest) |
| Stock exchange | Uniswap/SushiSwap (decentralized exchange) |
| Loan officer | Smart contract (automated lending) |
| Wire transfer | Blockchain transaction (instant, global) |

**How a DEX (Decentralized Exchange) works:**

\`\`\`
Liquidity Provider → Deposits Token A + Token B into Pool
                         ↓
Trader → Swaps Token A for Token B
                         ↓
AMM Formula: x * y = k (Constant Product)
                         ↓
LP earns trading fees (typically 0.3%)
\`\`\`

⚠️ **Risks to be aware of:**
- **Impermanent loss** — your LP position can lose value vs. just holding
- **Smart contract risk** — bugs can be exploited (always check audits)
- **Rug pulls** — unverified projects can steal funds

> Source: Uniswap v2 Whitepaper, Adams et al. (2020)

|||FOLLOWUPS|||["What is impermanent loss and how can I minimize it?", "How do I evaluate if a DeFi protocol is safe?", "What are stablecoins and why are they important in DeFi?"]|||END|||`,
  ],
  'blockchain-architect': [
    `Great architectural question! Let me explain how blockchains are designed from the ground up.

The **Blockchain Trilemma** (coined by Vitalik Buterin) states that blockchains can only optimize for 2 out of 3 properties:

\`\`\`
        Decentralization
           /        \\
          /          \\
    Security ——— Scalability
    
Bitcoin: Decentralization + Security (sacrifices speed)
Solana:  Security + Scalability (fewer validators)  
Ethereum L2s: Trying to achieve all three via rollups
\`\`\`

**Consensus Mechanism Comparison:**

| Mechanism | Speed | Energy | Decentralization | Used By |
|-----------|-------|--------|-------------------|---------|
| PoW | ~7 TPS | High | Very High | Bitcoin |
| PoS | ~30 TPS | Low | High | Ethereum |
| DPoS | ~1000 TPS | Low | Medium | EOS, Tron |
| PBFT | ~10,000 TPS | Low | Low | Hyperledger |

**Layer 2 Scaling Solutions** are the most promising approach:

\`\`\`
Layer 1 (Ethereum Mainnet)
    ↑ Post proof/summary
    |
Layer 2 (Rollup)
    ├── Optimistic Rollups: Assume valid, challenge if fraud
    └── ZK-Rollups: Prove validity with zero-knowledge proofs
\`\`\`

> Source: Buterin, V. "Why sharding is great" (2021), Ethereum Foundation

|||FOLLOWUPS|||["What are the differences between optimistic and ZK rollups?", "How does Ethereum's Proof of Stake work after The Merge?", "What is sharding and how does it improve scalability?"]|||END|||`,
  ],
  'crypto-skeptic': [
    `Good — I'm glad you're asking critical questions. Let me challenge some common assumptions.

Before you accept any crypto narrative at face value, consider these **hard questions**:

🔍 **Decentralization claims vs. reality:**
- Bitcoin: ~4 mining pools control >50% of hashrate
- Ethereum: 3 entities control ~60% of staked ETH
- Most "decentralized" projects have admin keys held by small teams

📊 **Historical failures worth studying:**

| Event | Year | Losses | Lesson |
|-------|------|--------|--------|
| Mt. Gox | 2014 | $460M | Exchange risk |
| The DAO Hack | 2016 | $60M | Smart contract bugs |
| Terra/Luna | 2022 | $40B | Algorithmic stablecoins can fail |
| FTX Collapse | 2022 | $8B+ | Centralized exchanges aren't safe either |

**Questions you should ask about ANY crypto project:**
1. Who controls the admin keys?
2. Has the code been audited? By whom?
3. Where does the yield come from? (If you can't answer this, you might be the yield)
4. What happens if the price drops 90%?

I'm not saying crypto is worthless — blockchain has genuine innovations. But **critical thinking** is your best defense against losing money or writing a poorly-reasoned school paper.

> Source: SEC enforcement actions database; Chainalysis Crypto Crime Report 2024

|||FOLLOWUPS|||["What are the biggest risks of investing in cryptocurrency?", "How can I identify a potential crypto scam or rug pull?", "What legitimate problems does blockchain actually solve?"]|||END|||`,
  ],
  'web3-educator': [
    `Welcome! 😊 Let me explain this in the simplest way possible.

Think of **blockchain** like a **shared notebook** that everyone in your class can see:

📓 **The Notebook Analogy:**
- Everyone has an identical copy of the notebook
- When someone writes something new, ALL copies update
- You can't erase or change old entries — they're permanent
- No single person "owns" the notebook — it belongs to everyone

**How a block gets added:**

\`\`\`
Step 1: Someone wants to send crypto
        "Alice sends 1 BTC to Bob"
              ↓
Step 2: The transaction is broadcast to the network
        (Like announcing it to the whole class)
              ↓
Step 3: Validators check: Does Alice actually have 1 BTC?
        (Class fact-checkers verify)
              ↓
Step 4: Transaction is bundled into a block
        (Written on a new page of the notebook)
              ↓
Step 5: Block is linked to the previous one using a hash
        (Page number connects to the last page)
              ↓
Step 6: Everyone's notebook updates! ✅
\`\`\`

**Key vocabulary for your assignment:**
- **Hash** = a digital fingerprint (unique to each block)
- **Node** = a computer running a copy of the notebook
- **Consensus** = how everyone agrees on what's true

The beautiful thing is: **no single person, company, or government can control or censor this notebook**. That's the power of decentralization!

> Source: Nakamoto, S. (2008). Bitcoin Whitepaper; Antonopoulos, A. "Mastering Bitcoin" (O'Reilly)

|||FOLLOWUPS|||["What is a hash and why is it important for blockchain security?", "What's the difference between Bitcoin and Ethereum?", "How can I explain blockchain to my teacher in one paragraph?"]|||END|||`,
  ],
};

function getPersonaIdFromPrompt(systemPrompt) {
  if (systemPrompt.includes('Satoshi Purist')) return 'satoshi-purist';
  if (systemPrompt.includes('DeFi Strategist')) return 'defi-strategist';
  if (systemPrompt.includes('Blockchain Architect')) return 'blockchain-architect';
  if (systemPrompt.includes('Crypto Skeptic')) return 'crypto-skeptic';
  if (systemPrompt.includes('Web3 Educator')) return 'web3-educator';
  return 'web3-educator';
}

function getDemoResponse(systemPrompt) {
  const personaId = getPersonaIdFromPrompt(systemPrompt);
  const responses = DEMO_RESPONSES[personaId] || DEMO_RESPONSES['web3-educator'];
  return responses[Math.floor(Math.random() * responses.length)];
}

async function chat(systemPrompt, messages) {
  if (DEMO_MODE) {
    // Simulate slight delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));
    return getDemoResponse(systemPrompt);
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return response.content[0].text;
}

if (DEMO_MODE) {
  console.log('⚡ Running in DEMO MODE — using pre-written expert responses');
  console.log('   To use live AI, set ANTHROPIC_API_KEY in server/.env');
}

module.exports = { chat, DEMO_MODE };
