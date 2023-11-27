import { useEffect, useState } from "react";
import useMain from "../useMain/useMain";
import { getRole } from "../../api/auth";

const useRole = () => {
    const { user } = useMain();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getRole(user?.email)
            .then((data) => {
                setRole(data);
            })
            .catch((error) => {
                console.error("Error fetching role:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.email]);
    

    return [role, loading];
};

export default useRole;
