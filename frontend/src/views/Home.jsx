import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { AiTwotoneHeart, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

function Home() {
  const url = "https://perfect-hen-necklace.cyclic.cloud";
  const [books, setBook] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async (search) => {
    try {
      const res = await axios.get(url);
      const pap = res.data.data;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          search ? search : "%7Bkeyword"
        }`
      );
      const buku = response.data.items;
      if (buku.length !== 0 && pap.length !== 0) {
        buku.forEach((book) => {
          let fav = pap.find((el) => book.volumeInfo.title === el.title);
          if (fav) {
            book.favorite = true;
          } else {
            book.favorite = false;
          }
        });
        setBook(buku);
      } else {
        setBook(buku);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFavorite = async (title) => {
    const payload = {
      title,
    };
    await axios.post(url, payload);
    getBooks(search);
  };

  const deleteFavorite = async (title) => {
    await axios.delete(url + `/${title}`);
    getBooks(search);
  };

  const joinAuthors = (authors) => {
    if (authors) {
      let temp = authors.join(", ");
      return temp;
    }
  };
  const submitSearch = (event) => {
    event.preventDefault();
    getBooks(search);
  };

  return (
    <div className="m-0 min-h-screen bg-black">
      <div className="flex flex-col w-full h-80 items-center justify-center py-2 bg-[url('https://www.datocms-assets.com/29926/1617727156-header-nocolor-bg.png?h=299&w=1440')] opacity-90 relative bg-cover bg-center">
        <div className="w-full flex justify-center">
          <p className="text-[34px] text-white font-semibold italic">
            Find Your Books Collection Here!
          </p>
          {/* <p className="text-[44px] font-semibold italic ml-28">
            Books Collection <span className="underline">Here!</span>{" "}
          </p> */}
        </div>
        <div className="flex w-full justify-center items-center py-8">
          <form action="" className="flex w-1/2 h-10 rounded">
            <input
              className="w-11/12 rounded-l px-6 focus:outline-none"
              placeholder="search by title"
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button
              onClick={submitSearch}
              className="bg-gray-100 flex justify-center items-center w-1/12 hover:bg-gray-300 rounded-r"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-8 items-center justify-center p-10 mt-2 bg-white">
        {/* card */}
        {books.map((el) => {
          return (
            <div
              key={el.id}
              className="bg-white w-96 h-40 pl-3 pr-4 flex rounded-tl-[150px] rounded-md transform transition-all hover:-translate-y-1 shadow-md hover:shadow-xl group gap-2"
            >
              <div className="flex items-center justify-center max-h-30 w-1/3 relative">
                <img
                  className="object-cover h-40 w-full group-hover:w-30 rounded-sm absolute bottom-3 shadow-lg"
                  src={el.volumeInfo.imageLinks.thumbnail}
                  alt="loading..."
                />
              </div>
              <div className="mt-2 w-2/3 py-2 flex flex-col justify-between">
                <div className="flex flex-col">
                  <div className="font-semibold text-gray-800">
                    {el.volumeInfo.title}
                  </div>
                  <div className="font-light text-xs text-gray-600">
                    {joinAuthors(el.volumeInfo.authors)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <ReactStars
                    count={5}
                    value={el.volumeInfo.ratingsCount}
                    edit={false}
                    isHalf={true}
                  />
                  {el.favorite ? (
                    <button onClick={() => deleteFavorite(el.volumeInfo.title)}>
                      <AiTwotoneHeart className="text-red-700" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addFavorite(el.volumeInfo.title)}
                      className="text-sm font-semibold px-2 rounded-xl duration-150 hover:bg-red-700 hover:text-white"
                    >
                      Add to favorite
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
