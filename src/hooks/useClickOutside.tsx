import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseClickOutside {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: MutableRefObject<HTMLDivElement | null>;
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
}

const useClickOutside = (): UseClickOutside => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      (dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)) ||
      (buttonRef.current && !buttonRef.current.contains(event.target as Node))
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);

  return {
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    buttonRef,
  };
};

export default useClickOutside;
