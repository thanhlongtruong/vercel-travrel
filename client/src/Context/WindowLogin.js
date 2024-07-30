import { createContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";
const schedule = require("node-schedule");

export const CONTEXT = createContext({});
export const OrderProvider = ({ children }) => {
  const naviReload = useNavigate();

  //! func show interface login uaer
  const [isShowInterfaceLogin, setShowInterfaceLogin] = useState(false);

  const handleShowInterfaceLogin = () => {
    setShowInterfaceLogin(!isShowInterfaceLogin);
  };

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

  const navi = useNavigate();
  const searchForChuyenBay = () => {
    localStorage.setItem("dtSelect1Value", select1Value);
    localStorage.setItem("dtSelect2Value", select2Value);
    localStorage.setItem("dtNgayDi", ngayDi);
    navi("/XemDanhSachChuyenBay");
  };

  //Trang History
  const [veDangSua, setVeDangSua] = useState(null);
  const [ves, setVes] = useState([]);
  const [donDangSua, setDonDangSua] = useState(null);
  //!MEWWWWWWWW KIET
  const [isBay, setBay] = useState(null);
  const [isDap, setDap] = useState(null);
  const [today, setToday] = useState(new Date(ngayDi));
  const [switchNgayBay, setSwitchNgayBay] = useState(
    format(new Date(ngayDi), "EEEE, d 'thg' M yyyy", { locale: vi })
  );

  //mở dialog và set sân bay
  const [dialogDoiTimKiem, setDialogDoiTimKiem] = useState(false);
  const handleDialogDoiTimKiem = (text1, text2, date) => {
    setDialogDoiTimKiem(dialogDoiTimKiem ? false : true);

    setBay(text1);
    setDap(text2);
    setToday(date);
    setSwitchNgayBay(format(today, "EEEE, d 'thg' M yyyy", { locale: vi }));
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
  const [isInputPassword, setInputPassword] = useState("");
  const [isShowNotiFailLogin, setShowNotiFailLogin] = useState(true);
  const [isShowNotiSuccesLogin, setShowNotiSuccessLogin] = useState(false);

  //TODO func handle login
  const handleEventLogin = () => {
    if (
      isUser.password !== isInputPassword ||
      isUser.status === "Tài khoản đã bị khóa"
    ) {
      setShowNotiFailLogin(!isShowNotiFailLogin);
    } else {
      setStateLogin(true);
      setShowInterfaceLogin(!isShowInterfaceLogin);
      setShowNotiSuccessLogin(true);
      localStorage.setItem("user", JSON.stringify(isUser));
      localStorage.setItem("statusLogin", !isStateLogin);
    }
  };

  //TODO func handle logout
  const handleSetStateLogin_Logout = () => {
    setShowOptionSetting_LoginSuccess(!isShowOptionSetting_LoginSuccess);
    setStateLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("StateLogin");
    localStorage.removeItem("dtSelect1Value");
    localStorage.removeItem("dtSelect2Value");
    localStorage.removeItem("dtNgayDi");

    window.location.reload();
  };

  // '0': Phút (0-59)
  // '10': Giờ (0-23)
  // '*': Ngày trong tháng (1-31)
  // '*': Tháng (1-12)
  // '*': Ngày trong tuần (0-6, 0 là Chủ Nhật)
  //TODO auto remove user in localStorage
  schedule.scheduleJob("10 10 * * *", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("statusLogin");
    localStorage.removeItem("dtSelect1Value");
    localStorage.removeItem("dtSelect2Value");
    localStorage.removeItem("dtNgayDi");
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

  const [isShowOptionSetting_LoginSuccess, setShowOptionSetting_LoginSuccess] =
    useState(false);

  //! func show option login when login success
  const handleShowOptionSetting_LoginSuccess = () => {
    setShowOptionSetting_LoginSuccess(!isShowOptionSetting_LoginSuccess);
  };

  //! get user from local storge
  const user_local = localStorage.getItem("user");
  const userObj = JSON.parse(user_local);
  const statusLogin_local = localStorage.getItem("statusLogin");
  const statusLoginBool = JSON.parse(statusLogin_local);
  const location = useLocation();
  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      if (user_local) {
        await setUser(userObj);
        setStateLogin(statusLoginBool);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("statusLogin");
      }
    };
    loadUserFromLocalStorage();
  }, [location]);

  //TODO
  const [fullName, setFullName] = useState(userObj ? userObj.fullName : " ");
  const [checkFullName, checkSetFullName] = useState(true);
  const [numberPhone, setNumberPhone] = useState(
    userObj ? userObj.numberPhone : " "
  );
  const [checkNumberPhone, checkSetNumberPhone] = useState(true);
  const [password, setPassword] = useState(userObj ? userObj.password : "");
  const [checkPassword, checkSetPassword] = useState(true);
  const [gender, setGender] = useState(userObj ? userObj.gender : " ");
  const [checkGender, checkSetGender] = useState(true);
  const [birthday, setBirthday] = useState(userObj ? userObj.birthday : " ");
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
      gender.trim().length >= 0 &&
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

  const [isSaveAllCb, setSaveAllCb] = useState([]);
  const naviDtChuyenBays = useNavigate();
  const handle = () => {
    if (isSaveAllCb) {
      naviDtChuyenBays("/Setting/InfoAccount", {
        state: {
          dtChuyenBays: isSaveAllCb,
        },
      });
    }
  };
  const handles = () => {
    if (isSaveAllCb) {
      naviDtChuyenBays("/Setting/HistoryTicket", {
        state: {
          dtChuyenBays: isSaveAllCb,
        },
      });
    }
  };

  //!=========================================================================================================================================================================================================================================
  //? Context Flight =========================================================================================================================================================================================================================

  const storedTime = localStorage.getItem("timeRemaining");
  const [time, setTime] = useState();
  const [isCountingDown, setIsCountingDown] = useState();
  useEffect(() => {
    if (storedTime !== null) {
      setTime(parseInt(storedTime));
      setIsCountingDown(true);
    }
  }, [location]);
  useEffect(() => {
    let interval;

    // Kiểm tra giá trị timeRemaining trong Local Storage

    if (isCountingDown && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeRemaining", newTime);
          return newTime;
        });
      }, 1000);
    }

    if (time === 0) {
      setIsCountingDown(false);
      localStorage.removeItem("timeRemaining");
      handelDeleteDataBefor30p();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCountingDown, time]);

  const handleSetTime = () => {
    setIsCountingDown(true);
    setTime(30 * 60);
  };

  const handelDeleteDataBefor30p = async () => {
    const ticketsLocal = localStorage.getItem("tickets");
    const idDHLocal = localStorage.getItem("idDH");
    const dataTickets = JSON.parse(ticketsLocal);

    let quantityTicketThuong = 0;
    let quantityTicketThuongGia = 0;
    for (let i = 0; i < dataTickets.length; i++) {
      if (dataTickets[i].hangVe === "Vé thường") {
        quantityTicketThuong += 1;
      } else if (dataTickets[i].hangVe === "Vé thương gia") {
        quantityTicketThuongGia += 1;
      }
    }
    try {
      const response = await fetch(
        `https://vercel-travrel.vercel.app/api/get/flight/${dataTickets[0].chuyenBayId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      await hadleDeleteTicket(dataTickets);
      await handleDeleteDH(idDHLocal);
      await handleUpdateCB(data, quantityTicketThuong, quantityTicketThuongGia);

      localStorage.removeItem("tickets");
      localStorage.removeItem("idDH");
      window.location.href =
        "https://vercel-travrel-home.vercel.app/XemDanhSachChuyenBay";
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const hadleDeleteTicket = async (dataTickets) => {
    try {
      for (let i = 0; i < dataTickets.length; i++) {
        const deleteTicket = await fetch(
          `https://vercel-travrel.vercel.app/api/delete_ticket/${dataTickets[i]._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!deleteTicket.ok || !deleteTicket) {
          throw new Error("Network response was not ok");
        }
      }
    } catch (err) {
      console.error("Bug when xoa ve and xoa don hang");
    }
  };

  const handleDeleteDH = async (idDHLocal) => {
    const reqDH = await fetch(
      `https://vercel-travrel.vercel.app/api/delete_donhang/${idDHLocal}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!reqDH.ok || !reqDH) {
      throw new Error("Network response was not ok");
    }
    console.log("Xoa don hang thanh cong");
  };

  const handleUpdateCB = async (
    data,
    quantityTicketThuong,
    quantityTicketThuongGia
  ) => {
    const req = await fetch(
      `https://vercel-travrel.vercel.app/api/update/flight/${data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soGheThuong: data.soGheThuong + quantityTicketThuong,
          soGheThuongGia: data.soGheThuongGia + quantityTicketThuongGia,
        }),
      }
    );
    if (!req.ok || !req) {
      throw new Error("Network response was not ok");
    }
  };

  //!
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

  const navigate = useNavigate();
  const handleMake_a_Reservation = async ({ quantityTicket, flight }) => {
    if (!isUser) {
      setShowInterfaceLogin(!isShowInterfaceLogin);
      setTimeShowNotiMake_a_Reservation(true);
    } else {
      const ticket = {
        soLuongVe: quantityTicket,
        trangThaiVe: "Đang chờ thanh toán",
        userID: isUser._id,
      };
      try {
        // await setTicket(ticket);

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

  return (
    <CONTEXT.Provider
      value={{
        time,
        handleSetTime,
        isCountingDown,
        setTime,
        setIsCountingDown,
        setSaveAllCb,
        handle,
        handles,
        naviReload,
        userObj,
        statusLoginBool,
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
        dialogDoiTimKiem,
        handleDialogDoiTimKiem,
        setDialogDoiTimKiem,
        isBay,
        setBay,
        isDap,
        setDap,
        today,
        setToday,
        setSwitchNgayBay,
        switchNgayBay,
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
        handleDialogDoiTimKiem,
        searchForChuyenBay,
        veDangSua,
        setVeDangSua,
        ves,
        setVes,
        donDangSua,
        setDonDangSua,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
