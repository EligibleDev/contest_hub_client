import { useState } from "react";
import Banner from "./sections/Banner/Banner";
import TopContests from "./sections/TopContests/TopContests";

const Home = () => {
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
    };

    console.log(selectedDate);

    return (
        <>
            <Banner />
            <TopContests />
            {/* <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> */}

            <div>
                <label htmlFor="datepicker">Select Date:</label>
                <input
                    type="date"
                    id="datepicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                {/* You can display the selectedDate if needed */}
                {selectedDate && (
                    <p>Selected Date: {new Date(selectedDate).toLocaleDateString()}</p>
                )}
            </div>
        </>
    );
};

export default Home;
