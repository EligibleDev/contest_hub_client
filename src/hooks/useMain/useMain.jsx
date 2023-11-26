import { useContext } from "react";
import { MainContext } from "../../providers/MainProvider/MainProvider";

const useMain = () => {
    const all = useContext(MainContext);
    return all;
};

export default useMain;
