import { Component, ReactNode } from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { PlanetsService } from './API/PlanetsService';
import { ISearchData } from './types/PlanetsData';
import { PlanetList } from './components/PlanetList/PlanetList';
import { Pagination } from './UI/Pagination/Pagination';

interface IAppState {
  searchResult: ISearchData | null;
  page: number;
}

class App extends Component {
  state: IAppState = {
    searchResult: null,
    page: 1,
  };

  render(): ReactNode {
    const next = this.state.searchResult?.next as string | null;
    const previous = this.state.searchResult?.previous as string | null;

    return (
      <div className='app'>
        <Search getPlanets={this.getPlanets} />
        <PlanetList planets={this.state.searchResult?.results || []} count={this.state.searchResult?.count || 0} />
        {!!this.state.searchResult && (
          <Pagination page={this.state.page} next={next} previous={previous} getPage={this.getPage} />
        )}
      </div>
    );
  }

  getPlanets = async (value: string = '') => {
    const res = await PlanetsService.getPlanet(value);
    this.setState({ ...this.state, searchResult: res, page: 1 });
  };

  getPage = async (url: string, page: number) => {
    const res = await PlanetsService.getPlanetPage(url);
    this.setState({ ...this.state, searchResult: res, page: this.state.page + page });
  };
}

export default App;
