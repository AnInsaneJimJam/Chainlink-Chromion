import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import walletRoutes from "./routes/wallet.route.js"
import willRoutes from "./routes/willRoute.js"
dotenv.config();

import { TwitterApi } from "twitter-api-v2";
import { elizaLogger, AgentRuntime, ModelProviderName } from "@ai16z/eliza";

const GOOGLE_API_KEYT = process.env.GOOGLE_API_KEY;



const app = express();
//GET--get info, PUT--update info, POST--give info, DELETE--delete info
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

//routes
app.use("/api/wallets", walletRoutes);
app.use("/api/wills", willRoutes); 

//connect db
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => {
    console.log("Connected to db and Listening on port 5000");
  });
});



// Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// ElizaOS Character Configuration
const character = {
  name: "Eliza",
  bio: "The official AI notary bot for InheritChain, handling will announcements and beneficiary communications with blockchain precision and human sensitivity",
  lore: [
    "Digital executor of the Web3 era",
    "Maintains perfect records of all will transactions",
    "Bridges blockchain events with human-readable notifications",
    "Handles sensitive inheritance matters with discretion",
    "Powered by InheritChain's smart contract events",
  ],
  messageExamples: [
    [
      {
        user: "system",
        content: {
          text: "New will created: Testator: 0x8a1...3f4 Beneficiaries: [0x3b2...7e1, 0xc4d...9f0]",
        },
      },
      {
        user: "Eliza",
        content: {
          text: "📜 New will registered on InheritChain\n\nTestator: 0x8a1...3f4\n\nBeneficiaries:\n- 0x3b2...7e1\n- 0xc4d...9f0\n\nView status: https://inheritchain.xyz/will/0x8a1...3f4 #Web3 #EstatePlanning #Blockchain",
        },
      },
    ],
    [
      {
        user: "system",
        content: {
          text: "Beneficiary DM requested for will 0x8a1...3f4 (Status: PendingExecution)",
        },
      },
      {
        user: "Eliza",
        content: {
          text: "🔔 Inheritance Notification\n\nYou've been named as a beneficiary in will 0x8a1...3f4. The will is now in PendingExecution status with a 10-day challenge window.\n\nNext steps:\n1. Monitor the challenge period\n2. Prepare necessary verification\n3. No action required unless disputing\n\nFor details: https://inheritchain.xyz/will/0x8a1...3f4",
        },
      },
    ],
  ],
  postExamples: [
    "📣 New will recorded on InheritChain\n\nTestator: 0x5f2...9a3\nBeneficiaries: 3 addresses\n\nBlockchain-powered estate planning just got simpler. #DeFi #Inheritance #Web3",
    "⚖️ Will execution initiated for 0x7e1...4b2\n\nChallenge window open for 10 days. Beneficiaries notified via DM. #SmartContracts #Ethereum",
    "✅ Will successfully executed for 0x3c8...1d6\n\nAssets distributed across 3 chains via CCIP. #CrossChain #Polygon #Avalanche",
  ],
  style: {
    all: [
      "Always include relevant emojis for visual scanning",
      "Use clear section breaks with newlines",
      "Obfuscate full addresses (first3...last3)",
      "Maintain professional but approachable tone",
      "Include relevant hashtags (#Web3 #Blockchain #Inheritance)",
      "Provide actionable links when appropriate",
      "Never share sensitive personal information",
      "For DMs: use bullet points for clarity",
    ],
    twitter: [
      "Public tweets should only include testator/beneficiary addresses (partial)",
      "Highlight blockchain aspects for Web3 audience",
      "Include InheritChain branding",
    ],
    dm: [
      "More detailed than public tweets",
      "Include specific status information",
      "Provide clear next steps",
      "Use reassuring language for sensitive matters",
    ],
  },
  topics: [
    "blockchain",
    "inheritance",
    "smart contracts",
    "estate planning",
    "Web3",
    "cross-chain",
    "DeFi",
  ],
  behaviors: {
    onWillCreated: (testator, beneficiaries) => {
      return `📜 New will registered on InheritChain\n\nTestator: ${obfuscateAddress(
        testator
      )}\n\nBeneficiaries:\n${beneficiaries
        .map((b) => `- ${obfuscateAddress(b)}`)
        .join(
          "\n"
        )}\n\nView status: https://inheritchain.xyz/will/${obfuscateAddress(
        testator
      )} #Web3 #EstatePlanning`;
    },
    onBeneficiaryDM: (testator, status) => {
      const statusMessages = {
        PendingExecution:
          "The will is now in PendingExecution status with a 10-day challenge window.",
        Challenged:
          "The will has been challenged. Chainlink oracles are verifying status.",
        Executed:
          "The will has been executed and assets are being distributed.",
      };
      return `🔔 Inheritance Update\n\nWill ${obfuscateAddress(
        testator
      )} status changed:\n\n${
        statusMessages[status]
      }\n\nView details: https://inheritchain.xyz/will/${obfuscateAddress(
        testator
      )}`;
    },
  },
};

