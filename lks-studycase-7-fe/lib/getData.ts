export const GetData = async (url: string) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`http://localhost:8000/api/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
