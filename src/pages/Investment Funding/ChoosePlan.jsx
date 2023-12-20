import React, { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Col,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import { useContext } from "react";
// import { AuthContext } from "Context/AuthProvider";
// import cashfree from "../../../src/assets/img/icons/common/cashfree.png";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import swal from "sweetalert";
// import Transactions from "./Transactions";
// import { reload } from "firebase/auth";

const Deposit = () => {
  // const { user, setUpdate, update } = useContext(AuthContext);
  // console.log(user)
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const url = `https://indian.munihaelectronics.com/public/api/SingleUser/6`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  const wallet = userInfo?.wallet;
  console.log(wallet);

  const typeOfPayment = ["Cashfree", "HandCash"];
  const [paytype, setPayType] = useState(null);
  console.log(paytype);
  // const [successText, setSuccessText] = useState('');

  const [transactioninfo, setTransactioninfo] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  console.log(depositAmount);
  const navigate = useNavigate();
  const w = parseInt(wallet);
  const newWallet = w + depositAmount;

  const [transactionDetails, setTransactionDetails] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");
  const orderToken = queryParams.get("order_token");
  console.log("Show", orderId, orderToken);

  // Show Recent 5 Transactions
  useEffect(() => {
    fetch(
      `https://indian.munihaelectronics.com/public/api/show_usertransaction/6`
    )
      .then((res) => res.json())
      .then((data) => setTransactioninfo(data));
  }, []);

  const test = async (e) => {
    const depositData = {
      userid: user?.id,
      amount: transactionDetails?.order_amount,
      method_type: "CashFree",
      description: "Payment deposited by Cashfreee",
    };
    console.log("Deposit Amount", depositData);
    const emailData = {
      to: user?.email,
      deposit_amount: transactionDetails?.order_amount,
    };
    try {
      const response = await axios.post(
        "https://indian.munihaelectronics.com/public/api/deposit",
        depositData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setSuccessText(response)
    } catch (error) {
      console.error("Error creating payment:", error);
    }
    try {
      const response = axios.post(
        "https://indian.munihaelectronics.com/public/api/send-user-deposit-email",
        emailData
      );
      if (response.status === 200) {
        // swal({
        //   title: "Successflly Mailed!",
        //   text: response?.data?.message,
        //   icon: "Mailed",
        // });
      } else {
        // Display error message to the user
      }
    } catch (error) {
      // Handle errors
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    const formData = {
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile_no,
      amount: depositAmount,
    };
    console.log(formData);

    if (paytype == "Cashfree" || paytype == "Handcash") {
      try {
        if (paytype === "Cashfree") {
          const response = await axios.post(
            "https://indian.munihaelectronics.com/public/api/create-payment",
            formData
          );
          const paymentLink = response.data.payment_link;
          window.location.href = paymentLink;
        } else {
          navigate("/user/index");
        }
      } catch (error) {
        console.error("Error creating payment:", error);
        // Handle error here
      }
    }
  };

  useEffect(() => {
    fetch(
      `https://indian.munihaelectronics.com/public/api/cashfree/payments/success?order_id=${orderId}&order_token=${orderToken}`
    )
      .then((res) => res.json())
      .then((data) => setTransactionDetails(data));
  }, []);
  console.log(transactionDetails);
  // transactionDetails.order_amount > 0 && transactionDetails.payment_status==='success'

  console.log(transactionDetails.payment_status);

  if (transactionDetails.cf_settlement_id != null) {
    test();

    const userDataString = localStorage.getItem("userInfo"); // Change 'userInfo' to your actual local storage key
    let userData = {};

    if (userDataString) {
      try {
        userData = JSON.parse(userDataString);
      } catch (error) {
        console.error("Error parsing userData from local storage", error);
      }
    }

    // Step 2: Update wallet balance in userData object
    const amountToAdd = transactionDetails.order_amount; // Example amount to add
    const newWalletBalance = parseFloat(userData.wallet) + amountToAdd;

    window.localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...user, wallet: newWalletBalance })
    );
    setUpdate(!update);
    swal({
      title: "Deposited Successfully",
      text: "Success",
      icon: "success",
    });
    navigate("/user/index");
  }
  // else{
  //   swal({
  //     title: "Deposit Faiure",
  //     text: 'fail',
  //     icon: "warning",
  //   });
  // }

  return (
    <div>
      <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-4">
        <div className="col-span-2  shadow-lg rounded bg-white ">
          <form class="w-full max-w-full px-4 pt-4" onSubmit={handleDeposit}>
            <div class="flex flex-wrap mb-2 -mx-3 ">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Enter Deposit Amount*
                </label>
                <input
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3  mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  type="number"
                  required
                  onChange={(e) => setDepositAmount(+e.target.value)}
                  min={1}
                />
                {/* <p class="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p> */}
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Select Payment Method*
                </label>
                <select
                  class="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="exampleSelect"
                  onChange={(e) => setPayType(e.target.value)}
                >
                  <option>Select</option>
                  <option>Cashfree</option>
                  <option>HandCash</option>
                </select>
              </div>
            </div>
            {/* <div className=" mt-2 text-center col">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={depositAmount == "" || paytype == null}
              >
                Add Deposit
              </button>
            </div> */}
            <div className=" mt-2 text-center mb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mx-auto"
                type="submit"
                disabled={depositAmount == "" || paytype == null}
              >
                Add Deposit
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1 mt-5 lg:mt-0  shadow-lg rounded bg-white ">
          <div className="text-center pt-4">
            {" "}
            <p>View deposit History</p>
          </div>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="col">
            <h3 className=" text-gray-700 font-medium">
              Recent Deposit History
              {/* {transactioninfo.length < 5 ? transactioninfo.length : "5"} */}
            </h3>
          </div>
          <div className="  text-right">
            <Link to="/user/transactions/deposit">
              <button
                className="bg-blue-600 text-white rounded-lg p-1 text-sm"
                size="sm"
              >
                See all
              </button>
            </Link>
          </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs bg-blue-500 text-white uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                SL No
              </th>
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Method Type
              </th>
              <th scope="col" class="px-6 py-3  ">
                Description
              </th>
             
            </tr>
          </thead>
          <tbody>
            {/* { transactioninfo.slice(-6).map((tnx,i)=>(

       ))} */}
            {transactioninfo?.slice(-6).map((tnx, i) => (
             tnx?.tnx_type == 'DR'?  <tr class="border-b border-gray-200 dark:border-gray-700">
             <td class="px-6 py-4">{i+1}</td>
             <td class="px-6 py-4">{tnx?.amount}</td>
             <td class="px-6 py-4 ">{tnx?.method_type}</td>
             <td class="px-6 py-4">{tnx?.description}</td>
           </tr> : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deposit;
