import axiosSecure from ".";

export const getTopContests = async () => {
    const { data } = await axiosSecure.get(`/top_contests`);
    return data;
};

export const publishContest = async (contest) => {
    const { data } = await axiosSecure.post("/contests", contest);
    console.log("contest published ====>", data);
    return data;
};
