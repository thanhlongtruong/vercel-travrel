import { useEffect, useState } from "react";

function Footer() {
  const [isSizeWidth, setSizeWidth] = useState();
  const [isSizeLap, setSizeLap] = useState(false);
  useEffect(() => {
    const handleSize = () => {
      setSizeWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  useEffect(() => {
    if (isSizeWidth < 1024) {
      setSizeLap(true);
    } else {
      setSizeLap(false);
    }
  }, [isSizeWidth]);
  return (
    <div className="w-screen">
      <div className="flex w-full bg-[rgba(28,41,48,1.00)] px-5 pb-[55px] pt-[55px]">
        <div className="flex w-full lg:items-start justify-center">
          {!isSizeLap && (
            <>
              <div className="ml-20 mt-[-20px] flex flex-col items-start justify-center w-[30%]">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ad89f39fe62c8b500e6f9a25fa4427d8.svg"
                  alt="travel-logo"
                  width="190px"
                />

                <div className="mb-[10px] mr-[20px] grid grid-cols-3 justify-between gap-y-[15px]">
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2017/12/13/1513150321127-5096be77d2a19401b476853e54ba2cc6.svg?tr=h-35,q-75"
                    alt=""
                  />
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2021/05/10/1620638808154-e6c02ed786235ab59252628a9aa9b715.png?tr=h-35,q-75"
                    alt=""
                  />
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
                    alt=""
                  />
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/23/1569229181629-eeb038ad844874f951326d0a8534bf48.png?tr=q-75,w-100"
                    alt=""
                  />
                </div>

                <div className="flex">
                  <div className="h-[60px] w-[250px] rounded-xl bg-gray-700">
                    <div className="ml-8 p-4 font-bold text-white">
                      Hợp tác với Traveloka
                    </div>
                  </div>
                </div>

                <div className="mt-[16px]">
                  <div className="font-bold text-white">
                    <h3>Đối tác thanh toán</h3>
                  </div>
                  <div className="mt-[10px] grid grid-cols-4 justify-between">
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339578215-99466ea3d377ada2939bf2117df21b11.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2022/07/08/1657286372391-45dab552eed9b787bfc93547e26c6d87.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339553631-9cebb9f6a7a3b0e427b7a2d9da2fd8c0.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339557703-5697f31b3e12a942eabc0f613bff8fb9.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339567663-c7c5e25757f0d69375aa6de6ad57958f.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2021/04/07/1617781232473-330f36367feac4132c5af1b3df54d3f1.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339648624-307f4a5f54e873a6c9f272673f193062.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339663962-2037bef017440339eda165360a5e239f.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339666745-2be0cc98504595cda91d0a2a5342a20b.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2021/04/07/1617781263528-febaf8c61699a7df689ffbd475abd453.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2021/04/07/1617781253184-2ef4eea06e759ab13bc30fac59e715ad.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                    <div className="mb-[8px] mr-[8px] flex">
                      <img
                        className="rounded-md bg-white p-2.5"
                        src="https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558339548088-c536c896b175cb38f99a31f5dd2a989a.png?tr=h-19,q-75,w-57"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex w-fit lg:w-[67%] gap-x-14 justify-between">
            <div className="w-[22.3%]">
              <div className="mb-[8px] font-bold text-white">
                <h3>Về Traveloka</h3>
              </div>
              <ul className="mb-[32px]">
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Cách đặt chỗ
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Liên hệ chúng tôi
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Trợ giúp
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Tính năng mới ra mắt
                  </a>
                </li>
              </ul>
              <div>
                <div className="font-bold text-white">
                  <h3>Theo dõi chúng tôi trên</h3>
                </div>
                <ul className="mt-2">
                  <li className="mb-3 font-bold">
                    <a
                      className="flex text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                      href="#"
                    >
                      <img
                        className="mr-2"
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6904cd2e74ef73120833cff12185a320.svg"
                        alt=""
                      />
                      Facebook
                    </a>
                  </li>
                  <li className="mb-3 font-bold">
                    <a
                      className="flex text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                      href="#"
                    >
                      <img
                        className="mr-2"
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/62a2fc240d7e00b05d0d6f6b4e785110.svg"
                        alt=""
                      />
                      Instagram
                    </a>
                  </li>
                  <li className="mb-3 font-bold">
                    <a
                      className="flex text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                      href="#"
                    >
                      <img
                        className="mr-2"
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/471f17c1510d49a98bec08a48b84c607.svg"
                        alt=""
                      />
                      Tiktok
                    </a>
                  </li>
                  <li className="mb-3 font-bold">
                    <a
                      className="flex text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                      href="#"
                    >
                      <img
                        className="mr-2"
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b593add66303beb2a0cae9e96963e68b.svg"
                        alt=""
                      />
                      Youtube
                    </a>
                  </li>
                  <li className="mb-3 font-bold">
                    <a
                      className="flex text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                      href="#"
                    >
                      <img
                        className="mb-3 mr-2"
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a4da6605a9dd2f38ac799eaedeff976d.svg"
                        alt=""
                      />
                      Telegram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[22.3%]">
              <div>
                <h3 className="mb-[8px] font-bold text-white">Sản phẩm</h3>
              </div>
              <ul className="mb-[32px]">
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Khách sạn
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Vé máy bay
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Vé xe khách
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Đưa đón sân bay
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Cho thuê xe
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Hoạt động và vui chơi
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Du thuyền
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Biệt thự
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Căn hộ
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Nhà hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-[22.3%]">
              <div>
                <h3 className="mb-[8px] font-bold text-white">Khác</h3>
              </div>
              <ul className="mb-[32px]">
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Traveloka Affiliate
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Traveloka Blog
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Chính sách quyền riêng
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Điều khoản và điều kiện
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Quy chế hoạt động
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Đăng ký nơi nghỉ của bạn
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Đăng ký doanh nghiệp hoạt động du lịch của bạn
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Khu vực báo chí
                  </a>
                </li>
                <li className="mb-[8px] font-medium">
                  <a
                    className="text-sm text-gray-400 hover:text-white hover:underline hover:decoration-white"
                    href="#"
                  >
                    Vulnerability Disclosure Program
                  </a>
                </li>
              </ul>
              <div className="mb-[32px]">
                <div className="font-bold text-white">
                  <h3>Tải ứng dụng Traveloka</h3>
                </div>
                <div className="mt-[10px]">
                  <a href="#">
                    <img
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f519939e72eccefffb6998f1397901b7.svg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="mt-[10px]">
                  <a href="#">
                    <img
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/1/18339f1ae28fb0c49075916d11b98829.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
