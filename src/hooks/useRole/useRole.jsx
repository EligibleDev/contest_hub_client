import { useEffect, useState } from "react";
import useMain from "../useMain/useMain";
import { getRole } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useMain();
    // const [role, setRole] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setLoading(true);
    //     getRole(user?.email)
    //         .then((data) => {
    //             setRole(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching role:", error);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, [user?.email]);

    const {data: role, isLoading} = useQuery({
        enabled: !loading && !!user?.email,
        queryFn: async()=> await getRole(user?.email),
        queryKey: ['role'],
    })
    

    return [role, isLoading];
};

export default useRole;
