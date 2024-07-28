import { useContext } from "react";
import { OptionSetting } from "./OptionSetting";
import { CONTEXT } from "../../Context/WindowLogin";
export function LoginSuccess() {
  const { isSaveAllCb } = useContext(CONTEXT);
  return (
    <div className="absolute right-5 z-50 h-80 w-80 rounded-lg bg-white">
      <OptionSetting dtChuyenBays={isSaveAllCb} />
    </div>
  );
}
