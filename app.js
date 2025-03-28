import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { SuiTradingClient } from "@tradeport/sui-trading-sdk";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decodeSuiPrivateKey } from "@mysten/sui.js/cryptography";
const private_key = process.env.PRIVATE_KEY
const api_user = process.env.x_api_user
const api_key = process.env.x_api_key

const privateKeyBase64 = private_key; // Example: "3x/W+..."
const keypair = Ed25519Keypair.fromSecretKey(
  decodeSuiPrivateKey(privateKeyBase64).secretKey
);
let address = keypair.getPublicKey().toSuiAddress();
const client = new SuiClient({ url: getFullnodeUrl("mainnet") });

const suiTradingClient = new SuiTradingClient({
  apiKey: api_key,
  apiUser: api_user,
});

const GRAPHQL_ENDPOINT = "https://api.indexer.xyz/graphql"; // Replace with the actual GraphQL endpoint

const query = `
query fetchCollectionListedItems(
  $where: listings_bool_exp!
  $order_by: [listings_order_by!]
  $offset: Int
  $limit: Int!
) {
  sui {
    listings(
      where: $where
      order_by: $order_by
      offset: $offset
      limit: $limit
    ) {
      id
      price
      price_str
      block_time
      seller
      market_name
      nonce
      coin
      contract {
        key
      }
      nft {
        id
        token_id
        token_id_index
        name
        media_url
        media_type
        ranking
        owner
        chain_state
        lastSale: actions(
          where: {
            type: { _in: ["buy", "accept-collection-bid", "accept-bid"] }
          }
          order_by: { block_time: desc }
          limit: 1
        ) {
          price
          price_coin
        }
        contract {
          commission: default_commission {
            key
            market_fee
            market_name
            royalty
            is_custodial
          }
        }
      }
    }
  }
}

`;

const variables = {
  limit: 10,
  where: {
    collection_id: {
      _eq: "9f1fcbb5-82a6-4d50-866f-96a9fc724eb7",
    },
    listed: {
      _eq: true,
    },
    id: {
      _nin: [
        "43e38f20-3b5b-434f-b8c4-94aea9c33831",
        "2028dfcd-b4c1-48f8-b89f-16d9bf1e831f",
        "02016d95-6bff-44c5-9e0d-60060c2db0c3",
        "d9c99fdb-b354-4c93-99c0-c5f19be6c125",
        "e1ff3e51-62ef-476a-bc62-16decdc3966c",
        "07954f15-5489-4631-8459-63824e979ad5",
        "3d093e81-aef7-4ee6-b178-310cd5a24265",
        "7c670ec5-0f69-4de7-b41f-d272423f0b32",
        "29d3edc5-4de1-47e9-8875-c855ee8f3e53",
        "f7fcf3a0-5f9b-4fd4-a568-f707f30c6101",
        "d8b4ce0d-e05e-4f9b-bfc9-4ff9876c3659",
        "ed71fdef-8733-48c8-95ca-fe19234186ac",
        "59a87630-6e66-456c-b921-ee84c4b18c55",
        "56922829-c725-4728-8fed-355b525c7341",
        "b1074570-58e0-43e6-a20b-0805c0cfb852",
        "ad139730-c6d0-4d26-ab40-be80f4f8960d",
        "473e35ab-426a-43de-888a-06382e373a2b",
        "753c08ad-51a6-4f31-8dd4-5009fa53a0d1",
        "851f8153-7660-4d90-947e-62ce090813b0",
        "7e1911ab-009c-4001-a89a-13cd2bdf401c",
        "bd8b8dc1-58f2-418a-ad7c-1305d31913b2",
        "9e4cf931-6c77-4892-9f4d-0e788c47378a",
        "9271f2d8-5afc-4c13-9bcd-10bfeb8ddf5e",
        "7ae7b34f-e657-470f-b778-404e09227838",
        "20d8a5e4-b50e-4aea-a4d1-ffde9f83bc7c",
        "6b81e67c-cf64-4f89-b75f-60f12067ede3",
        "ad004228-683f-4f73-ad61-9e739e684da9",
        "3fd59aea-85a9-4ca6-972f-a622e5cd5ede",
        "2107dfe9-0176-430c-a4b4-65e11cd0fb4f",
        "69214fb5-31a8-4b9e-86b1-217365bb7c8c",
        "80f3928e-d405-4972-836c-a94872ec66be",
        "d7955aeb-9ea7-4dfa-bb09-c3c889e2220f",
        "e8b3f005-06db-432f-a955-e23796a6c2b6",
        "cb77de8c-d8d8-4248-9fa2-07f2bb77b1af",
        "648051d9-f738-45a6-b7e2-a5b432c35ab5",
        "0adf56d2-8ae1-406e-a0d3-3ebe47e9f0e2",
        "4553f7db-3d25-415f-985b-248b5b709396",
        "ea642630-8813-4e72-8e84-4b7fcbd269e9",
        "4c665acc-4990-416c-8f56-161cf6f9450f",
        "58dbf633-b046-4f78-b8fa-14ea5fa4e2cc",
        "9d2398f2-77dd-4f4c-80fa-f96a3209f1a3",
        "f7fc5ab0-7f81-42f4-a76c-90ef13cb131e",
        "9b3a2303-6f18-456f-b97e-d0323fc0f66a",
      ],
    },
    nft: {
      _and: [
        {
          attributes: {
            type: {
              _eq: "rarity",
            },
            value: {
              _in: ["2", "3", "4"],
            },
          },
        },
      ],
    },
  },
  order_by: [
    {
      block_time: "desc_nulls_last",
    },
    {
      nft: {
        ranking: "asc",
      },
    },
  ],
};

// Function to fetch the listings data
async function fetchListings() {
  try {
    const res = await axios({
      url: "https://api.indexer.xyz/graphql",
      method: "post",
      data: { query, variables },
      headers: {
        apiKey: api_key,
        apiUser: api_user,
      },
    });
    return res.data.data.sui.listings;
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    return [];
  }
}

// Function to process each listing: preview data, modify if needed, and submit a transaction
async function processListings() {
  const listings = await fetchListings();
  // console.log("Fetched listings:", listings);

  for (const nft of listings) {
    // Preview each NFT item in the console
    // console.log(`NFT ID: ${nft.id}, Price: ${nft.price}`);

    // Check the price threshold before attempting to buy
    if (nft.price <= 5000000000) {
      try {
        // console.log(`Fetching buy transaction for NFT ID: ${nft.id}...`);
        // Fetch the buy transaction from Tradeport SDK
        const transaction = await suiTradingClient.buyListings({
          listingIds: [nft.id],
          walletAddress: address,
        });
        // console.log(`Signing and executing transaction for NFT ID: ${nft.id}...`);
        // Sign and execute the transaction
        const result = await client.signAndExecuteTransaction({
          transaction: transaction,
          signer: keypair,
          requestType: "WaitForLocalExecution",
          options: {
            showEffects: true,
          },
        });
        console.log(`🎉 Transaction Successful for NFT ID: ${nft.id}`);
      } catch (error) {
        console.error(
          `❌ Transaction Failed for NFT ID: ${nft.id}:`,
          error.message
        );
      }
    }
  }
}

// Optionally, run the processListings function at set intervals
processListings();
setInterval(processListings, 5000);
