import axiosSecure from ".";

export const saveUser = async (user) => {
    const currentUser = {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
        role: "participant",
        status: "verified",
    };

    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

    return data;
};

export const getToken = async (email) => {
    const { data } = await axiosSecure.post(`/jwt`, { email });
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

export const getUser = async (email) => {
    const { data } = await axiosSecure.get(`/user/${email}`);
    return data;
};

export const createPaymentIntent = async (price) => {
    const { data } = await axiosSecure.post("/create_payment_intent", price);
    return data;
};

export const getAllUsers = async () => {
    const { data } = await axiosSecure.get("/users");
    return data;
};

export const updateRole = async ( email, role ) => {
    const currentUser = {
        email,
        role,
        status: "verified",
    };
    const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser);
    return data;
};

export const saveParticipantInfo = async (id, user, submission) => {
    const participant = {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
        submission: submission,
    };
    const { data } = await axiosSecure.patch(`/save_participant_info/${id}`, participant);
    return data;
};
