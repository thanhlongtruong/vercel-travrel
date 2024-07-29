export const CONTTENT_FAIL_PASS =
  "Mật khẩu của bạn không chính xác. Hoặc tài khoản hiện đang bị khóa. Vui lòng thử lại.";
export const CONTENT_LOGIN_SUCCESS = "Đăng nhập thành công!";
export const CONTENT_REGISTER_SUCCESS =
  "Đăng kí thành công. Vui lòng đăng nhập!";
export const CONTENT_REGISTER_FAIL =
  "Đăng kí thất bại. Vui lòng kiểm tra lại thông tin";
export const CONTENT_LOGOUT_SUCCESS = "Đăng xuất thành công!";
export const CONTENT_UPDATE_SUCCESS = "Cập nhật thành công!";
export const CONTENT_UPDATE_FAIL =
  "Cập nhật không thành công, vui lòng thử lại!";
export const CONTENT_CHUA_LOGIN = "Vui lòng đăng nhập để tiếp tục!";
export const CHUA_DIEN_THONGTIN_VE = "Vui lòng điền thông tin hành khách";
export const QUA_SO_LUONG_VE =
  "Quá số lượng vé thường hoặc vé thương gia, Vui lòng xem lại số lượng vé ngay bên cạnh mục chọn hạng vé";

export const NotiFailEventlogin = (prop) => {
  return (
    <div className="transition-all duration-300 w-full h-fit flex justify-center items-center  absolute z-50 top-10 p-5 ">
      <div className="w-fit h-fit flex flex-col p-3 gap-y-3">
        <p className="p-3 text-base text-white font-semibold bg-red-600 rounded-lg">
          {prop.content}
        </p>
      </div>
    </div>
  );
};
