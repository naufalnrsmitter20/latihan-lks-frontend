export const GetData = async (path: string) => {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/${path}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
export const GetDataByToken = async (path: string) => {
  try {
    const token = localStorage.getItem("login_tokens");
    const res = await fetch(`http://localhost:8000/api/v1/${path}?token=${token}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
