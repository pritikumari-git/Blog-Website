import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid
                    item
                    lg={3}
                    sm={4}
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={8} lg={9}>
                    <Banner />
                    <Posts />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
