import React, { memo, useContext, useEffect, useState } from "react";
import "../../src/TrangThanhToan.css";
import Header from "./Header";
import InfoTicket from "./Plane/InfoTicket";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CONTEXT } from "../Context/WindowLogin";
function TrangThanhToan() {
  const [notiMinues, setNotiMinues] = useState(true);
  const dataHref = useLocation();
  if (!dataHref || !dataHref.state) {
    window.location.href =
      "https://vercel-travrel-home.vercel.app/XemDanhSachChuyenBay";
  } else {
  }
  const { dataTicket, dataFlight, idDH, idUser } = dataHref.state;

  localStorage.setItem("tickets", JSON.stringify(dataTicket));
  localStorage.setItem("idDH", idDH);

  const [isCheckPickPay, setCheckPickPay] = useState(false);

  function formatNumber(num) {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(",");
  }

  const handleCheckPickPay = () => {
    setCheckPickPay(!isCheckPickPay);
  };

  let [isTongPriceTicket, setTongPriceTicket] = useState(0);

  const hanldeSumPriceTicket = () => {
    let sum = 0;
    for (let i = 0; i < dataTicket.length; i++) {
      sum += dataTicket[i].giaVe;
    }
    setTongPriceTicket(sum);
    handlUpdateDH(sum);
  };
  useEffect(() => {
    hanldeSumPriceTicket();
    // handlUpdateDH();
    console.log(dataTicket[0].maDon);
  }, []);

  const handlUpdateDH = async (sum) => {
    try {
      const req = await fetch(
        `https://vercel-travrel.vercel.app/api/update_donhang/${dataTicket[0].maDon}`,
        {
          method: "PATCH", // Phương thức HTTP
          headers: {
            "Content-Type": "application/json", // Kiểu nội dung của request
          },
          body: JSON.stringify({
            tongGia: sum,
          }),
        }
      );
      if (!req.ok || !req) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Bug when update don hang:", error);
    }
  };

  const handlePay = async () => {
    const data = {
      private_key:
        "pk_presspay_7914786efc32aa8635cad9b16b48a6e8f350e3856f39c4abc5bcc6f148536366",
      amount: formatNumber(isTongPriceTicket),
      currency: "VND",
      message: idUser + " order " + dataTicket.length + " ticket of " + idDH,
      userID: idUser,
      orderID: idDH,
      return_url: "https://vercel-travrel-home.vercel.app/XemDanhSachChuyenBay",
    };
    console.log(data);
    try {
      const response = await axios.post(
        "https://presspay-api.azurewebsites.net/api/v1/payment",
        data
      );
      window.location.replace(response.data.url);
      // await handleResTicket(dhId);
    } catch (error) {
      console.log("Bug when creating order:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 w-full h-full">
        {notiMinues && <NotiMinutes setNotiMinues={setNotiMinues} />}

        <div className="pt-[50px] pb-[50px] bg-gray-100 flex justify-center">
          <div className="flex w-[70%] max-w-screen-xl gap-7">
            <div className="lg:w-[70%]">
              <div className="w-full bg-blue-600 p-5 justify-center text-center font-medium text-white rounded-t-xl">
                Đừng lo lắng, giá vẫn giữ nguyên. Hoàn tất thanh toán của bạn
                bằng{" "}
                <span className="ml text-green-400 font-medium px-2 py-1 rounded">
                  {/* {formatTime(timeLeft)} */}
                </span>
              </div>
              <div className="pt-[24px] pb-[24px] bg-white rounded-b-xl">
                <div className="p-4 flex gap-x-[224px]">
                  <h1 className="font-bold text-xl">
                    Bạn muốn thanh toán thế nào ?
                  </h1>
                  <img
                    className="h-[23px]"
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/12/1702364449716-d0093df3166e4ba84c56ad9dd75afcda.webp?tr=h-23,q-75"
                    alt=""
                  />
                </div>

                <div
                  className={`flex items-center gap-x-3 p-4 ${isCheckPickPay ? "text-black" : "text-[#b8b2b2]"}`}
                >
                  {isCheckPickPay ? (
                    <input
                      id="Thanh toán bằng PressPay"
                      type="radio"
                      disabled={false}
                      className="size-5"
                    />
                  ) : (
                    <input
                      id="Thanh toán bằng PressPay"
                      type="radio"
                      disabled
                      className="size-5"
                    />
                  )}

                  <label
                    for="Thanh toán bằng PressPay"
                    className="text-lg font-semibold"
                    onClick={handleCheckPickPay}
                  >
                    Thanh toán bằng PressPay
                  </label>
                </div>
              </div>

              <div className="p-4 mt-8 bg-white rounded-xl flex-col">
                <div className="flex">
                  <h1 className="font-medium text-xl">Tổng giá tiền</h1>
                  <h1 className="font-medium text-xl ml-auto">
                    {isTongPriceTicket} VND
                  </h1>
                </div>

                {/* //! thanh toán */}
                {isCheckPickPay && (
                  <div
                    className={`flex  p-3 ${isCheckPickPay ? "bg-orange-500 hover:bg-orange-400" : "bg-[#b8b2b2]"} select-none rounded-md mt-4 items-center justify-center cursor-pointer`}
                    onClick={handlePay}
                  >
                    <h1 className={`font-bold text-white text-xl`}>
                      Thanh toán bằng PressPay
                    </h1>
                  </div>
                )}

                {!isCheckPickPay && (
                  <div
                    className={`flex  p-3 ${isCheckPickPay ? "bg-orange-500 hover:bg-orange-400" : "bg-[#b8b2b2]"} select-none rounded-md mt-4 items-center justify-center cursor-pointer`}
                  >
                    <h1 className={`font-bold text-white text-xl`}>
                      Thanh toán bằng PressPay
                    </h1>
                  </div>
                )}

                <h1 className="font-medium text-xs mt-4 text-center">
                  Bằng cách tiếp tục thanh toán, bạn đã đồng ý Điều khoản & Điều
                  kiện và Chính sách quyền riêng tư.
                </h1>
              </div>
            </div>

            {/* //! ticket */}
            <div className="flex flex-col">
              {Array.from({ length: dataTicket.length }, (_, i) => (
                <InfoTicket
                  key={i}
                  dataFlight={dataFlight}
                  dataTicket={dataTicket[i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NotiMinutes({ setNotiMinues }) {
  return (
    <div className="fixed z-50 flex h-full w-full items-center justify-center bg-white/5 backdrop-brightness-75">
      <div className="absolute z-40 m-auto flex-col flex gap-y-3 h-fit w-[450px]   ">
        <p className="font-semibold bg-[#0194f3] text-white rounded-lg p-4 text-lg">
          Nếu bạn không thanh toán trong vòng 30 phút hệ thống sẽ tự động hủy vé
          của bạn. Xin cảm ơn!
        </p>
        <button
          className="font-semibold text-[#0194f3] bg-white rounded-lg p-4 text-lg"
          onClick={() => setNotiMinues(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default memo(TrangThanhToan);
