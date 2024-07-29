import { useEffect, useState, useContext } from "react";
import { CONTEXT } from "../../Context/WindowLogin";
import InterFaceRegister from "../Home/InterFaceRegister.js";
import {
  NotiFailEventlogin,
  CONTENT_UPDATE_FAIL,
  CONTENT_UPDATE_SUCCESS,
} from "../Noti/NotiFailEventLogin";
export function InfoAccount() {
  const {
    fullName,
    numberPhone,
    gender,
    birthday,
    password,
    isStateSaveRegister,
    setShowNotiSuccesUpdate,
    isShowNotiSuccesUpdate,
    userObj,
    statusLoginBool,
    naviReload,
    isShowOptionSetting_LoginSuccess,
    setShowOptionSetting_LoginSuccess,
  } = useContext(CONTEXT);
  useEffect(() => {
    if (isShowOptionSetting_LoginSuccess) {
      setShowOptionSetting_LoginSuccess(false);
    }
  }, []);
  if (!userObj && !statusLoginBool) {
    window.location.href = "/CNPM_Travel";
  }

  const [isShowNotiFailUpdate, setShowNotiFailUpdate] = useState(false);

  const submitUpdateUser_id = async (event) => {
    event.preventDefault();
    const id = userObj._id;

    try {
      const response = await fetch(
        `https://vercel-travrel.vercel.app/api/update_user/${id}`,
        {
          method: "PATCH", // Phương thức HTTP
          headers: {
            "Content-Type": "application/json", // Kiểu nội dung của request
          },
          body: JSON.stringify({
            numberPhone: numberPhone,
            fullName: fullName,
            gender: gender,
            birthday: birthday,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        setShowNotiFailUpdate(true);
        throw new Error(
          "Network response was not ok or number phone already existed"
        );
      }
      const data = await response.json();
      // setSubmitUpdate(!isSubmitUpdate);
      const fetchNewDataResponse = await fetch(
        `https://vercel-travrel.vercel.app/api/get_user/find_id_user/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!fetchNewDataResponse.ok) {
        throw new Error("Failed to fetch new data");
      }

      const newData = await fetchNewDataResponse.json();
      localStorage.setItem("user", JSON.stringify(newData));
      naviReload(0);
    } catch (error) {
      console.log(error);
    }
  };
  if (isShowNotiSuccesUpdate) {
    setTimeout(() => {
      setShowNotiSuccesUpdate(false);
    }, 1000);
  }

  if (isShowNotiFailUpdate) {
    setTimeout(() => {
      setShowNotiFailUpdate(false);
    }, 1800);
  }

  return (
    <>
      <p className="text-xl font-semibold p-5 text-center">
        Thông tin tài khoản
      </p>

      <form onSubmit={submitUpdateUser_id} className="relative m-auto">
        {isShowNotiFailUpdate && (
          <NotiFailEventlogin content={CONTENT_UPDATE_FAIL} />
        )}
        {isShowNotiSuccesUpdate && (
          <NotiFailEventlogin content={CONTENT_UPDATE_SUCCESS} />
        )}
        <InterFaceRegister />
        <div className="flex gap-6 w-full h-10 justify-end px-5">
          {!isStateSaveRegister ? (
            <button
              className="bg-slate-300 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg"
              type="button"
            >
              Lưu
            </button>
          ) : (
            <button
              type="submit"
              className="bg-sky-500 select-none h-fit w-fit p-3 font-semibold text-white text-base rounded-lg"
            >
              Lưu
            </button>
          )}
        </div>
      </form>
    </>
  );
}
