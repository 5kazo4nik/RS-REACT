import { Component, ReactNode } from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { PlanetsService } from './API/PlanetsService';
import { ISearchData } from './types/PlanetsData';
import { PlanetList } from './components/PlanetList/PlanetList';
import { Pagination } from './UI/Pagination/Pagination';
import { Loader } from './UI/Loader/Loader';

interface IAppState {
  searchResult: ISearchData | null;
  page: number;
  isLoad: boolean;
}

class App extends Component {
  state: IAppState = {
    searchResult: null,
    page: 1,
    isLoad: false,
  };

  render(): ReactNode {
    const next = this.state.searchResult?.next as string | null;
    const previous = this.state.searchResult?.previous as string | null;

    return (
      <div className='app'>
        {this.state.isLoad && <Loader />}
        <Search getPlanets={this.getPlanets} />
        <PlanetList planets={this.state.searchResult?.results || []} count={this.state.searchResult?.count || 0} />
        {!!this.state.searchResult && (
          <Pagination page={this.state.page} next={next} previous={previous} getPage={this.getPage} />
        )}
      </div>
    );
  }

  getPlanets = async (value: string = '') => {
    this.setState({ ...this.state, isLoad: true });
    const res = await PlanetsService.getPlanet(value);
    this.setState({ ...this.state, searchResult: res, page: 1, isLoad: false });
  };

  getPage = async (url: string, page: number) => {
    this.setState({ ...this.state, isLoad: true });
    const res = await PlanetsService.getPlanetPage(url);
    this.setState({ ...this.state, searchResult: res, page: this.state.page + page, isLoad: false });
  };
}

export default App;
