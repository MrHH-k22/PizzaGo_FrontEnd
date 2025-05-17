import TabBar from "../../components/Tabs/TabBar";
import MenuItem from "./MenuItem";

function Menu({ toggleModal }) {
  return (
    <div>
      <TabBar />
      <div>
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-2xl font-bold text-gray-800">
            RECOMMEND
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
          <MenuItem toggleModal={toggleModal} />
        </div>
      </div>
    </div>
  );
}

export default Menu;
