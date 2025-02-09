export const GetData = async (url: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
export const GetDataByToken = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/v1/${url}?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
