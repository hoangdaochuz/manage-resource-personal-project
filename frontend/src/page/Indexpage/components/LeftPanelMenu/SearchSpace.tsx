import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FC, useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
type SearchSpaceProps = {
  setSearchSpace: (arg: boolean) => void;
};
const SearchSpace: FC<SearchSpaceProps> = ({ setSearchSpace }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setSearchSpace(false);
  });
  return (
    <div ref={ref}>
      <Input placeholder="Search" prefix={<SearchOutlined />} />
    </div>
  );
};
export default SearchSpace;
