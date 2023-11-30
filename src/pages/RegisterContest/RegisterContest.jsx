import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { useEffect, useState } from "react";
import { getSingleContest } from "../../api/contests";
import { Box, TextField, Typography } from "@mui/material";

const RegisterContest = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const stripePromise = loadStripe(import.meta.env.VITE_stripePK);
    const [submission, setSubmission] = useState("");

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const contestsData = await getSingleContest(id);
                setContest(contestsData);
            } catch (error) {
                console.error("Error fetching contest:", error);
            }
        };
        fetchContest();
    }, [id]);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ textAlign: "left", width: "425px" }}>
                <Typography gutterBottom>
                    <b>Contest Name: </b>
                    {contest?.name}
                </Typography>
                <Typography gutterBottom>
                    <b>Prize Money: </b>
                    {contest?.prizeMoney}
                </Typography>
                <Typography gutterBottom>
                    <b>Category: </b>
                    {contest?.category}
                </Typography>
                <Typography gutterBottom>
                    <b>Deadline: </b>
                    {contest?.deadline}
                </Typography>
                <TextField
                    sx={{ width: "100%" }}
                    required
                    gutterBottom
                    label="Submit your task"
                    type="text"
                    onChange={(e) => setSubmission(e.target.value)}
                />
            </Box>

            <Box sx={{ mx: "auto", width: "425px" }}>
                {contest && Object.keys(contest).length > 0 && (
                    <Elements stripe={stripePromise}>
                        <PaymentForm submission={submission} contest={contest} />
                    </Elements>
                )}
            </Box>
        </div>
    );
};

export default RegisterContest;
