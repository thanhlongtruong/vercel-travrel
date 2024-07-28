import { memo } from "react";

function InfoTicket({ dataFlight, dataTicket }) {
  let currentLocation = window.location.href;
  let place =
    currentLocation === "/XemDanhSachChuyenbBay/DatChoCuaToi" ? true : false;

  console.log(place);
  return (
    <div className="w-[300px] flex-col bg-white md:mb-2 rounded-md shadow-lg h-fit">
      <div className="p-4 flex gap-3 shadow-sm">
        <img
          className="h-[30px] w-[30px] mt-1"
          src="https://vemaybaytiachop.com/wp-content/uploads/2022/10/2.png"
          alt=""
        />
        <div className="gap-3 flex items-center font-bold from-neutral-800 text-[17px]">
          <span>{dataFlight.diemDi}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          <span>{dataFlight.diemDen}</span>
        </div>
      </div>
      <div className="p-4 flex-col shadow-sm">
        <div className="mt-[-5px] mb-5">
          <h4 className="text-base font-semibold text-[#0194F3]">
            Chuyến bay đi • {dataFlight.timeDi} {" - "}
            {dataFlight.dateDi}
          </h4>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex flex-col justify-center text-sm font-medium text-gray-500 items-center">
            <h4 className="">{dataFlight.dateDi}</h4>
            <h4 className="font-medium text-black/80 text-base">
              {dataFlight.timeDi}
            </h4>
            <h4 className="">{dataFlight.diemDi}</h4>
          </div>
          <div className="flex flex-col ml-2 items-center">
            <div className="flex mt-1 items-center">
              <div className="border border-gray-300 rounded-[100%] w-[9px] h-[9px]"></div>
              <div className="border border-gray-300 w-[50px] h-[1px]"></div>
              <div className="border border-gray-300 rounded-[100%] w-[9px] h-[9px] bg-gray-400"></div>
            </div>
            <h4 className="text-xs font-medium text-gray-500 ml-[-5px] mt-[3px]">
              Bay thẳng
            </h4>
          </div>
          <div className="flex flex-col justify-center text-sm font-medium text-gray-500 items-center">
            <h4 className="">{dataFlight.dateDen}</h4>
            <h4 className="font-medium text-black/80 text-base">
              {dataFlight.timeDen}
            </h4>
            <h4 className="">{dataFlight.diemDen}</h4>
          </div>
        </div>
      </div>
      <div className="p-4 flex-col gap-y-2 text-base rounded-b-md">
        {place && (
          <div className="flex gap-2">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
              alt=""
              className="h-[14px] w-[14px] mt-1"
            />
            <h4 className=" text-gray-500 font-medium">
              Tên khách hàng: {dataTicket.Ten} <br /> Số điện thoại:{" "}
              {dataTicket.phoneNumber}
            </h4>
          </div>
        )}

        {place && (
          <div className="flex gap-2">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
              alt=""
              className="h-[14px] w-[14px] mt-1"
            />
            <h4 className="text-gray-500 font-medium">
              Hạng vé: {dataTicket.hangVe}
            </h4>
          </div>
        )}
        {place && (
          <div className="flex gap-2 mt-2">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
              alt=""
              className="h-[14px] w-[14px] mt-1"
            />
            <h4 className="text-gray-500 font-medium">
              Số ký hành lý: {dataFlight.khoiLuongQuyDinhTrenMotVe}
            </h4>
          </div>
        )}
        {place && (
          <div className="flex gap-2 mt-2">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0451207408e414bb8a1664153973b3c8.svg"
              alt=""
              className="h-[14px] w-[14px] mt-1"
            />
            <h4 className="text-gray-500 font-medium">
              Giá vé: {dataTicket.giaVe} VND
            </h4>
          </div>
        )}
        {dataTicket && (
          <div className="flex gap-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffcc00"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <h4 className="text-[#ffcc00] font-medium">
              {dataTicket.trangThaiVe}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(InfoTicket);