// Helper function
function obfuscateAddress(address) {
  return address.length > 8
    ? `${address.substring(0, 3)}...${address.substring(address.length - 3)}`
    : address;
}

// Create a comprehensive in-memory database adapter for testing
class SimpleMemoryAdapter {
  constructor() {
    this.rooms = new Map();
    this.messages = new Map();
    this.participants = new Map();
    this.relationships = new Map();
    this.goals = new Map();
    this.logs = new Map();
    this.accounts = new Map();
    this.cache = new Map();
    this.embeddings = new Map();
  }

  async getMemoryById(memoryId) {
  return this.messages.get(memoryId) || null;
}

  async getMemoriesByRoomIds(roomIds, opts = {}) {
    return Array.from(this.messages.values())
      .filter((msg) => roomIds.includes(msg.roomId))
      .slice(0, opts.count || 50);
  }
  async getRoomsForParticipants(participantIds) {
    const rooms = [];
    for (const participantId of participantIds) {
      const userRooms = Array.from(this.participants.values())
        .filter((p) => p.userId === participantId)
        .map((p) => this.rooms.get(p.roomId))
        .filter(Boolean);
      rooms.push(...userRooms);
    }
    return [...new Set(rooms)]; // Remove duplicates
  }

  async getParticipantsForRoom(roomId) {
    return Array.from(this.participants.values())
      .filter((p) => p.roomId === roomId)
      .map((p) => ({
        userId: p.userId,
        roomId: p.roomId,
        joined_at: p.joined_at,
      }));
  }
  // Account management methods
  async getAccountById(userId) {
    if (!this.accounts.has(userId)) {
      // Create default account if it doesn't exist
      const account = {
        id: userId,
        name: `User_${userId}`,
        username: `user_${userId}`,
        email: `${userId}@example.com`,
        avatar_url: null,
        details: {},
        created_at: new Date().toISOString(),
      };
      this.accounts.set(userId, account);
      return account;
    }
    return this.accounts.get(userId);
  }

