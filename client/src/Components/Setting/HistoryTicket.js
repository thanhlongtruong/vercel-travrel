import { CONTEXT } from "../../Context/WindowLogin";
import { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InfoTicket from "../Plane/InfoTicket.js";

function History() {
  const {
    veDangSua,
    userObj,
    statusLoginBool,
    isShowOptionSetting_LoginSuccess,
    setShowOptionSetting_LoginSuccess,
    donDangSua,
    setDonDangSua,
  } = useContext(CONTEXT);

  if (!userObj && !statusLoginBool) {
    window.location.href = "/CNPM_Travel";
  }
  useEffect(() => {
    if (isShowOptionSetting_LoginSuccess) {
      setShowOptionSetting_LoginSuccess(false);
    }
  }, []);
  const locateDtChuyenBays = useLocation();
  const { dtChuyenBays } = locateDtChuyenBays.state;
  useEffect(() => {
    console.log(dtChuyenBays);
  }, []);
  return (
    <>
      <p className="text-xl font-semibold p-5 text-center">Lịch sử đơn hàng</p>
      <div className="border-t p-5">
        <HistoryDon id={userObj._id} dtChuyenBays={dtChuyenBays} />
        {veDangSua && donDangSua && (
          <SuaVe
            ve={veDangSua}
            dtChuyenBays={dtChuyenBays}
            donhang={donDangSua}
          />
        )}
      </div>
    </>
  );
}

function HistoryDon({ id, dtChuyenBays }) {
  // useEffect(() => {
  //   console.log(dtChuyenBays);
  // });
  const { ves, setVes } = useContext(CONTEXT);

  const [donHangs, setDonHangs] = useState([]);
  const converDateToVNDate = (dateString) => {
    let vietnamDateTime = new Date(dateString).toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      //weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit",
    });
    return vietnamDateTime;
  };

  useEffect(() => {
    const fetchDonHang = async () => {
      try {
        const response = await fetch(
          `https://vercel-travrel.vercel.app/api/get/all_donhang`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDonHangs(data.filter((d) => d.userId === id));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchDonHang();
  }, []);

  useEffect(() => {
    const fetchVe = async () => {
      try {
        const response = await fetch(
          `https://vercel-travrel.vercel.app/api/get_all_tickets`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVes(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    fetchVe();
  }, []);

  const [historyVe, setHistoryVe] = useState(null);
  const handleHistoryVe = useCallback(
    (index) => {
      setHistoryVe(historyVe === index ? null : index);
    },
    [historyVe]
  );

  return (
    <div className="w-full h-fit">
      {donHangs &&
        donHangs.map((donhang, index) => (
          <div
            key={donhang._id}
            className="w-full h-fit border-2 p-2 rounded-lg mb-5"
          >
            <div className="flex justify-between">
              <div className="font-semibold line-clamp-1">
                Đơn hàng {index + 1}
              </div>
              <div className="">{converDateToVNDate(donhang.createdAt)}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="font-semibold line-clamp-1">Số lượng vé:</span>
                {donhang.soLuongVe}
              </div>
              <div>
                <span className="font-semibold line-clamp-1">Tổng giá:</span>
                {donhang.tongGia}
              </div>
              <div
                className="font-semibold line-clamp-1 cursor-pointer rounded-md bg-[#0194f3] p-2 text-white"
                onClick={() => handleHistoryVe(index)}
              >
                Xem chi tiết
              </div>
            </div>
            {historyVe === index && (
              <div className="bg-slate-300 mt-2 rounded-lg">
                <HistoryVe
                  ves={ves.filter((v) => v.maDon === donhang._id)}
                  dtChuyenBays={dtChuyenBays}
                  donhang={donhang}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

function HistoryVe({ ves, dtChuyenBays, donhang }) {
  // useEffect(() => {
  // console.log(dtChuyenBays);
  // });

  const { veDangSua, setVeDangSua, donDangSua, setDonDangSua } =
    useContext(CONTEXT);

  const reload = useNavigate();

  const getChuyenBay = (maChuyenBay) => {
    return dtChuyenBays.filter((cb) => cb._id === maChuyenBay)[0];
  };

  const getDateDiff = (ve) => {
    const currentDate = new Date();
    const targetDate = new Date(getChuyenBay(ve.chuyenBayId).dateDi);
    const timeDiff = currentDate.getTime() - targetDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  const huy = async (ve) => {
    try {
      const response = await fetch(
        `https://vercel-travrel.vercel.app/api/update_ticket/${ve._id}`,
        {
          method: "PATCH", // Phương thức HTTP
          headers: {
            "Content-Type": "application/json", // Kiểu nội dung của request
          },
          body: JSON.stringify({
            trangThaiVe: "Đã hủy",
          }),
        }
      );
      if (!response.ok) {
        return false;
        //throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    let newTongGia = donhang.tongGia - ve.giaVe;
    try {
      const response = await fetch(
        `https://vercel-travrel.vercel.app/api/update_donhang/${ve.maDon}`,
        {
          method: "PATCH", // Phương thức HTTP
          headers: {
            "Content-Type": "application/json", // Kiểu nội dung của request
          },
          body: JSON.stringify({
            tongGia: newTongGia,
          }),
        }
      );
      if (!response.ok) {
        return false;
        //throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  const updateSoLuongGheChuyenBay = async (ve) => {
    let cb = getChuyenBay(ve.chuyenBayId);
    try {
      if (ve.hangVe === "Vé thường") {
        let soGhe = cb.soGheThuong + 1;
        const response = await fetch(
          `https://vercel-travrel.vercel.app/api/update/flight/${ve.chuyenBayId}`,
          {
            method: "PATCH", // Phương thức HTTP
            headers: {
              "Content-Type": "application/json", // Kiểu nội dung của request
            },
            body: JSON.stringify({
              soGheThuong: soGhe,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
          return false;
        }
      } else if (ve.hangVe === "Vé thương gia") {
        let soGhe = cb.soGheThuongGia + 1;
        const response = await fetch(
          `https://vercel-travrel.vercel.app/api/update/flight/${ve.chuyenBayId}`,
          {
            method: "PATCH", // Phương thức HTTP
            headers: {
              "Content-Type": "application/json", // Kiểu nội dung của request
            },
            body: JSON.stringify({
              soGheThuongGia: soGhe,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  const handleHuy = (ve) => {
    let refundMoney = 0;
    if (ve.trangThaiVe === "Đã hủy" || getDateDiff(ve) >= 1) {
      console.log("Vé đã hủy 1 lần hoặc quá ngày bay");
    } else if (getDateDiff(ve) > -3 && getDateDiff(ve) < 1) {
      if (huy(ve)) {
        if (updateSoLuongGheChuyenBay(ve)) {
          reload(0);
          //console.log("Vé chỉ được hủy muộn nhất là trước ngày bay 3 ngày");
        }
      }
    } else if (getDateDiff(ve) <= -3) {
      if (huy(ve)) {
        if (updateSoLuongGheChuyenBay(ve)) refundMoney = ve.giaVe * 0.8;
        reload(0);
      }
    }
    console.log(refundMoney);
  };

  return (
    <div className="w-full overflow-x-scroll flex pt-2">
      {ves &&
        ves.map((ve, index) => (
          <div className="mx-2 bg-white">
            <InfoTicket
              dataFlight={getChuyenBay(ve.chuyenBayId)}
              //dataFlight={dtChuyenBays}
              dataTicket={ve}
            />
            <div className="flex justify-between">
              <div
                className={`cursor-pointer p-2 line-clamp-1 rounded-md bg-blue-400 ${ve.trangThaiVe === "Đã hủy" || getDateDiff(ve) >= 0 ? "pointer-events-none select-none bg-slate-600 text-white" : ""}`}
                onClick={() => {
                  setVeDangSua(veDangSua === null ? ve : null);
                  setDonDangSua(donDangSua === null ? donhang : null);
                }}
              >
                Sửa vé
              </div>
              <div
                className={`cursor-pointer p-2 line-clamp-1 rounded-md bg-red-500 ${ve.trangThaiVe === "Đã hủy" || getDateDiff(ve) >= 1 ? "pointer-events-none select-none bg-slate-600 text-white" : ""}`}
                onClick={() => handleHuy(ve)}
              >
                Hủy
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function SuaVe({ ve, dtChuyenBays, donhang }) {
  const { veDangSua, setVeDangSua, ves, setVes, donDangSua, setDonDangSua } =
    useContext(CONTEXT);
  const reload = useNavigate();

  const [hangVe, setHangVe] = useState(ve.hangVe);
  const [soKy, setSoKy] = useState(ve.soKyHanhLy);

  const [checkSoKy, setCheckSoKy] = useState();
  const [checkSoGhe, setCheckSoGhe] = useState();

  const getChuyenBay = (maChuyenBay) => {
    return dtChuyenBays.filter((cb) => cb._id === maChuyenBay)[0];
  };

  let chuyenBay = getChuyenBay(ve.chuyenBayId);

  useEffect(() => {
    if (soKy.toString().length > 0)
      setCheckSoKy(
        soKy - chuyenBay.khoiLuongQuyDinhTrenMotVe > 0 ? false : true
      );
    else {
      setCheckSoKy(false);
    }
    if (hangVe === "Vé thường") {
      setCheckSoGhe(chuyenBay.soGheThuong - 1 >= 0 ? true : false);
    } else if (hangVe === "Vé thương gia") {
      setCheckSoGhe(chuyenBay.soGheThuongGia - 1 >= 0 ? true : false);
    }
  }, [soKy, hangVe]);

  const handleCapNhat = async () => {
    if (chuyenBay === null) {
      console.log("No chuyen bay");
    } else {
      const currentDate = new Date();
      const targetDate = new Date(chuyenBay.dateDi);
      const timeDiff = currentDate.getTime() - targetDate.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff > -1) {
        window.alert("Vé chỉ được sửa muộn nhất là trước ngày bay 1 ngày");
      } else if (
        checkSoKy &&
        checkSoGhe &&
        (soKy !== ve.soKyHanhLy || hangVe !== ve.hangVe)
      ) {
        let flagCheckAllFetch = 0;

        let newGiaVe =
          hangVe === "Vé thường"
            ? chuyenBay.giaVeGoc
            : chuyenBay.giaVeGoc * 0.13;
        try {
          const response = await fetch(
            `https://vercel-travrel.vercel.app/api/update_ticket/${ve._id}`,
            {
              method: "PATCH", // Phương thức HTTP
              headers: {
                "Content-Type": "application/json", // Kiểu nội dung của request
              },
              body: JSON.stringify({
                hangVe: hangVe,
                giaVe: newGiaVe,
                soKyHanhLy: soKy,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.log(error);
          flagCheckAllFetch = 1;
        }
        //!cap nhat lai so ghe cho 2 hang
        if (flagCheckAllFetch === 0 && hangVe !== ve.hangVe) {
          try {
            if (hangVe === "Vé thường") {
              let soGhe1 = chuyenBay.soGheThuong - 1;
              let soGhe2 = chuyenBay.soGheThuongGia + 1;
              const response = await fetch(
                `https://vercel-travrel.vercel.app/api/update/flight/${ve.chuyenBayId}`,
                {
                  method: "PATCH", // Phương thức HTTP
                  headers: {
                    "Content-Type": "application/json", // Kiểu nội dung của request
                  },
                  body: JSON.stringify({
                    soGheThuong: soGhe1,
                    soGheThuongGia: soGhe2,
                  }),
                }
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              console.log(chuyenBay.soGheThuong);
              console.log(chuyenBay.soGheThuongGia);
            } else if (hangVe === "Vé thương gia") {
              let soGhe1 = chuyenBay.soGheThuong + 1;
              let soGhe2 = chuyenBay.soGheThuongGia - 1;
              const response = await fetch(
                `https://vercel-travrel.vercel.app/api/update/flight/${ve.chuyenBayId}`,
                {
                  method: "PATCH", // Phương thức HTTP
                  headers: {
                    "Content-Type": "application/json", // Kiểu nội dung của request
                  },
                  body: JSON.stringify({
                    soGheThuong: soGhe1,
                    soGheThuongGia: soGhe2,
                  }),
                }
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              console.log(chuyenBay.soGheThuong);
              console.log(chuyenBay.soGheThuongGia);
            }
          } catch (error) {
            console.log(error);
            flagCheckAllFetch = 2;
          }
        }
        //!don update
        if (flagCheckAllFetch === 0) {
          let newDonGia = donhang.tongGia - ve.giaVe + newGiaVe;
          if (donhang.tongGia !== newDonGia) {
            try {
              const response = await fetch(
                `https://vercel-travrel.vercel.app/api/update_donhang/${ve.maDon}`,
                {
                  method: "PATCH", // Phương thức HTTP
                  headers: {
                    "Content-Type": "application/json", // Kiểu nội dung của request
                  },
                  body: JSON.stringify({
                    tongGia: newDonGia,
                  }),
                }
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
            } catch (error) {
              console.log(error);
              flagCheckAllFetch = 3;
            }
          }
        }
        if (flagCheckAllFetch === 1) console.log("Error update ve");
        else if (flagCheckAllFetch === 2) console.log("Error update cb");
        else if (flagCheckAllFetch === 3) console.log("Error update don");
        else if (flagCheckAllFetch === 0) reload(0);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="justify-center bg-white p-6 rounded-lg md:w-1/2 w-11/12 flex-col-reverse">
        <h2 className="text-center text-xl font-bold mb-4 text-blue-600">
          SỬA SỐ HÀNH LÝ hoặc NÂNG HẠNG
        </h2>
        <div className="flex justify-evenly w-[100%]">
          <div className="flex-col w-50% overflow-wrap break-all">
            <p className="p-2">
              <strong>Tên hàng khách: </strong> {ve.Ten}
            </p>
            <p className="p-2">
              <strong>Giá vé: </strong> {ve.giaVe} VND
            </p>
            <p className="p-2">
              <strong>Hạng vé: </strong>
              <div className="flex flex-col w-fit">
                <label>
                  <input
                    type="radio"
                    name="hangve"
                    value={ve.hangVe}
                    checked={hangVe === ve.hangVe}
                    onClick={(e) => setHangVe(e.target.value)}
                  />
                  {ve.hangVe}
                </label>
                <label>
                  <input
                    type="radio"
                    name="hangve"
                    value={
                      ve.hangVe === "Vé thường" ? "Vé thương gia" : "Vé thường"
                    }
                    onClick={(e) => setHangVe(e.target.value)}
                  />
                  {ve.hangVe === "Vé thường" ? "Vé thương gia" : "Vé thường"}
                </label>
                {checkSoGhe === false && (
                  <span className="text-red-500">Hết chỗ</span>
                )}
              </div>
            </p>
          </div>
          <div className="flex-col w-[50%] overflow-wrap break-all">
            <p className="p-2">
              <strong>Số điện thoại: </strong> {ve.phoneNumber}
            </p>
            <p className="p-2">
              <strong>Trạng thái vé: </strong> {ve.trangThaiVe}
            </p>
            <p className="p-2">
              <strong>Số hành lý: </strong>
              <input
                type="number"
                className="border-2 p-1 w-full"
                defaultValue={soKy}
                onChange={(e) => setSoKy(e.target.value)}
              />
            </p>
            {checkSoKy === false && soKy.length > 0 && (
              <span className="text-red-500">Số ký đã vượt quá quy định</span>
            )}
            {checkSoKy === false && soKy.length <= 0 && (
              <span className="text-red-500">Không được để trống</span>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setVeDangSua(veDangSua === null ? ve : null);
              setDonDangSua(donDangSua === null ? donhang : null);
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded font-medium"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              handleCapNhat();
              //updateSoLuongGheChuyenBay2();
            }}
            className="mt-4 bg-blue-600 text-white mr-2 px-4 py-2 rounded font-medium"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;
