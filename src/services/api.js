import axios from "axios";

export async function getCurrencies() {
  try {
    const response = await axios.get(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
