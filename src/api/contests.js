import axiosSecure from ".";

export const getContests = async () => {
    const { data } = await axiosSecure.get("/contests");
    return data;
};

export const getAllContests = async () => {
    const { data } = await axiosSecure.get("/all_contests");
    return data;
};

export const getTopContests = async () => {
    const { data } = await axiosSecure.get(`/top_contests`);
    return data;
};

export const getSingleContest = async (id) => {
    const { data } = await axiosSecure.get(`/contest/${id}`);
    return data;
};

export const getCreatorSpecificContest = async (email) => {
    const { data } = await axiosSecure.get(`/contests/${email}`);
    return data;
};

export const publishContest = async (contest) => {
    const { data } = await axiosSecure.post("/contests", contest);
    return data;
};

export const saveRegistration = async (paymentInfo) => {
    const { data } = await axiosSecure.post("/registrations", paymentInfo);
    return data;
};

export const updateContestStatus = async (id, status) => {
    const { data } = await axiosSecure.patch(`/update_contest_status/${id}`, { status });
    return data;
};

export const updateContest = async (id, contest) => {
    const { data } = await axiosSecure.patch(`/update_contest/${id}`, contest);
    return data;
};

export const searchContestsByCategory = async (category) => {
    const { data } = await axiosSecure.get(`/search_contests/${category}`);
    return data;
};


export const getMyParticipatedContests = async (email) => {
    const { data } = await axiosSecure.get(`/my_participated_contests/${email}`);
    return data;
};

export const getMyWinningContests = async (email) => {
    const { data } = await axiosSecure.get(`/my_winning_contests/${email}`);
    return data;
};

export const declareWinner = async (id, participant) => {
    const { data } = await axiosSecure.patch(`/declare_winner/${id}`, participant);
    return data;
};

export const deleteContest = async (id) => {
    const { data } = await axiosSecure.delete(`/delete_contest/${id}`);
    return data;
};
