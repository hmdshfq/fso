const CountriesForm = ({search, handleSearch}) => {
    return (
        <form>
            <label htmlFor="search">Find countries: </label>
            <input
                id="search"
                type="text"
                value={search}
                onChange={handleSearch}
                autoFocus
            />
        </form>
    );
};

export default CountriesForm;
