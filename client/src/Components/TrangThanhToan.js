import React, { useEffect, useState } from "react";
import "../../src/TrangThanhToan.css";
import Header from "./Header";
import InfoTicket from "./Plane/InfoTicket";
import { useLocation } from "react-router-dom";

function TrangThanhToan() {
  const [isCheckPickPay, setCheckPickPay] = useState(false);

  const handleCheckPickPay = () => {
    setCheckPickPay(!isCheckPickPay);
  };

  const dataHref = useLocation();
  const { dataTicket, dataFlight, idDH, idUser } = dataHref.state;

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
      const req = fetch(
        `http://localhost:4001/api/update_donhang/${dataTicket[0].maDon}`,
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
      console.error("Bug when delete don hang:", error);
    }
  };

  const handlePay = async () => {
    try {
      const dhCreate = await fetch(
        "https://presspay-api.azurewebsites.net/api/v1/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            private_key:
              "pk_presspay_7914786efc32aa8635cad9b16b48a6e8f350e3856f39c4abc5bcc6f148536366",
            amount: isTongPriceTicket,
            currency: "VND",
            message:
              idUser + " order " + dataTicket.length + " ticket of " + idDH,
            userID: idUser,
            orderID: idDH,
            return_url: "http://localhost:3000/Setting/HistoryTicket",
          }),
        }
      );

      const dhJS = await dhCreate.json();

      const dhId = dhJS._id;

      // await handleResTicket(dhId);
    } catch (error) {
      console.error("Bug when creating order:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 w-full">
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
                <div
                  className={`flex  p-3 ${isCheckPickPay ? "bg-orange-500 hover:bg-orange-400" : "bg-[#b8b2b2]"} select-none rounded-md mt-4 items-center justify-center cursor-pointer`}
                  onClick={handlePay}
                >
                  <h1 className={`font-bold text-white text-xl`}>
                    Thanh toán bằng PressPay
                  </h1>
                </div>

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
export default TrangThanhToan;
