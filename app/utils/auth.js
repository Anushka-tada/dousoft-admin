export const isAdminLoggedIn = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("admin_token");
  return !!token;
};
