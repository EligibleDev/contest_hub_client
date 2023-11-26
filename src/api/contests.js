import axiosSecure from ".";

export const getTopContests = async () => {
    const { data } = await axiosSecure.get(`/top_contests`);
    return data;
};
