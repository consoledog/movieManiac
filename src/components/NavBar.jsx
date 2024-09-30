import {useState} from "react";

export function NavBar({ children }) {
    return (
        <nav className="grid grid-cols-4 items-center h-[8rem] px-8 bg-primary rounded-lg">
            {children}
        </nav>
    );
}

export function Logo() {
    return <div className="flex items-center gap-3">
        <span className="text-[3rem]" role="img">🍿🎥✮⋆˙</span>
        <h1 className="text-[2rem] font-semibold text-white">Movie Maniac</h1>
    </div>
}

export function Search({query, setQuery, onSearch}) {

    function handleKeyDown(e){
        if(e.key === "Enter"){
            onSearch();
        }
    }

    return (
        <input
            type="text"
            className="justify-self-center border-none p-[1rem] px-[1rem] text-[2rem] rounded-[1rem] w-[40rem]
                       transition-all duration-300 text-text bg-primary-light placeholder-text focus:outline-none
                       focus:shadow-custom-lg focus:transform focus:-translate-y-0.5"
            placeholder="Type movie name here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}

export function NumResults({movies}) {
    return <p className="flex justify-center items-center text-[2rem]">
        <strong className="mr-2">{movies.length}</strong> results
    </p>
}

export function DropDownMenu({dropDownMenuSelectedItem, setDropDownMenuSelectedItem}) {

    function handleSelectItem(item) {
        setDropDownMenuSelectedItem(item);
    }

    return (
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn flex text-[2rem] bg-primary border-none text-text
                                                      hover:bg-primary-light">
                Pick List
            </div>
            <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-auto p-2 flex bg-primary">
                <li
                    className={`text-[2rem] bg-primary ${dropDownMenuSelectedItem === "watched" ? "bg-primary-light" : ""}`}
                    onClick={() => handleSelectItem("watched")}
                >
                    <a>Watched list</a>
                </li>
                <li
                    className={`text-[2rem] bg-primary ${
                        dropDownMenuSelectedItem === "will-watch" ? "bg-primary-light" : ""}`}
                    onClick={() => handleSelectItem("will-watch")}
                >
                    <a>Will watch list</a>
                </li>
            </ul>
        </div>
    );
}
