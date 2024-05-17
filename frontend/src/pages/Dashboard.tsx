import background from "../assets/background.jpg";

function Dashboard() {
  return (
    <div className="m-2 md:m-4 mt-0 p-2 md:p-4 bg-white rounded-3xl">
      <div className="ml-40">
        <img src={background} alt="Home Screen" className="w-4/5 h-50" />
      </div>
    </div>
  );
}

export default Dashboard;