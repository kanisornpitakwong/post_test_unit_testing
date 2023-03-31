// import MockAdapter from "axios-mock-adapter";
import axios from "axios";

export async function getPrice(customerQuantity: number){
   
    const result = await axios.post("/get-payment-information",{
        customerQuantity: customerQuantity,
    });

    return Math.trunc(result.data.data.price);
}