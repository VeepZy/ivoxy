const handleStorageChange = (show: boolean) => {
    window.localStorage.setItem("sidebar", show.toString());
};

export { handleStorageChange };
