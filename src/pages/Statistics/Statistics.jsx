import { useQuery } from "@tanstack/react-query";
import Chart from "react-google-charts";
import { getMyParticipatedContests, getMyWinningContests } from "../../api/contests";
import useMain from "../../hooks/useMain/useMain";
import { CircularProgress } from "@mui/material";

const Statistics = () => {
    const { user } = useMain();

    const { data: participates, isLoading: participatedLoading } = useQuery({
        queryKey: ["participates"],
        queryFn: async () => await getMyParticipatedContests(user?.email),
    });

    const { data: winnings, isLoading: winningLoading } = useQuery({
        queryKey: ["winnings"],
        queryFn: async () => await getMyWinningContests(user?.email),
    });

    console.log(participates?.length, winnings?.length);

    const data = [
        ["Participation", "Participation Value"],
        ["Your Winning", winnings?.length],
        ["Your Participated", participates?.length],
    ];

    const options = {
        legend: "bottom",
        colors: ["#00C49F", "#FF444A"],
    };

    if (participatedLoading || winningLoading) return <CircularProgress />;

    return (
        <div style={{ marginTop: "-32px", background: "transparent" }}>
            <Chart
                chartType="PieChart"
                data={data}
                width={"100%"}
                height={"800px"}
                options={options}
            />
        </div>
    );
};

export default Statistics;
