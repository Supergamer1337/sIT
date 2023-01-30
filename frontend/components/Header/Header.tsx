import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";
const Header = () => (
  <header>
    <h1>
      sp
      <Image src="/Logo.png" alt="spIT!" width={64} height={64} />!
    </h1>
    <SearchBar />
  </header>
);
export default Header;
