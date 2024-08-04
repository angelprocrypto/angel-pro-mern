import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getUserData } from "./redux/slices/appConfigSlice";
import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import LoadingBar from "react-top-loading-bar";
import Signup from "./components/Signup";
import DepositForm from "./components/Deposite";
import WithdrawalForm from "./components/Withdrawal";
import DepositeHistory from "./components/DepositHistory";
import PageInProcess from "./components/PageInProcess";
import BankAccountForm from "./components/BankAccountForm";
import AdminPanel from "./components/AdminPanel";
import SellForm from "./components/SellForm";
import TransactionProgress from "./components/TransactionProgress";
import SellUsdtHistory from "./components/SellUsdtHistory";
import WithdrawalHistorys from "./components/WithdrawalHistorys";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const user = useSelector((state) => state.appConfigReducer.userData);

  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <>
      <ChakraProvider>
        <LoadingBar color="red" ref={loadingRef} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/deposit" element={<DepositForm />} />
          <Route path="/withdrawal" element={<WithdrawalForm />} />
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellusdt" element={<SellForm />} />
          <Route path="/depositHistory" element={<DepositeHistory />} />
          <Route path="/withdrawalHistory" element={<WithdrawalHistorys />} />
          <Route path="/invite" element={<PageInProcess />} />
          <Route path="/addBank" element={<BankAccountForm />} />
          <Route path="/payeeHistory" element={<SellUsdtHistory />} />
          <Route
            path="/isjvkvspokrgirjctqjorigjfmaklmcefkmwoevjgipljmcgniovqjfov90rgjosjerg2qjcrojg"
            element={user?.phone == "918766492553" ? <AdminPanel /> : null}
          />
          <Route
            path="/transactionProgress"
            element={<TransactionProgress />}
          />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