  async createAccount(account) {
    const newAccount = {
      ...account,
      id: account.id || Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    this.accounts.set(newAccount.id, newAccount);
    return newAccount;
  }

  async updateAccount(accountId, updates) {
    const account = this.accounts.get(accountId);
    if (account) {
      const updatedAccount = { ...account, ...updates };
      this.accounts.set(accountId, updatedAccount);
      return updatedAccount;
    }
    return null;
  }

  // Room management methods
  async getRoom(roomId) {
    return this.rooms.get(roomId) || null;
  }

  async createRoom(roomId) {
    const room = {
      id: roomId,
      created_at: new Date().toISOString(),
    };
    this.rooms.set(roomId, room);
    return room;
  }

  async getRoomsByParticipant(userId) {
    return Array.from(this.rooms.values()).filter((room) =>
      this.participants.has(`${room.id}-${userId}`)
    );
  }

  async addParticipant(userId, roomId) {
    this.participants.set(`${roomId}-${userId}`, {
      userId,
      roomId,
      joined_at: new Date().toISOString(),
    });
  }

  async removeParticipant(userId, roomId) {
    return this.participants.delete(`${roomId}-${userId}`);
  }

  // Message methods
  async getMessages(opts = {}) {
    return Array.from(this.messages.values())
      .filter((msg) => (opts.roomId ? msg.roomId === opts.roomId : true))
      .slice(0, opts.count || 50);
  }

  async createMessage(message) {
    const msg = {
      ...message,
      id: message.id || Date.now().toString(),
      createdAt: message.createdAt || new Date().toISOString(),
    };
    this.messages.set(msg.id, msg);
    return msg;
  }

  async removeMessage(messageId) {
    return this.messages.delete(messageId);
  }

  async removeAllMessages(roomId) {
    for (const [id, message] of this.messages.entries()) {
      if (message.roomId === roomId) {
        this.messages.delete(id);
      }
    }
  }

  // Memory methods
  async countMemories(opts = {}) {
    return Array.from(this.messages.values()).filter((msg) =>
      opts.roomId ? msg.roomId === opts.roomId : true
    ).length;
  }

  async getMemories(opts = {}) {
    return Array.from(this.messages.values())
      .filter((msg) => (opts.roomId ? msg.roomId === opts.roomId : true))
      .slice(0, opts.count || 50);
  }

  async searchMemories(opts = {}) {
    return this.getMemories(opts);
  }

  async createMemory(memory) {
    return this.createMessage(memory);
  }

  async removeMemory(memoryId) {
    return this.removeMessage(memoryId);
  }

  async removeAllMemories(roomId) {
    return this.removeAllMessages(roomId);
  }

  // Embedding methods
  async getCachedEmbeddings(opts = {}) {
    return Array.from(this.embeddings.values())
      .filter((emb) => (opts.query ? emb.query === opts.query : true))
      .slice(0, opts.count || 10);
  }

  async storeEmbedding(embedding) {
    const id = Date.now().toString();
    const embeddingRecord = {
      id,
      ...embedding,
      created_at: new Date().toISOString(),
    };
    this.embeddings.set(id, embeddingRecord);
    return embeddingRecord;
  }

  async searchMemoriesByEmbedding(embedding, opts = {}) {
    return this.getMemories(opts);
  }

  // Goal methods
  async createGoal(goal) {
    const newGoal = {
      ...goal,
      id: goal.id || Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    this.goals.set(newGoal.id, newGoal);
    return newGoal;
  }

  async updateGoalStatus(opts) {
    const goal = this.goals.get(opts.goalId);
    if (goal) {
      goal.status = opts.status;
      this.goals.set(opts.goalId, goal);
      return goal;
    }
    return null;
  }

  async getGoals(opts = {}) {
    return Array.from(this.goals.values())
      .filter((goal) => (opts.roomId ? goal.roomId === opts.roomId : true))
      .slice(0, opts.count || 50);
  }

  // Relationship methods
  async createRelationship(relationship) {
    const id = `${relationship.userA}-${relationship.userB}`;
    const rel = {
      ...relationship,
      id,
      created_at: new Date().toISOString(),
    };
    this.relationships.set(id, rel);
    return rel;
  }

  async getRelationship(opts) {
    const id = `${opts.userA}-${opts.userB}`;
    return this.relationships.get(id) || null;
  }

  async getRelationships(opts = {}) {
    return Array.from(this.relationships.values())
      .filter((rel) =>
        opts.userId
          ? rel.userA === opts.userId || rel.userB === opts.userId
          : true
      )
      .slice(0, opts.count || 50);
  }

  // Logging methods
  async log(opts) {
    const logEntry = {
      id: Date.now().toString(),
      ...opts,
      timestamp: new Date().toISOString(),
    };
    this.logs.set(logEntry.id, logEntry);
    return logEntry;
  }

  async getLogs(opts = {}) {
    return Array.from(this.logs.values())
      .filter((log) => (opts.roomId ? log.roomId === opts.roomId : true))
      .slice(0, opts.count || 100);
  }

  // Actor/participant methods
  async getActorDetails(opts = {}) {
    return this.accounts.get(opts.roomId) || [];
  }

  async getParticipants(roomId) {
    return Array.from(this.participants.values()).filter(
      (p) => p.roomId === roomId
    );
  }

  // Cache methods
  async get(key) {
    return this.cache.get(key) || null;
  }

  async set(key, value) {
    this.cache.set(key, value);
    return true;
  }

  async delete(key) {
    return this.cache.delete(key);
  }

  // Additional utility methods that might be needed
  async getParticipantsForAccount(userId) {
    return Array.from(this.participants.values()).filter(
      (p) => p.userId === userId
    );
  }

  async getAccountsByIds(userIds) {
    return userIds.map((id) => this.accounts.get(id)).filter(Boolean);
  }
}

// Initialize ElizaOS runtime
let runtime;

async function initializeEliza() {
  try {
    // Create a simple in-memory database adapter
    const dbAdapter = new SimpleMemoryAdapter();

    runtime = new AgentRuntime({
      character,
      modelProvider: ModelProviderName.GOOGLE,
      token: process.env.GOOGLE_API_KEY,
      databaseAdapter: dbAdapter,
      plugins: [], // Add plugins if needed
      evaluators: [], // Add evaluators if needed
    });

    elizaLogger.info("ElizaOS runtime initialized successfully with Google");
  } catch (error) {
    console.error("Full error details:", error);
    elizaLogger.error("Failed to initialize ElizaOS:", error.message || error);
  }
}

// Initialize on startup
initializeEliza();

// API endpoint to generate and post tweet
// Replace your /api/generate-tweet endpoint with this updated version:
app.post('/api/generate-tweet', async (req, res) => {
  try {
    const { testatorName, testator, 
      // yearOfBirth
     } = req.body;

    if (!testatorName) {
      return res.status(400).json({ error: 'Testator name is required' });
    }

    // Create context from will data

    // will se to this
    // Create character-based prompt
    const characterPrompt = `You are ${character.name}, ${character.bio}. 

Create a tweet about a blockchain will/inheritance being created.


Style guidelines:
- Make a professional tweet which start with congratulating ${testatorName} with wallet address as ${testator}
- for successfully creating willl on InheritChain
- Use clear section breaks with newlines when needed
- Keep it under 280 characters
- Professional but approachable tone

Generate only the tweet text, no quotes or extra text.`;

    // Updated API call with FREE TIER model name and endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: characterPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Google API Error Response:', data);
      throw new Error(`Google API error: ${data.error?.message || 'Unknown error'}`);
    }

    let tweetText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!tweetText) {
      console.error('No content generated. Full response:', data);
      throw new Error('No content generated from Google API');
    }

    // Clean up the response
    tweetText = tweetText.replace(/^["']|["']$/g, '').trim();

    // Validate tweet length
    if (tweetText.length > 280) {
      tweetText = tweetText.substring(0, 277) + '...';
    }

    console.log('Generated tweet:', tweetText);

    // Check Twitter API permissions first
    if (!twitterClient) {
      return res.status(500).json({
        success: false,
        error: 'Twitter client not initialized',
        details: 'Check your Twitter API credentials in environment variables',
        tweetGenerated: true,
        generatedTweet: tweetText
      });
    }

    try {
      // Test if we can post (this will fail with 403 if permissions are wrong)
      const tweet = await twitterClient.v2.tweet(tweetText);

      res.json({
        success: true,
        tweet: {
          id: tweet.data.id,
          text: tweetText,
          url: `https://twitter.com/user/status/${tweet.data.id}`
        },
        message: 'Tweet generated and posted successfully!'
      });
    } catch (twitterError) {
      console.error('Twitter API Error Details:', {
        code: twitterError.code,
        message: twitterError.message,
        data: twitterError.data,
        error: twitterError.error
      });

      // Handle specific Twitter errors
      if (twitterError.code === 403) {
        return res.status(403).json({
          success: false,
          error: 'Twitter API permissions error',
          details: 'Your Twitter app needs "Read and Write" permissions. Please update your app permissions in the Twitter Developer Portal and regenerate your access tokens.',
          tweetGenerated: true,
          generatedTweet: tweetText
        });
      }
      
      if (twitterError.code === 401) {
        return res.status(401).json({
          success: false,
          error: 'Twitter API authentication error',
          details: 'Invalid credentials. Please check your Twitter API keys and access tokens. Make sure they are correct and regenerated after permission changes.',
          tweetGenerated: true,
          generatedTweet: tweetText
        });
      }
      
      // Re-throw other Twitter errors
      throw twitterError;
    }

  } catch (error) {
    console.error('Full error:', error);
    elizaLogger.error('Error generating/posting tweet:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate or post tweet',
      details: error.message
    });
  }
});



console.log("Runtime methods:", Object.getOwnPropertyNames(runtime));
console.log(
  "Runtime prototype:",
  Object.getOwnPropertyNames(Object.getPrototypeOf(runtime))
);
