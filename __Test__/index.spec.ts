import { getPrice } from "../index";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";


describe('test', ()=>{
    var mock = new MockAdapter(axios,  { onNoMatch: "throwException" });
    beforeEach(() => {
        mock.reset();
    })
    it('total customer : 5 / total price should be 1870', async ()=>{
        //arrange
        const customerQuantity = 5;
        const expectedResult = 1870;

        mock.onPost("/get-payment-information", {
            customerQuantity: customerQuantity,
        })
        .reply(200, {
            statusCode: 1,
	        status: "success",
	        message: "send message complete",
	        data: {
                // price: ((Math.trunc(customerQuantity / 4) * 3) + (customerQuantity%4)) * 340 * 1.1
                price: customerQuantity %4 == 0 ? (customerQuantity / 4) * 3 * 340 *1.1 : customerQuantity * 340 *1.1
            }
        })
        
        //action
        var result = await getPrice(customerQuantity);

        //assert
        expect(result).toBe(expectedResult);
    });
    test.each([
        {
            customerQuantity:1,
            expectedResult:374
        },
        {
            customerQuantity:2,
            expectedResult:748
        },
        {
            customerQuantity:3,
            expectedResult:1122
        },
        {
            customerQuantity:4,
            expectedResult:1122
        },
        {
            customerQuantity:5,
            expectedResult:1870
        },
        {
            customerQuantity:6,
            expectedResult:2244
        },
        {
            customerQuantity:7,
            expectedResult:2618
        },
        {
            customerQuantity:8,
            expectedResult:2244
        }
    ])(`total customer : $customerQuantity / total price should be $expectedResult`, ({customerQuantity, expectedResult}) => {
        mock.onPost("/get-payment-information", {
            customerQuantity: customerQuantity,
        })
        .reply(200, {
            statusCode: 1,
            status: "success",
            message: "send message complete",
            data: {
                // price: ((Math.trunc(customerQuantity / 4) * 3) + (customerQuantity%4)) * 340 * 1.1
                price: customerQuantity %4 == 0 ? (customerQuantity / 4) * 3 * 340 *1.1 : customerQuantity * 340 *1.1
            }
        })
        getPrice(customerQuantity).then(function(result){
            expect(result).toBe(expectedResult);
        })
      });

})