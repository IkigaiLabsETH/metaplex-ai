import axios from "axios";

export const getSOLPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    return response.data.solana.usd;
  } catch (error) {
    console.error("Error fetching Solana price:", error);
    return 0; // Return a default value or handle the error as needed
  }
};
