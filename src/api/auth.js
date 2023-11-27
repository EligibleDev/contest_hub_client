import axiosSecure from ".";

export const saveUser = async (user) => {
    const currentUser = {
        email: user?.email,
        role: "participant",
        status: "verified",
    };

    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

    return data;
};

export const getToken = async (email) => {
    const { data } = await axiosSecure.post(`/jwt`, email);
    console.log("token received form server ====>", data);

    return data;
};

export const clearCookie = async () => {
    const { data } = await axiosSecure.get("/logout");
    console.log("cookie removed ====> ", data);

    return data;
};

export const getRole = async (email) => {
    const { data } = await axiosSecure.get(`/user/${email}`);
    return data.role;
};
