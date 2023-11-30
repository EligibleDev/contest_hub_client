/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./PaymentForm.css";
import { Button } from "@mui/material";
import useMain from "../../hooks/useMain/useMain";
import { createPaymentIntent, saveParticipantInfo } from "../../api/auth";
import { saveRegistration } from "../../api/contests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ contest, submission }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const { user } = useMain();
    const navigate = useNavigate();

    // Create Payment Intent
    useEffect(() => {
        const fetchClientSecret = async () => {
            if (contest?.price > 0) {
                try {
                    const data = await createPaymentIntent({ price: contest?.price });
                    console.log(data?.clientSecret);
                    setClientSecret(data?.clientSecret);
                } catch (error) {
                    console.error("Error fetching client secret:", error);
                }
            }
        };

        fetchClientSecret();
    }, [contest?.price]);
    const handleSubmit = async (event) => {
        const toastId = toast.loading("Working on it...");
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.error("error", error);
            setCardError(error.message);
        } else {
            setCardError("");
            console.log("payment method", paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            }
        );

        if (confirmError) {
            console.log(confirmError);
            setCardError(confirmError.message);
        }

        console.log("payment intent", paymentIntent);

        if (paymentIntent.status === "succeeded") {
            // save payment information to the server
            // Update room status in db
            const paymentInfo = {
                ...contest,
                transactionId: paymentIntent.id,
                date: new Date(),
            };

            try {
                saveRegistration(paymentInfo);
                await saveParticipantInfo(contest?._id, user, submission);
                navigate("/dashboard/my_participated_contests");
                toast.success("Registration Successful", { id: toastId });
            } catch (error) {
                console.error(error);
                toast.error(error, { id: toastId });
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <form className="my-2" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <div className="flex mt-2 justify-around">
                <Button onClick={() => navigate(-1)}>Go back</Button>
                <Button type="submit">{`Pay ${contest?.price}$`}</Button>
            </div>{" "}
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
        </form>
    );
};

export default PaymentForm;
