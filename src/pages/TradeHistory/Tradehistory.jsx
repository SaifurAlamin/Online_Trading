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

const Tradehistory = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [historyData, setHistoryData] = useState([""]);
  const history = historyData;
  //   const { user } = useContext(AuthContext);
  // console.log(sessionToken);

  const duration = (std, ed) => {
    const start = new Date(std);
    const end = new Date(ed);
    const find = end - start;
    const h = Math.floor(find / (1000 * 60 * 60));
    const min = Math.floor((find % (1000 * 60 * 60)) / (1000 * 60));
    // console.log(h+"h "+min+"m");
    const d = h + "h " + min + "m";
    return d;
  };

  const token = localStorage.getItem("token");

  // // Second API parameters
  const accountId = 10125757;
  const historyApiUrl = `https://www.myfxbook.com/api/get-history.json?session=${token}&id=${accountId}`;

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get(historyApiUrl);
      setHistoryData(response.data?.history);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  useEffect(() => {
    fetchHistoryData();
  }, []);

  return (
    <div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Recent Trade History
          </h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs rounded uppercase text-white dark:text-dark bg-[#1A237E]  dark:bg-slate-700 dark:bg-opacity-50 ">
                <tr>
                  <th className="p-3" scope="col">
                    SL. No.
                  </th>
                  <th className="p-3" scope="col">
                    Open Date
                  </th>
                  <th className="p-3" scope="col">
                    Close Date
                  </th>
                  <th className="p-3" scope="col">
                    Symbol
                  </th>
                  <th className="p-3" scope="col">
                    Action
                  </th>
                  <th className="p-3" scope="col">
                    Lots
                  </th>
                  <th className="p-3" scope="col">
                    Open Price
                  </th>
                  <th className="p-3" scope="col">
                    Close Price
                  </th>
                  <th className="p-3" scope="col">
                    Pips
                  </th>
                  <th className="p-3" scope="col">
                    Net Profit
                  </th>
                  <th className="p-3" scope="col">
                    Duration
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {history.map((historyData, index) => (
                  <tr>
                    <th className="p-2" scope="row">
                      {index + 1}
                    </th>
                    <td className="p-2">{historyData?.openTime}</td>
                    <td className="p-2">{historyData?.closeTime}</td>
                    <td className="text-center p-2">{historyData?.symbol}</td>
                    <td className="text-center p-2">{historyData?.action}</td>
                    <td className="text-center p-2">
                      {historyData?.sizing?.value}
                    </td>
                    <td className="text-center p-2">
                      {historyData?.openPrice}
                    </td>
                    <td className="text-center p-2">
                      {historyData?.closePrice}
                    </td>
                    <td className="text-center p-2">{historyData?.pips}</td>
                    <td className="text-center p-2">{historyData?.profit}</td>
                    <td className="text-center p-2">
                      {duration(historyData?.openTime, historyData?.closeTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tradehistory;
