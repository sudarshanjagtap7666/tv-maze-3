import './App.css';
import React, { useState } from 'react';
import Movies from './components/Movies';

const App = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  // Actor API: https://api.tvmaze.com/search/people?q=akon
  // Shows API: https://api.tvmaze.com/search/shows?q=friends

  const Actor = async () => {
    let url = "https://api.tvmaze.com/search/people?q=akon";
    let resp = await fetch(url);

    setData(await resp.json())
    let input = document.getElementById("inp");
    input.value = "";
  }
  const Show = async () => {
    let url = "https://api.tvmaze.com/search/shows?q=friends";
    let resp = await fetch(url);
    setData(await resp.json())
    let input = document.getElementById("inp");
    input.value = "";
  }
  function serch(e) {
    setSearchData(e.target.value);
  }


  return (
    <div className="master">
      <div className="App">
        <div className="container p-5">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h1 className='fi'>TVmaze</h1>
              </div>

              <div className="col-md-12 col-sm-12">
                <h1 className='se'>Search your favourite shows</h1>
              </div>

              <div className="col-md-12 col-sm-12 d-flex mt-xl-5 mt-lg-3 mt-md-2">
                <div className="form-check">
                  <input onClick={Actor} className='form-check-input' id='flexRadioDefault1' type="radio" name="flexRadioDefault" />
                  {" "}
                  <label className="form-check-label" for="flexRadioDefault1">
                      Actor
                  </label>
                </div>

                <div className="form-check ms-4">
                  <input onClick={Show} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  {" "}
                  <label className="form-check-label" for="flexRadioDefault2">
                    Shows
                  </label>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 mt-2">
                <input onChange={serch} id='inp' className="form-control form-control-sm " type="text" placeholder="eg: Friends..." />
                <div id="error" className='text-warning'></div>
              </div>
            </div>
        </div>
      </div>
      
      {
        searchData.length >= 1 ?
        data.map((ele, index)=>{
          
          let val = "";
          if (ele.person === undefined) {
            val = String(ele.show.name);
          }
          if (ele.show === undefined) {
            val = String(ele.person.name);
          }
          
          val = val.toLowerCase();
          if (searchData === val.substring(0, searchData.length)) {
            return <Movies val={ele} key={index} />;
          }
          
          // Error Text
          // let input = document.getElementById("inp").value;
          // let error = document.getElementById("error");
          // if(ele.value === undefined){
          //   error.innerText = "Invalid Input";
          // }
          // else{
          //   error.innerText = "";
          // }
        }):null
      }
    </div>
  )
}

export default App;
