import { createContext, useEffect, useRef, useState } from "react";
import { format, addDays, parse } from "date-fns";
import { is, vi } from "date-fns/locale";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
const schedule = require("node-schedule");

export const CONTEXT = createContext({});
export const OrderProvider = ({ children }) => {
  const [isShowInterfaceLogin, setShowInterfaceLogin] = useState(false);

  const handleShowInterfaceLogin = () => {
    setShowInterfaceLogin(!isShowInterfaceLogin);
  };

  //clone block html dựa vào ref
  const blockRef = useRef([]);
  const [clonedBlock, setClonedBlock] = useState(null);
  const handleClonedBlock = (index) => {
    if (blockRef.current[index]) {
      const blockElement = blockRef.current[index].cloneNode(true);
      setClonedBlock(blockElement);
    }
  };

  //open dialog chỉnh số lượng và hạng
  const [isChonMuaClick, setChonMuaClick] = useState(false);
  const handleChonMuaClick = () => {
    setChonMuaClick(!isChonMuaClick);
  };

  //TODO variable set object user
  const [isUser, setUser] = useState(null);

  //TODO variable status check login
  const [isStateLogin, setStateLogin] = useState(false);
  const [isStateLoginF, setStateLoginF] = useState(false);
  const [isInputPassword, setInputPassword] = useState("");
  const [isShowNotiFailLogin, setShowNotiFailLogin] = useState(true);
  const [isShowNotiSuccesLogin, setShowNotiSuccessLogin] = useState(false);

  //TODO func handle login + ADMIN VERSION
  const naviLogin = useNavigate();
  const handleEventLogin = async () => {
    if (isUser.password !== isInputPassword) {
      window.alert("Sai mật khẩu");
    }
    if (
      isUser.numberPhone === "0967994185" &&
      isInputPassword === "admin@123"
    ) {
      localStorage.setItem("user", JSON.stringify(isUser));
      naviLogin("/AdminHome");
    }
  };

  //TODO func handle logout
  const handleSetStateLogin_Logout = () => {
    setShowOptionSetting_LoginSuccess(!isShowOptionSetting_LoginSuccess);
    setStateLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("StateLogin");
    window.location.reload();
  };

  // '0': Phút (0-59)
  // '10': Giờ (0-23)
  // '*': Ngày trong tháng (1-31)
  // '*': Tháng (1-12)
  // '*': Ngày trong tuần (0-6, 0 là Chủ Nhật)
  //TODO auto remove user in localStorage
  schedule.scheduleJob("0,15,30,45 * * * *", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("statusLogin");
  });

  //TODO auto off noti login fail
  if (!isShowNotiFailLogin) {
    setTimeout(() => {
      setShowNotiFailLogin(!isShowNotiFailLogin);
    }, 2500);
  }

  //TODO auto off noti login success
  if (isShowNotiSuccesLogin) {
    setTimeout(() => {
      setShowNotiSuccessLogin(false);
    }, 1000);
  }

  //TODO variable and function show option setting when login success
  const [isShowOptionSetting_LoginSuccess, setShowOptionSetting_LoginSuccess] =
    useState(false);
  const handleShowOptionSetting_LoginSuccess = () => {
    setShowOptionSetting_LoginSuccess(!isShowOptionSetting_LoginSuccess);
  };

  const location = useLocation();
  const user_local = localStorage.getItem("user");
  const statusLogin_local = localStorage.getItem("statusLogin");
  const userObj = JSON.parse(user_local);
  const statusLoginBool = JSON.parse(statusLogin_local);
  useEffect(() => {
    if (user_local) {
      setUser(userObj);
      setStateLogin(statusLoginBool);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("statusLogin");
    }
  }, [location]);

  //TODO
  const [fullName, setFullName] = useState(isUser ? isUser.fullName : " ");
  const [checkFullName, checkSetFullName] = useState(true);
  const [numberPhone, setNumberPhone] = useState(
    isUser ? isUser.numberPhone : " "
  );
  const [checkNumberPhone, checkSetNumberPhone] = useState(true);
  const [password, setPassword] = useState(isUser ? isUser.password : " ");
  const [checkPassword, checkSetPassword] = useState(true);
  const [gender, setGender] = useState(isUser ? isUser.gender : " ");
  const [checkGender, checkSetGender] = useState(true);
  const [birthday, setBirthday] = useState(isUser ? isUser.birthday : " ");
  const [checkBirthday, checkSetBirthday] = useState(true);
  const [isStateSaveRegister, setStateRegister] = useState(false);
  let converDate_userBirthday = new Date(birthday);

  const [isSubmitUpdate, setSubmitUpdate] = useState(false);

  useEffect(() => {
    if (isStateLogin && isUser) {
      setFullName(isUser.fullName);
      setNumberPhone(isUser.numberPhone);
      setPassword(isUser.password);
      setGender(isUser.gender);
      setBirthday(isUser.birthday);
    }
  }, [isStateLogin, isSubmitUpdate]);

  useEffect(() => {
    checkSetFullName(fullName.trimStart().length < 2 ? false : true);
  }, [fullName]);

  useEffect(() => {
    checkSetGender(
      gender.trim().length >= 2 &&
        !gender.trim().includes("Nam") &&
        !gender.trim().includes("Nữ")
        ? false
        : true
    );
  }, [gender]);

  useEffect(() => {
    checkSetBirthday(
      converDate_userBirthday.getFullYear() >= new Date().getFullYear()
        ? false
        : true
    );
  }, [birthday]);

  useEffect(() => {
    checkSetNumberPhone(
      numberPhone.trim().length !== 10 || !/^\d{10}$/.test(numberPhone)
        ? false
        : true
    );
  }, [numberPhone]);

  useEffect(() => {
    checkSetPassword(password.trim().length < 8 ? false : true);
  }, [password]);

  useEffect(() => {
    setStateRegister(
      checkFullName &&
        checkGender &&
        checkBirthday &&
        checkNumberPhone &&
        checkPassword
        ? true
        : false
    );
  }, [
    checkFullName,
    checkGender,
    checkBirthday,
    checkNumberPhone,
    checkPassword,
  ]);

  const [isShowNotiSuccesUpdate, setShowNotiSuccesUpdate] = useState(false);
  const [isReset_When_Update, setReset_When_Update] = useState(false);

  const [get_Id_User, setGet_Id_User] = useState(null);

  //!=========================================================================================================================================================================================================================================
  //? Context Flight =========================================================================================================================================================================================================================

  //? list flight
  const [isFlights, setFlights] = useState([]);

  //? set state open Window choose hạng vé
  const [isOpenChooseHangVe, setOpenChooseHangVe] = useState(false);
  const [hideDetailItemFlight, setHideDetailItemFlight] = useState(true);
  const [DontActionOpenDetailItem, setDontActionOpenDetailItem] =
    useState(true);
  const [getId_Flight, setId_Flight] = useState([]);

  const handleChooseOpenHangVe = ({ _id }) => {
    console.log(_id, " - id flight");
    setOpenChooseHangVe(!isOpenChooseHangVe);
    setHideDetailItemFlight(!hideDetailItemFlight);
    setId_Flight(_id);
    setDontActionOpenDetailItem(false);
  };

  //? status choose hạng vé

  //?

  const [isTimeShowNotiMake_a_Reservation, setTimeShowNotiMake_a_Reservation] =
    useState(false);
  const [isTicket, setTicket] = useState();
  const navigate = useNavigate();
  const handleMake_a_Reservation = async ({
    quantityTicket,
    isSoKyHanhLy,
    isTongGia,
    statusChooseTicket,
    flight,
  }) => {
    if (!isUser) {
      setShowInterfaceLogin(!isShowInterfaceLogin);
      setTimeShowNotiMake_a_Reservation(true);
    } else {
      const ticket = {
        soLuongVe: quantityTicket,
        soKyHanhLy: isSoKyHanhLy,
        hangVe: statusChooseTicket ? "Hạng thường" : "Hạng thương gia",
        giaVe: isTongGia,
        trangThaiVe: "Đang chờ thanh toán",
        userID: isUser._id,
        chuyenBayId: flight._id,
      };
      try {
        await setTicket(ticket);

        navigate("/XemDanhSachChuyenbBay/DatChoCuaToi", {
          state: {
            dataTicket: ticket,
            dataFlight: flight,
            dataUser: isUser,
          },
        });
      } catch (error) {
        console.error("Error setting ticket:", error);
      }
    }
  };

  //!
  if (isTimeShowNotiMake_a_Reservation) {
    setTimeout(() => {
      setTimeShowNotiMake_a_Reservation(false);
    }, 2500);
  }

  //!

  //TODO: ref item flight

  //TODO: UI show all flight
  //!

  //TODO: Func money VND
  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  //!NEWWWWWWWWW KIET
  //! new
  const [diemDenArray, setDiemDenArray] = useState([]);
  const [diemDiArray, setDiemDiArray] = useState([]);
  const [select1Value, setSelect1Value] = useState();
  const [select2Value, setSelect2Value] = useState();

  const [ngayDi, setNgayDi] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const monthS = month < 10 ? `0${month}` : `${month}`;
    const dayS = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${monthS}-${dayS}`;
  });
  //!MEWWWWWWWW KIET
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  return (
    <CONTEXT.Provider
      value={{
        userObj,
        isEditModalVisible,
        setIsEditModalVisible,
        isTimeShowNotiMake_a_Reservation,
        formatCurrency,
        handleChooseOpenHangVe,
        DontActionOpenDetailItem,
        getId_Flight,
        hideDetailItemFlight,
        handleMake_a_Reservation,
        handleChooseOpenHangVe,
        setOpenChooseHangVe,
        isOpenChooseHangVe,
        isFlights,
        setFlights,
        setGet_Id_User,
        get_Id_User,
        isReset_When_Update,
        setReset_When_Update,
        isShowNotiSuccesUpdate,
        setShowNotiSuccesUpdate,
        isSubmitUpdate,
        setSubmitUpdate,
        setShowOptionSetting_LoginSuccess,
        isShowNotiSuccesLogin,
        isStateSaveRegister,
        setStateRegister,
        birthday,
        checkBirthday,
        checkSetBirthday,
        fullName,
        setFullName,
        checkFullName,
        checkSetFullName,
        numberPhone,
        setNumberPhone,
        checkNumberPhone,
        password,
        setPassword,
        checkPassword,
        checkSetPassword,
        checkSetNumberPhone,
        gender,
        setGender,
        checkGender,
        checkSetGender,
        setBirthday,
        setShowNotiFailLogin,
        setInputPassword,
        isShowNotiFailLogin,
        handleSetStateLogin_Logout,
        handleShowOptionSetting_LoginSuccess,
        isShowOptionSetting_LoginSuccess,
        setUser,
        isUser,
        isShowInterfaceLogin,
        setShowInterfaceLogin,
        handleShowInterfaceLogin,
        
        isChonMuaClick,
        handleChonMuaClick,
        blockRef,
        clonedBlock,
        handleClonedBlock,
        isStateLogin,
        handleEventLogin,
        diemDenArray,
        setDiemDenArray,
        diemDiArray,
        setDiemDiArray,
        select1Value,
        setSelect1Value,
        select2Value,
        setSelect2Value,
        ngayDi,
        setNgayDi,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
