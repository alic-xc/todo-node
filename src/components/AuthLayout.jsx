const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center place-items-center flex-1 bg-[#f4f4f4]">
      <div className="border-2 border-secondary rounded-md w-[400px] h-[600px] bg-white">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
