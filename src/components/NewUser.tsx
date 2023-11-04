export const NewUser = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        paddingTop: "5%",
      }}
    >
      <h1 className="pt-12 pb-6 text-4xl ">Ready to Create Notes?</h1>
      <h1 className="py-6 text-4xl ">
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={() => {
            window.location.href = "/signin";
          }}
        >
          Sign in
        </span>{" "}
        to get started.
      </h1>
      <p className="text-lg ">
        Try our Chrome extension for quick and easy note creation and storage.
      </p>
      <a
        href="https://github.com/ManavMalhotra/NoteMesh-extension"
        className="text-xl text-blue-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Install our Chrome extension
      </a>
    </div>
  );
};
