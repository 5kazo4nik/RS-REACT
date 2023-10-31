import { Component, ReactNode } from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { PlanetsService } from './API/PlanetsService';
import { ISearchData } from './types/PlanetsData';
import { PlanetList } from './components/PlanetList/PlanetList';
import { Pagination } from './UI/Pagination/Pagination';
import { Loader } from './UI/Loader/Loader';

interface IAppState {
  searchValue: string;
  searchResult: ISearchData | null;
  page: number;
  isLoading: boolean;
  isError: boolean;
  message: string;
}

class App extends Component {
  state: IAppState = {
    searchValue: localStorage.getItem('searchValue') || '',
    searchResult: null,
    page: 1,
    isLoading: false,
    isError: false,
    message: '',
  };

  componentDidMount() {
    this.getPlanets(this.state.searchValue);
  }

  render(): ReactNode {
    const next = this.state.searchResult?.next as string | null;
    const previous = this.state.searchResult?.previous as string | null;

    if (this.state.isError) throw new Error(this.state.message);

    return (
      <div className='app'>
        {this.state.isLoading && <Loader />}
        <Search value={this.state.searchValue} getPlanets={this.getPlanets} getPage={this.getPage} />

        {this.state.isError ? (
          <h2 className='error-message'>Error: {this.state.message}</h2>
        ) : (
          <PlanetList planets={this.state.searchResult?.results || []} count={this.state.searchResult?.count || 0} />
        )}

        {!!this.state.searchResult && !this.state.isError && (
          <Pagination page={this.state.page} next={next} previous={previous} getPage={this.getPage} />
        )}
      </div>
    );
  }

  getPlanets = async (value: string = '') => {
    this.setState({ ...this.state, isLoad: true, isError: false });
    try {
      const res = await PlanetsService.getPlanet(value);
      this.setState({ ...this.state, isLoad: false, searchResult: res, page: 1 });
    } catch (e) {
      this.catchError(e as Error);
    }
  };

  getPage = async (url: string, page: number) => {
    this.setState({ ...this.state, isLoad: true, isError: false });
    try {
      const res = await PlanetsService.getPlanetPage(url);
      this.setState({ ...this.state, searchResult: res, page: this.state.page + page, isLoad: false });
    } catch (e) {
      this.catchError(e as Error);
    }
  };

  catchError = (e: Error) => {
    const message = (e as Error).message;
    console.log(message);
    this.setState({ ...this.state, searchResult: [], isError: true, isLoad: false, message });
  };
}

export default App;
