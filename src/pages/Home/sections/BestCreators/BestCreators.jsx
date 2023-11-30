import { Container, Grid } from "@mui/material";
import Creator from "./Creator";
import Title from "../../../../components/Title/Title";

const BestCreators = () => {
    return (
        <Container>
            <Title text="Top creators" />

            <Grid sx={{py: 3}} spacing={3} container>
                <Grid xs={12} lg={4} item>
                    <Creator total={3} email="ro@fik.com" />
                </Grid>
                <Grid xs={12} lg={4} item>
                    <Creator total={3} email="sho@fik.com" />
                </Grid>
                <Grid xs={12} lg={4} item>
                    <Creator total={2} email="tail@wind.com" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default BestCreators;
