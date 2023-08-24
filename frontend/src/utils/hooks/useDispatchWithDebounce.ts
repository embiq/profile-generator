import { debounce } from "debounce";
import { useDispatch } from "react-redux";
import { setAnchor } from "../../store/slices/anchorSlice";

const useDispatchWithDebounce = () => {
  const dispatch = useDispatch();

  const dispatchAnchor = (anchor: string) => {
    dispatch(setAnchor(anchor));
  };

  const dispatchWithDebounce = debounce(dispatchAnchor, 500);

  return { dispatchWithDebounce };
};

export default useDispatchWithDebounce;
