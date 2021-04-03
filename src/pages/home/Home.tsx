import React,{FC} from 'react';
import Banner from '../../components/Banner';
import Row from '../../components/Row'
import {requests} from '../../utils/requests'
import './home.css'
interface HomeProps {
    
}

const Home: FC<HomeProps> = () => {
    return (
        <div className='app'>
            <Banner/>
            <Row title='HOT BLOCKBUSTERS' fetchUrl={requests.fetchActionMovies} isLargeRow></Row>
            <Row title="Trending Now"  fetchUrl={requests.fetchTrending}/>
            <Row title="Top Rated"  fetchUrl={requests.fetchTopRated}/>
            <Row title="Action Movies"  fetchUrl={requests.fetchActionMovies}/>
        </div>
    );
};

export default Home;