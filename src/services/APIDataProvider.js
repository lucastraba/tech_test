import axios from 'axios';

/**
 * API Data Provider
 * Queries the endpoint and manages responses
 *
 * @export
 * @class ProductReferenceFactory
 */
export default class APIDataProvider {
  constructor () {
    this.endpoint = 'https://api.github.com/search/repositories';
    this.queryParams = {
      page: 1,
      perPage: 10,
      sort: 'stars'
    };
  }

  /**
   * @memberOf APIDataProvider
   * @param searchTerm - The term the user searched for.
   * @return {Promise<*>} - A promise that resolves into normalized data.
   * @private
   */
  async getSearchResults (searchTerm) {
    try {
      if (!searchTerm) return { error: 'Please specify a search term.' };
      const normalizedSearchTerm = this._normalizeSearchTerm(searchTerm);
      const query = this._buildQuery(normalizedSearchTerm);
      const { data } = await axios.get(query);
      return {
        data: this._normalizeResults(data.items)
      };
    } catch (e) {
      console.error(e);
      return { error: 'Something went wrong, try another search.' };
    }
  }

  /**
   * @memberOf APIDataProvider
   * @param {string} searchTerm - The raw user input.
   * @return {string} - A string normalized for API consumption
   * @private
   */
  _normalizeSearchTerm (searchTerm) {
    return searchTerm.trim().split(' ').join('+');
  }

  /**
   *
   * @param {array} data - An array containing the data returned by the API
   * @return {array} - An normalized array of 10 items.
   * @private
   */
  _normalizeResults (data) {
    const results = [];
    for (const dataElement of data) {
      const { name, html_url: url } = dataElement;
      results.push({ name, url });
    }
    return results;
  }

  /**
   * @memberOf APIDataProvider
   * @param {string} normalizedSearchTerm - The normalized search term.
   * @return {string} - A valid query for the API
   * @private
   */
  _buildQuery (normalizedSearchTerm) {
    return `${this.endpoint}` +
      `?q=${normalizedSearchTerm}` +
      `&page=${this.queryParams.page}` +
      `&per_page=${this.queryParams.perPage}` +
      `&sort=${this.queryParams.sort}`;
  }
}
